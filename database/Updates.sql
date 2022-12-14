-- Usable update examples
INSERT INTO CONSUMO_RESTAURANTE (Hospedagem, Data, Descricao, Valor, Entregue) VALUES (3, '2022-12-12 22:45:20', 'Red Bull', 12.5, true);
INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor) VALUES (3, '2022-12-12 22:46:25', 'Red Bull', 10.5);

-- DROP DATABASE BOM_SONO;
-- \! mysql -u root -p < Create.sql && mysql -u root -p BOM_SONO < Examples.sql
-- USE BOM_SONO;

-- Create a new reserve
INSERT INTO RESERVA VALUES(1, 501, '2022-12-06', '2022-12-09', false, false);
INSERT INTO RESERVA VALUES(5, 205, '2022-12-06', '2022-12-09', false, false);
INSERT INTO RESERVA VALUES(4, 103, '2022-12-12', '2022-12-15', false, false);
INSERT INTO RESERVA VALUES(2, 701, '2022-12-12', '2022-12-15', false, false);

UPDATE RESERVA
SET Check_in = true
WHERE Cliente = 1 AND Quarto = 501 AND Data_in = '2022-12-06';
