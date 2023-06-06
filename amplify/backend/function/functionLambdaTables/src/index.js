/**
 *
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


exports.handler = async (event) => {

    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: 'myorderdatabase.cluster-ctulrcqrkejd.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'admin123456',
        database: 'myorder'
    });


    let result;


    const promiseQuery = new Promise((resolve) => {
        connection.query(`SELECT * from Table_`, function (error, results, fields) {
            resolve(results)
        });
    })
    result = await promiseQuery


    if (event.queryStringParameters?.active !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`select * from Table_ Where table_active = 1`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.activeCall !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`select * from Table_ Where table_call = 1`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.searchTable !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`Select * from Table_ Where table_number = ${event.pathParameters.proxy}  `, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.activate !== undefined) {
        if (event.queryStringParameters.activate === "activate") {
            const promiseQuery = new Promise((resolve) => {
                connection.query(`UPDATE Table_ Set table_active = 1 Where table_number = ${event.pathParameters.proxy}  `, function (error, results, fields) {
                    resolve(results)
                });
            })
            result = await promiseQuery
        }
    }
    else if (event.queryStringParameters?.desactivate !== undefined) {
        if (event.queryStringParameters?.desactivate === "desactivate") {
            const promiseQuery = new Promise((resolve) => {
                connection.query(`UPDATE Table_ Set table_active=0, table_call=0  Where table_number = ${event.pathParameters.proxy}  `, function (error, results, fields) {
                    resolve(results)
                });
            })
            result = await promiseQuery
        }
    }
    else if (event.queryStringParameters?.call !== undefined) {
        if (event.queryStringParameters?.call === "call") {
            const promiseQuery = new Promise((resolve) => {
                connection.query(`UPDATE Table_ Set table_call= 1 Where table_number = ${event.pathParameters.proxy}  `, function (error, results, fields) {
                    resolve(results)
                });
            })
            result = await promiseQuery
        }
        else if (event.queryStringParameters?.call === "notCall") {
            const promiseQuery = new Promise((resolve) => {
                connection.query(`UPDATE Table_ Set table_call= 0 Where table_number = ${event.pathParameters.proxy}  `, function (error, results, fields) {
                    resolve(results)
                });
            })
            result = await promiseQuery
        }
        else if (event.queryStringParameters?.ordersCreate !== undefined) {
            const promiseQuery = new Promise((resolve) => {
                connection.query(`INSERT INTO Order_ (id_table) VALUES (${event.pathParameters.proxy});`, function (error, results, fields) {
                    resolve(results)
                });
            })
            result = await promiseQuery
        }
    }





    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(result),
    };
};