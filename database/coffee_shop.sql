CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_no VARCHAR(20) UNIQUE NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    hourly_rate DECIMAL(10,2) DEFAULT 0,
    face_encoding LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','cashier','kitchen') NOT NULL,
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    status ENUM('available','unavailable') DEFAULT 'available',
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    size ENUM('Small','Medium','Large') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE addons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    addon_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status ENUM('available','unavailable') DEFAULT 'available'
);


INSERT INTO categories(category_name) VALUES
('Coffee'),
('Milk Tea'),
('Fruit Tea'),
('Snacks');

INSERT INTO addons(addon_name,price) VALUES
('Extra Shot',30),
('Pearl',20),
('Cream Cheese',35),
('Whipped Cream',25),
('Oat Milk',40);