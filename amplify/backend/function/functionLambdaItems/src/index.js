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
        connection.query(`SELECT * from Item;`, function (error, results, fields) {
            resolve(results)
        });
    })
    result = await promiseQuery


    if (event.queryStringParameters?.categories !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`SELECT * from Category ORDER BY CategoryID Asc;`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    } else if (event.queryStringParameters?.search !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`select * from Item where title like "%${event.queryStringParameters.search}%"`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.fetchItemPeopleInTable !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`select id_item as ItemID, title, quantity, price,state from Item_peopleInTable , Item
Where Item_peopleInTable.id_item = Item.ItemID AND Item_peopleInTable.id_peopleInTable = ${JSON.stringify(event.queryStringParameters.fetchItemPeopleInTable)} ORDER BY date DESC;`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }
    else if (event.queryStringParameters?.itemsAcordingCategory !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`select ItemID, title, description, price from Category , Item
where CategoryID = Item.id_category AND CategoryID=${event.queryStringParameters.itemsAcordingCategory}`, function (error, results, fields) {
                resolve(results)
            });
        })
        result = await promiseQuery
    }

    else if (event.queryStringParameters?.makeDelivered !== undefined) {
        const promiseQuery = new Promise((resolve) => {
            connection.query(`Update Item_peopleInTable SET state = "delivered" where ItemPeopleInTableID = ${JSON.stringify(event.pathParameters.proxy.slice(0, 36))} ;`, function (error, results, fields) {
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
