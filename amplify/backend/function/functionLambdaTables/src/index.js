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


    if (event.queryStringParameters?.active) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`select * from Table_ Where table_active = 1`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.activeCall) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`select * from Table_ Where table_call = 1   ORDER BY dateCall desc`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.resetAllTables !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`UPDATE Table_ set table_call = 0, table_active = 0  `, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.itemPeopleInTableJoin) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`select ItemPeopleInTableID as ItemID, title, quantity, state, id_table from PeopleInTable, Item_peopleInTable , Item
where  Item_peopleInTable.id_peopleInTable = PeopleInTable.PeopleInTableID AND  Item_peopleInTable.id_item= Item.ItemID AND state != "delivered"  ORDER BY date desc`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.peopleInTable) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`INSERT INTO PeopleInTable (PeopleInTableID,id_table)
VALUES ( ${JSON.stringify(event.pathParameters.proxy.slice(0, 36))},${JSON.stringify(event.pathParameters.proxy.slice(37, 40))});`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.peopleInTableSearc) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`Select * from PeopleInTable Where id_table = ${event.pathParameters.proxy} Order by entry Desc`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.itemPeopleInTable) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`INSERT INTO Item_peopleInTable (ItemPeopleInTableID, id_peopleInTable, quantity, id_item, state)
VALUES(${JSON.stringify(event.pathParameters.proxy.slice(0, 36))},${JSON.stringify(event.pathParameters.proxy.slice(37, 73))}, ${event.pathParameters.proxy.slice(74, 75)}, ${JSON.stringify(event.pathParameters.proxy.split('/')[3])}, 'in process');`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }

    else if (event.queryStringParameters?.searchTable) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`Select * from Table_ Where TableID = ${JSON.stringify(event.queryStringParameters.searchTable)}`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters.activate) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`UPDATE Table_ Set table_active = 1 Where tableID = ${JSON.stringify(event.queryStringParameters.activate)}  `, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.desactivate) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`UPDATE Table_ Set table_active=0, table_call=0  Where tableID = ${JSON.stringify(event.queryStringParameters.desactivate)}  `, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }


    else if (event.queryStringParameters?.call) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`UPDATE Table_ Set table_call= 1 Where tableID = ${JSON.stringify(event.queryStringParameters.call)}  `, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.notCall) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`UPDATE Table_ Set table_call= 0 Where tableID = ${JSON.stringify(event.queryStringParameters.notCall)}  `, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
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