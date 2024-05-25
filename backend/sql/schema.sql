CREATE DATABASE `uo303984`
 --Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
-- Tabla de regalos
CREATE TABLE presents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    url VARCHAR(255),
    price DECIMAL(10, 2),
    chosen_by VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Tabla de amigos
CREATE TABLE friends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    main_user_email VARCHAR(255) NOT NULL,
    friend_email VARCHAR(255) NOT NULL,
    FOREIGN KEY (main_user_email) REFERENCES users(email),
    FOREIGN KEY (friend_email) REFERENCES users(email)
);