-- List the id of clients (and his/her name) from part of his/her name
SELECT Id_cliente, Nome
FROM CLIENTE
WHERE Nome LIKE '%João%';

-- List the id of hotels (and its name) from its city
SELECT Id_hotel, Nome
FROM HOTEL
WHERE Cidade = 'Rio de Janeiro';

-- List the rooms from a Hotel's code
SELECT Numero as Quarto
FROM QUARTO
WHERE Hotel = 2;

-- List the rooms from a Hotel's name
SELECT Q.Numero as Quarto
FROM QUARTO Q, HOTEL H
WHERE Q.Hotel = H.Id_hotel AND H.Nome = 'Durma Bem';

-- List the rooms from part of a Hotel's name
SELECT Q.Numero as Quarto, H.Nome as Hotel
FROM QUARTO Q, HOTEL H
WHERE Q.Hotel = H.Id_hotel AND H.Nome LIKE '%Durma%';

-- List the adapted rooms
SELECT Q.Numero as Quarto, Adaptado
FROM QUARTO Q, TIPO_QUARTO T
WHERE Q.Tipo = T.Id_tipo AND T.Adaptado = true;

-- List the rooms and its hotel name from a especific type of room
SELECT QUARTO.Numero as Quarto, HOTEL.Nome as Hotel
FROM QUARTO, HOTEL
WHERE Tipo = 2 AND Hotel = Id_hotel;

-- ATENCAO
-- ATENCAO 
-- ATENCAO 
-- ATENCAO 
-- ATENCAO 
-- ATENCAO 
-- ATENCAO 
-- ATENCAO  
-- Search for a room that isn't lodged of an especific data (In: '2022-12-07', Out: '2022-12-13')
SELECT Numero as Quarto
FROM QUARTO
WHERE Tipo = 2 AND Numero NOT IN (
	SELECT Quarto
	FROM HOSPEDAGEM
	WHERE Check_in < '2022-12-13 00:00:00' AND Check_out > '2022-12-07'
);

-- List the clients lodged in a Hotel from its city
SELECT DISTINCT C.Nome
FROM CLIENTE C, HOTEL H, RESERVA R, HOSPEDAGEM HP
WHERE HP.Reserva = R.Id_reserva AND R.Cliente = C.Id_cliente AND HP.Quarto IN (
	SELECT QUARTO.Numero
	FROM HOTEL, QUARTO
	WHERE QUARTO.Hotel = Id_hotel AND Cidade = 'Rio de Janeiro'
);

-- List reserve (and its client name) that made check-in (lodging)
SELECT R.Id_reserva, C.Nome
FROM RESERVA R, HOSPEDAGEM H, CLIENTE C
WHERE R.Id_reserva = H.Reserva AND R.Cliente = C.Id_cliente AND H.Check_out IS NULL;

-- List reserve (and its client name) that didn't make check-in (lodging)
SELECT DISTINCT R.Id_reserva, C.Nome
FROM RESERVA R, CLIENTE C
WHERE R.Cliente = C.Id_cliente AND R.Id_reserva NOT IN (
	SELECT Reserva
	FROM HOSPEDAGEM
);

-- List reserve (and its client name) that made check-in and check-out (lodging)
SELECT R.Id_reserva, C.Nome
FROM RESERVA R, HOSPEDAGEM H, CLIENTE C
WHERE R.Id_reserva = H.Reserva AND R.Cliente = C.Id_cliente AND H.Check_out IS NOT NULL;

-- Nome dos clientes hospedados na Filial Rio de Janeiro, no período 26/fev a 01/mar/22;
SELECT DISTINCT C.Nome
FROM CLIENTE C, HOTEL H, RESERVA R, HOSPEDAGEM HP
WHERE HP.Reserva = R.Id_reserva AND R.Cliente = C.Id_cliente AND HP.Check_in <= '2022-03-01 00:00:00' AND (HP.Check_out IS NULL OR HP.Check_out >= '2022-02-26 00:00:00') AND HP.Quarto IN (
	SELECT QUARTO.Numero
	FROM HOTEL, QUARTO
	WHERE QUARTO.Hotel = Id_hotel AND Cidade = 'Rio de Janeiro'
);

