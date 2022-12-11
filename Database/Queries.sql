-- List from a client
SELECT Codigo, Nome
FROM CLIENTE
WHERE Nome LIKE '%Yuri%';

-- List from a hotel in Rio de Janeiro
SELECT Nome
FROM HOTEL
WHERE Cidade = 'Rio de Janeiro';

-- List the rooms from a Hotel's code
SELECT Numero as Quarto
FROM QUARTO
WHERE Hotel = 2;

-- List the rooms from a Hotel's name
SELECT Q.Numero as Quarto
FROM QUARTO Q, HOTEL H
WHERE Q.Hotel = H.Codigo AND H.Nome = 'Durma Bem';

-- List the rooms from part of a Hotel's name
SELECT Q.Numero as Quarto
FROM QUARTO Q, HOTEL H
WHERE Q.Hotel = H.Codigo AND H.Nome LIKE '%Durma%';

-- List the adapted rooms
SELECT Q.Numero as Quarto, Adaptado
FROM QUARTO Q, TIPO_QUARTO T
WHERE Q.Tipo = T.Codigo AND T.Adaptado = true;

-- List the rooms from a especific type
SELECT Numero as Quarto
FROM QUARTO
WHERE Tipo = 2;

-- Search a empty room of an especific type in some period
-- In: '2022-12-07'
-- Out: '2022-12-13'
SELECT Numero as Quarto
FROM QUARTO
WHERE Tipo = 2 AND Numero NOT IN (
	SELECT Quarto
	FROM RESERVA
	WHERE Data_in < '2022-12-13' AND Data_out > '2022-12-07'
);

-- Create a new reserve
INSERT INTO RESERVA VALUES(1, 501, '2022-12-06', '2022-12-09', false, false);
INSERT INTO RESERVA VALUES(5, 205, '2022-12-06', '2022-12-09', false, false);
INSERT INTO RESERVA VALUES(4, 103, '2022-12-12', '2022-12-15', false, false);
INSERT INTO RESERVA VALUES(2, 701, '2022-12-12', '2022-12-15', false, false);

-- List the clients in a Hotel in Rio de Janeiro
SELECT C.Nome 
FROM CLIENTE C, HOTEL H, QUARTO Q, RESERVA R
WHERE C.Codigo = R.Cliente AND Q.Numero = R.Quarto AND Q.Hotel = H.Codigo AND H.Nome in (SELECT Nome FROM HOTEL WHERE Cidade = 'Rio de Janeiro');

UPDATE RESERVA
SET Check_in = true
WHERE Cliente = 1 AND Quarto = 501 AND Data_in = '2022-12-06';
