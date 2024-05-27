DROP DATABASE IF EXISTS uo303984;
CREATE DATABASE uo303984;
USE uo303984;

-- Creamos la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creamos la tabla de regalos
CREATE TABLE IF NOT EXISTS presents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    url VARCHAR(255),
    price DECIMAL(10, 2),
    chosen_by VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Creamos la tabla de amigos
CREATE TABLE IF NOT EXISTS friends (
  emailMainUser VARCHAR(255) NOT NULL,
  emailFriend VARCHAR(255) NOT NULL,
  PRIMARY KEY (emailMainUser, emailFriend),
  FOREIGN KEY (emailMainUser) REFERENCES users(email),
  FOREIGN KEY (emailFriend) REFERENCES users(email)
);


-- Tabla de claves activas
CREATE TABLE active_keys (
    user_id INT PRIMARY KEY,
    api_key VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertamos datos de prueba en la tabla de usuarios
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', '$2b$10$KVUMPqx0IlPmdP9To2NL3Ojd73a4o22J/mzhkhL4QWYPCSjhBJI0y'),
('jane_doe', 'jane@example.com', '$2b$10$KVUMPqx0IlPmdP9To2NL3Ojd73a4o22J/mzhkhL4QWYPCSjhBJI0y'),
('alice', 'alice@example.com', '$2b$10$KVUMPqx0IlPmdP9To2NL3Ojd73a4o22J/mzhkhL4QWYPCSjhBJI0y'),
('bob', 'bob@example.com', '$2b$10$KVUMPqx0IlPmdP9To2NL3Ojd73a4o22J/mzhkhL4QWYPCSjhBJI0y');

-- Insertamos datos de prueba en la tabla de regalos
INSERT INTO presents (user_id, name, description, url, price, chosen_by) VALUES
(1, 'Car', 'A toy car', 'http://example.com/car', 10.99, NULL),
(1, 'Bike', 'A mountain bike', 'http://example.com/bike', 299.99, NULL),
(2, 'Laptop', 'A powerful laptop', 'http://example.com/laptop', 999.99, NULL),
(3, 'Watch', 'A luxury watch', 'http://example.com/watch', 199.99, NULL);

-- Insertamos datos de prueba en la tabla de amigos
INSERT INTO friends (emailMainUser, emailFriend) VALUES
('john@example.com', 'jane@example.com'),
('john@example.com', 'alice@example.com'),
('jane@example.com', 'bob@example.com'),
('alice@example.com', 'john@example.com');