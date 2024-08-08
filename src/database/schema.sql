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
