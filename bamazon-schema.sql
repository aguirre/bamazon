DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(11,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);