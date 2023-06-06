/**
  *
  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
  */


exports.handler = async (event) => {

    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host:
            'myorderdatabase.cluster-ctulrcqrkejd.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'admin123456',
        database: 'myorder'
    });

    const promiseQuery = new Promise((resolve) => {
        connection.query('SELECT * from Restaurant', function
            (error, results, fields) {
            resolve(results)
        });
    })

    const result = await promiseQuery


    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(result),
    };
};
