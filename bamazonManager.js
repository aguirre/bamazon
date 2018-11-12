require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});

// Global Variables
let currentProducts = [];

// Bamazon Manager View
let runManager = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewSales();
          break;

        case "View Low Inventory":
          viewLow();
          break;

        case "Add to Inventory":
          createArray();
          break;

        case "Add New Product":
          newItem();
          break;
      }
    });
};

connection.connect(function(err) {
  if (err) throw err;
  runManager();
});
