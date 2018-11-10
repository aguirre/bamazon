var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

beginTransaction();

function beginTransaction() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) console.log(err);
    result.forEach(printItem, this);
    getInput(result.length);
  });
}
