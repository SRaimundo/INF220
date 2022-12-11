-- Usable update examples

-- Create a new reserve
INSERT INTO RESERVA VALUES(1, 501, '2022-12-06', '2022-12-09', false, false);
INSERT INTO RESERVA VALUES(5, 205, '2022-12-06', '2022-12-09', false, false);
INSERT INTO RESERVA VALUES(4, 103, '2022-12-12', '2022-12-15', false, false);
INSERT INTO RESERVA VALUES(2, 701, '2022-12-12', '2022-12-15', false, false);

UPDATE RESERVA
SET Check_in = true
WHERE Cliente = 1 AND Quarto = 501 AND Data_in = '2022-12-06';
