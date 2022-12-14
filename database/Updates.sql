-- Restart database

	mysql -u root -p;
	DROP DATABASE BOM_SONO;
	\! mysql -u root -p < Create.sql && mysql -u root -p BOM_SONO < Examples.sql
	USE BOM_SONO;
	
-- Create

	-- Hotel
	INSERT INTO HOTEL (Nome, Rua, Numero, Complemento, Bairro, Cidade, UF)
	VALUES('Durma Bem', 'Rua Avenida', '10', NULL, 'Copacabana', 'Rio de Janeiro', 'RJ');

	-- Type of room
	INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
	VALUES(300.00, true, false, 1, 0);
	
	-- Room
	INSERT INTO QUARTO (Numero, Hotel, Tipo)
	VALUES(101, 1, 1);
	
	-- Client
	INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
	VALUES('João Vitor Ramos', '31992920909', 'Indonésia', 'joaozin@email.com', '@amoindonesia123', 'Rua Indonesa', '123', NULL, 'Centro', 'Jacarta', 'JV');
	
	-- Guest
	INSERT INTO HOSPEDE
	VALUES(10, 2, 'Maria José', 'maria@email.com', '00000000000', '1982-07-02', 'F', 'Costureira', 'Brasil', NULL, NULL, NULL, '0055', '033', '999929292', NULL, NULL, NULL, 'Rua da Sua Casa', '27', 'Seu Bairro', 'Sua Cidade', 'Seu Estado', 'Seu Pais', '303030000', 'Viçosa', 'MG', 'Brasil', 'Ubá', 'MG', 'Brasil', 01, 01, NULL);
	
	-- Reserve
	INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
	VALUES(4, 2, 1, '2022-12-12', '2022-12-15');
	
	-- Lodge
	INSERT INTO HOSPEDAGEM (Reserva, Quarto, Hotel, Check_in, Check_out)
	VALUES(3, 103, 1, '2022-12-12 09:21:02', NULL);

	-- Hotel expense
	INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor)
	VALUES (3, '2022-12-12 22:46:25', 'Red Bull', 10.5);
	
	-- Restaurant expense
	INSERT INTO CONSUMO_RESTAURANTE (Hospedagem, Data, Descricao, Valor, Entregue)
	VALUES (3, '2022-12-12 22:45:20', 'Red Bull', 12.5, true);
	
	-- Employee
	INSERT INTO FUNCIONARIO (Nome, Cargo)
	VALUES('Thiago', 'Professor');
	
	-- Cleaning
	INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario)
	VALUES(103, 1, '2022-12-15', 1);
	
	-- Parking
	INSERT INTO VAGA (Hotel, Hospedagem)
	VALUES(3, NULL);

-- Update

	-- Lodge
	UPDATE HOSPEDAGEM
	SET Check_out = '2022-12-07 15:20:34'
	WHERE Id_hospedagem = 5;
	
	-- Parking
	UPDATE VAGA
	SET Hospegagem = 3
	WHERE Id_vaga = 4;
