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

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('outdoormaster ski goggles', 'sports', 49.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('jbl bluetooth speaker', 'music', 79.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('adidas busenitz shoes', 'shoes', 69.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('gopro hero7 black', 'home', 399.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('brita water pitcher', 'kitchen', 27.99, 70);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('sheba cat food', 'pets', 13.50, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('cheez-it', 'food', 4.99, 300);