-- List a client from part of his/her name
SELECT idCliente, Nome
FROM CLIENTE
WHERE Nome LIKE '%Yuri%';

-- List a hotel from its city
SELECT idHotel, Nome
FROM HOTEL
WHERE Cidade = 'Rio de Janeiro';

-- List the rooms from a Hotel's code
SELECT Numero as Quarto
FROM QUARTO
WHERE Hotel = 2;

-- List the rooms from a Hotel's name
SELECT Q.Numero as Quarto
FROM QUARTO Q, HOTEL H
WHERE Q.Hotel = H.idHotel AND H.Nome = 'Durma Bem';

-- List the rooms from part of a Hotel's name
SELECT Q.Numero as Quarto, H.Nome as Hotel
FROM QUARTO Q, HOTEL H
WHERE Q.Hotel = H.Codigo AND H.Nome LIKE '%Durma%';

-- List the adapted rooms
SELECT Q.Numero as Quarto, Adaptado
FROM QUARTO Q, TIPO_QUARTO T
WHERE Q.Tipo = T.idTipo AND T.Adaptado = true;

-- List the rooms from a especific type
SELECT Numero as Quarto
FROM QUARTO
WHERE Tipo = 2;

-- Search a empty room of an especific type in some period (In: '2022-12-07', Out: '2022-12-13')
SELECT Numero as Quarto
FROM QUARTO
WHERE Tipo = 2 AND Numero NOT IN (
	SELECT Quarto
	FROM RESERVA
	WHERE Data_in < '2022-12-13' AND Data_out > '2022-12-07'
);

-- List the clients in a Hotel from its city
SELECT C.Nome
FROM CLIENTE C, HOTEL H, QUARTO Q, RESERVA R
WHERE C.idCliente = R.Cliente AND Q.Numero = R.Quarto AND Q.Hotel = H.idHotel AND H.Nome IN (
	SELECT Nome
	FROM HOTEL
	WHERE Cidade = 'Rio de Janeiro'
);