-- Nome das faxineiras que limparam o quarto 401, Filial Rio de Janeiro, no período 26/fev a 01/mar/22;
SELECT F.Nome
FROM FUNCIONARIO F, ARRUMACAO A, QUARTO Q, HOTEL H
WHERE A.Funcionario = F.Id_funcionario AND A.Quarto = 401 AND A.Quarto = Q.Numero AND H.Id_hotel = Q.Hotel AND H.Cidade = 'Rio de Janeiro' AND A.Data >= '2022-02-26' AND A.Data <= '2022-03-01';

-- DROP DATABASE BOM_SONO;
-- \! mysql -u root -p < Create.sql && mysql -u root -p BOM_SONO < Examples.sql
-- USE BOM_SONO;

SELECT F.Nome, A.Data, Q.Numero as Quarto, Q.Hotel, H.Cidade
FROM FUNCIONARIO F, ARRUMACAO A, QUARTO Q, HOTEL H
WHERE A.Funcionario = F.Id_funcionario AND A.Quarto = 401 AND A.Quarto = Q.Numero AND H.Id_hotel = Q.Hotel AND H.Cidade = 'Rio de Janeiro' AND A.Data >= '2022-02-26' AND A.Data <= '2022-03-01';

-- Hotel, número do quarto e nome dos clientes que consumiram “RedBull” em qualquer data.
SELECT DISTINCT H.Nome as Hotel, HP.Quarto, C.Nome
FROM HOTEL H, HOSPEDAGEM HP, DESPESA_HOTEL DH, CLIENTE C, RESERVA R
WHERE HP.Hotel = H.Id_hotel AND HP.Reserva = R.Id_reserva AND C.Id_cliente = R.Cliente AND DH.Hospedagem = HP.Id_hospedagem AND DH.Descricao = 'Red Bull';

-- Hotel, número do quarto e nome dos clientes que consumiram “RedBull” em qualquer data (consumido no restaurante).
SELECT DISTINCT H.Nome as Hotel, HP.Quarto, C.Nome
FROM HOTEL H, HOSPEDAGEM HP, CONSUMO_RESTAURANTE CR, CLIENTE C, RESERVA R
WHERE HP.Hotel = H.Id_hotel AND HP.Reserva = R.Id_reserva AND C.Id_cliente = R.Cliente AND CR.Hospedagem = HP.Id_hospedagem AND CR.Descricao = 'Red Bull';

INSERT INTO CONSUMO_RESTAURANTE (Hospedagem, Data, Descricao, Valor, Entregue) VALUES (3, '2022-12-12 22:45:20', 'Red Bull', 12.5, true);
INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor) VALUES (3, '2022-12-12 22:46:25', 'Red Bull', 10.5);

-- Nome dos clientes que fizeram reserva na Filial Rio de Janeiro, mas não se hospedaram;
SELECT C.Nome
FROM CLIENTE C, RESERVA R, HOTEL H, QUARTO Q
WHERE R.Data_in <= '2022-12-07' AND R.Check_in = false 
AND C.idCliente = R.Cliente AND R.Quarto = Q.Numero 
AND Q.Hotel = H.idHotel AND H.Cidade = 'Rio de Janeiro';

SELECT DISTINCT C.Nome
FROM RESERVA R, CLIENTE C
WHERE R.Cliente = C.Id_cliente AND R.Id_reserva NOT IN (
	SELECT Reserva
	FROM HOSPEDAGEM
);

--Número de quartos tipo “1 Cama de Casal” em cada filial;
SELECT H.Nome, COUNT(Q.Numero) as 'Quantidade de quartos'
FROM QUARTO Q, HOTEL H, TIPO_QUARTO T
WHERE Q.Hotel = H.Id_hotel AND Q.Tipo = T.Id_tipo AND T.Numero_camas_casal = 1
GROUP BY Q.Hotel;

-- Listar Filial e nome dos clientes com 5 maiores faturas;
SELECT SUM(DH.Valor) as Fatura, C.Nome
FROM DESPESA_HOTEL DH, HOSPEDAGEM HP, RESERVA R, CLIENTE C
WHERE DH.Hospedagem = HP.Id_hospedagem AND HP.Reserva = R.Id_reserva AND R.Cliente = C.Id_cliente
GROUP BY DH.Hospedagem;

-- Alguma consulta baseada na sua funcionalidade adicional;
