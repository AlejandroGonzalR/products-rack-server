CREATE DATABASE productsapp;
CREATE ROLE lab WITH LOGIN PASSWORD 'r345';
GRANT ALL PRIVILEGES ON DATABASE productsapp TO lab;
\c productsapp

CREATE TABLE products (
  ID SERIAL PRIMARY KEY,
  description VARCHAR(60),
  url VARCHAR(30)
);

INSERT INTO products (description, url)
VALUES
('Chocolates semiamargos rellenos de tequila', '/images/chocolates-tequila.jpg'),
('Chocolates con leche', '/images/conejo-turin.jpg'),
('Huevos De Pascua 100% Artesanales.', '/images/huevos-chocolate.jpg'),
('Hecho en chocolate negro cubierto en dorado.', '/images/oscar-chocolate.jpg'),
('Uvas pasas recubiertas con chocolate leche', '/images/uvas_cheveres.jpeg');

ALTER TABLE products OWNER TO lab;
COMMIT;
