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
var currentProducts = [];

// Bamazon Manager View
var runManager = () => {
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

var viewSales = () => {
  connection.query(
    "SELECT item_id, product_name, price, stock_quantity FROM products",
    function(err, res) {
      if (err) throw err;
      console.log(
        "\n------------------------- BAMAZON PRODUCTS --------------------------\n"
      );
      console.table(res);
      console.log(
        "\n---------------------------------------------------------------------\n"
      );
      runManager();
    }
  );
};

var viewLow = () => {
  connection.query(
    "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity<5",
    function(err, res) {
      if (err) throw err;
      console.log(
        "\n----------------------- BAMAZON LOW INVENTORY -----------------------\n"
      );
      console.table(res);
      console.log(
        "\n---------------------------------------------------------------------\n"
      );
      runManager();
    }
  );
};

var createArray = () => {
  connection.query("SELECT product_name FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      currentProducts.push(res[i].product_name);
    }
    addInv();
  });
};

var addInv = () => {
  inquirer
    .prompt([
      {
        name: "item",
        type: "list",
        message: "Which item would you like to add inventory to?",
        choices: currentProducts
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to add?",
        validate: function(value) {
          if (Number.isInteger(parseInt(value)) && value > 0) {
            return true;
          } else {
            return `${value} is not a valid quantity`;
          }
        }
      }
    ])
    .then(function(answers) {
      connection.query(
        "SELECT product_name, stock_quantity FROM products WHERE ?",
        { product_name: answers.item },
        function(err, res) {
          var product = res[0];
          var quantity =
            parseInt(product.stock_quantity) + parseInt(answers.quantity);
          if (err) throw err;
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              { stock_quantity: quantity },
              { product_name: product.product_name }
            ],
            function(err, res) {
              if (err) throw err;
              console.log(
                `${product.product_name} stock is now updated to ${quantity}`
              );
              runManager();
            }
          );
        }
      );
    });
};

connection.connect(function(err) {
  if (err) throw err;
  runManager();
});
