# Teste técnico Full Stack - Shopper

> Desenvolvido por: Thiago Mamede Rodrigues
> - Email: tmamede2@gmail.com
> - LinkedIn:https://www.linkedin.com/in/thiago-mamede/
> - GitHub: https://github.com/tmamedeTrybe


<br />

- Criação de uma aplicação Full Stack que atualiza preços de produtos de um e-commerce utilizando um arquivo .csv que contem as informações de produtos e preços a alterar.

- Foram seguidas as regras de negócio para validação dos novos preços, exibindo assim os erros correspondentes que impedem a atualização do banco de dados. Só é possível atualizar se todas as informações do arquivo .csv estiverem corretas.

---

# Tecnologias utilizadas :books:

- Front end: Javascript, React, Hooks, Css Modules.
- Back end: Node.js, Typescript, MySQL, Sequelize.

---

# Como utilizar a aplicação

<details>
  <summary><strong> Front end </strong></summary><br>

  - Após clonar o repositório, acesse a pasta `/shopper/frontend`.
  - Digite o comando `npm install` no terminal.
  - Em seguida digite o comando `npm start`.
  - A aplicação irá rodar no endereço `http://localhost:3000/products`.
</details>

---

<details>
  <summary><strong> Back end </strong></summary><br>

  - Após clonar o repositório e acesse a pasta `/shopper/backend`.
  - Digite o comando `npm install` no terminal.
  - Em seguida digitar o comando `npm run dev`.
</details>

---

<details>
  <summary><strong> Banco de dados </strong></summary><br>

  - Segue abaixo script para criar e popular o banco de dados
  
  CREATE DATABASE ShopperDB;

CREATE TABLE products 
( 
	code bigint PRIMARY KEY, # CODIGO DO PRODUTO 
	name varchar(100) NOT NULL, # NOME DO PRODUTO
	cost_price decimal(9,2) NOT NULL, # CUSTO DO PRODUTO
	sales_price decimal(9,2) NOT NULL # PRECO DE VENDA DO PRODUTO
);

INSERT INTO products VALUES (16,'AZEITE  PORTUGUES  EXTRA VIRGEM GALLO 500ML',18.44,20.49);
INSERT INTO products VALUES (18,'BEBIDA ENERGETICA VIBE 2L',8.09,8.99);
INSERT INTO products VALUES (19,'ENERGETICO  RED BULL ENERGY DRINK 250ML',6.56,7.29);
INSERT INTO products VALUES (20,'ENERGETICO RED BULL ENERGY DRINK 355ML',9.71,10.79);
INSERT INTO products VALUES (21,'BEBIDA ENERGETICA RED BULL RED EDITION 250ML',10.71,11.71);
INSERT INTO products VALUES (22,'ENERGETICO  RED BULL ENERGY DRINK SEM ACUCAR 250ML',6.74,7.49);
INSERT INTO products VALUES (23,'AGUA MINERAL BONAFONT SEM GAS 1,5L',2.15,2.39);
INSERT INTO products VALUES (24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99);
INSERT INTO products VALUES (26,'ROLO DE PAPEL ALUMINIO WYDA 30CMX7,5M',5.21,5.79);
INSERT INTO products VALUES (1000,'BEBIDA ENERGETICA VIBE 2L - 6 UNIDADES',48.54,53.94);
INSERT INTO products VALUES (1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78);
INSERT INTO products VALUES (1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00);

CREATE TABLE packs 
(
  id bigint AUTO_INCREMENT PRIMARY KEY, # id primario da tabela
  pack_id bigint NOT NULL,  # id do produto pack 
  product_id bigint NOT NULL, # id do produto componente
  qty bigint NOT NULL, # quantidade do produto componente no pack
  CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
  CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code)
);

INSERT INTO packs (pack_id,product_id, qty) VALUES (1000,18,6);
INSERT INTO packs (pack_id,product_id, qty) VALUES (1010,24,1);
INSERT INTO packs (pack_id,product_id, qty) VALUES (1010,26,1);
INSERT INTO packs (pack_id,product_id, qty) VALUES (1020,19,3);
INSERT INTO packs (pack_id,product_id, qty) VALUES (1020,21,3);
  
</details>



