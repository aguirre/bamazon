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
var choices = [];
var currentProducts = [];

// Bamazon Customer View
var productInfo = () => {
  connection.query(
    "SELECT item_id, product_name, price FROM products",
    function(err, res) {
      if (err) throw err;
      console.log(
        "\n------------------------- BAMAZON PRODUCTS --------------------------\n"
      );
      console.table(res);
      console.log(
        "\n---------------------------------------------------------------------\n"
      );
      createArray();
    }
  );
};

var createArray = () => {
  connection.query("SELECT product_name FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      currentProducts.push(res[i].product_name);
    }
    buyItem();
  });
};

var buyItem = () => {
  inquirer
    .prompt([
      {
        name: "item",
        type: "list",
        message: "Which item would you like?",
        choices: currentProducts
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like?",
        validate: function(value) {
          if (Number.isInteger(parseInt(value)) && value > 0) {
            return true;
          } else {
            return `${value} is not a valid quantity!`;
          }
        }
      }
    ])
    .then(function(answers) {
      connection.query(
        "SELECT * FROM products WHERE ?",
        { product_name: answers.item },
        function(err, res) {
          if (err) throw err;

          if (answers.quantity <= res[0].stock_quantity) {
            console.log(
              `\n\n"${
                res[0].product_name
              }" has been added to your cart:\n     Quantity:      ${
                answers.quantity
              }\n     Per Product:   $${
                res[0].price
              }\n     Total:         $${parseInt(res[0].price) *
                parseInt(answers.quantity)}`
            );
            console.log(
              "\n---------------------------------------------------------------------\n"
            );
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                { stock_quantity: res[0].stock_quantity - answers.quantity },
                { product_name: answers.item }
              ],
              function(err, res) {
                if (err) throw err;
                connection.end();
              }
            );
          } else {
            console.log("\nInsufficient quantity!\n");
            console.log(
              "\n---------------------------------------------------------------------\n"
            );

            productInfo();
          }
        }
      );
    });
};

connection.connect(function(err) {
  if (err) throw err;
  productInfo();
});
