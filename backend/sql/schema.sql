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