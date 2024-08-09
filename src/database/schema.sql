--  docker exec -it postgres-contacts bash

CREATE DATABASE mycontacts;

-- \l lista os bancos

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- \c mycontacts - Contac com o banco

-- \dt - Lista as tabelas

CREATE TABLE IF NOT EXISTS categories(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone_number VARCHAR,
  category_id UUID,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
