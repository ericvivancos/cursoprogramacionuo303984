CREATE DATABASE IF NOT EXISTS uo303984;
USE uo303984;

-- Creamos la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50),
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_user_id INT,
    friend_user_id INT,
    FOREIGN KEY (main_user_id) REFERENCES users(id),
    FOREIGN KEY (friend_user_id) REFERENCES users(id)
);