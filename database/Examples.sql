-- It simulate the first day of Bom Sono's company (population of data)

INSERT INTO HOTEL (Nome, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Durma Bem', 'Rua Avenida', '10', NULL, 'Copacabana', 'Rio de Janeiro', 'RJ');
INSERT INTO HOTEL (Nome, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Minha Cama', 'Avenida Raimunda Pinto', '105479', NULL, 'Centro', 'Lassance', 'MG');
INSERT INTO HOTEL (Nome, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Esquina', 'Avenida dos Professores', 's/n', 'CCE', 'Bela Vista', 'Viçosa', 'MG');

INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
VALUES(300.00, true, false, 1, 0);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
VALUES(550.00, false, false, 2, 0);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
VALUES(450.00, false, true, 1, 1);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
VALUES(600.00, true, false, 1, 2);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
VALUES(250.00, false, true, 0, 1);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
VALUES(350.00, false, true, 0, 2);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
VALUES(450.00, false, true, 0, 3);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_casal, Numero_camas_solteiro)
VALUES(550.00, false, false, 0, 4);

INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(101, 1, 1);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(102, 1, 2);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(103, 1, 2);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(104, 1, 1);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(105, 1, 1);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(201, 1, 5);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(202, 1, 6);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(203, 1, 7);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(204, 1, 5);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(205, 1, 5);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(301, 1, 1);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(302, 1, 4);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(303, 1, 4);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(304, 1, 3);

INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(401, 2, 8);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(402, 2, 8);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(403, 2, 8);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(501, 2, 8);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(502, 2, 8);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(503, 2, 8);

INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(601, 3, 6);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(602, 3, 4);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(603, 3, 1);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(604, 3, 1);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(701, 3, 1);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(702, 3, 2);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(703, 3, 3);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(704, 3, 3);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(801, 3, 4);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(802, 3, 4);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(803, 3, 5);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(804, 3, 5);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(901, 3, 6);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(902, 3, 6);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(903, 3, 7);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(904, 3, 7);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(1001, 3, 8);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(1002, 3, 8);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(1003, 3, 4);
INSERT INTO QUARTO (Numero, Hotel, Tipo)
VALUES(1004, 3, 3);

INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('João Vitor Ramos', '31992920909', 'Indonésia', 'joaozin@email.com', '@amoindonesia123', 'Rua Indonesa', '123', NULL, 'Centro', 'Jacarta', 'JV');
INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('João Lucas Solano', '3190902424', 'Brasil', 'solanolucas@email.com', 'aimessi', 'Rua Meio do Mato', '1', 'Lagoa Azul', 'Floresta', 'Roça', 'MG');
INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Yuri Dias', '3198212452', 'Brasil', 'diasminecraft@email.com', '123@senha', 'Avenida Antônio Mendes', '14', NULL, 'Savassi', 'Belo Horizonte', 'MG');
INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Marcos Augusto', '7387823031', 'Brasil', 'acaraje@email.com', '#lula132023', 'Rua Pé de Moleque', '13', NULL, 'Centro', 'Salvador', 'BA');
INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Samuel Raimundo', '3140028222', 'Brasil', 'rodrigao@email.com', 'senhaforte', 'Rua Única', '2', 'Praça Só Tem Uma', 'Primeiro', 'Lassance', 'MG');
INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Felipe de Assis', '6340312211', 'Inglaterra', 'queenelisa@email.com', '12ilove14tea@', 'Rua Very Important', '45', NULL, 'Center', 'Britânica', 'UK');
INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Otaviano Ferreira', '1226567098', 'Brasil', 'otavioF@email.com', '@41liJk2FR', 'Rua dos Estudantes', '150', 'Apto 301', 'Centro', 'Viçosa', 'MG');

INSERT INTO FUNCIONARIO (Nome, Cargo)
VALUES('Edilene', 'Camareira');
INSERT INTO FUNCIONARIO (Nome, Cargo)
VALUES('Marlene', 'Camareira');
INSERT INTO FUNCIONARIO (Nome, Cargo)
VALUES('Lúcio', 'Porteiro');
INSERT INTO FUNCIONARIO (Nome, Cargo)
VALUES('Carlos', 'Jardineiro');
INSERT INTO FUNCIONARIO (Nome, Cargo)
VALUES('Túlio', 'Camameiro');

INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(1, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(2, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(2, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(2, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(2, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(2, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(2, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(3, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(3, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(3, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(3, NULL);
INSERT INTO VAGA (Hotel, Hospedagem)
VALUES(3, NULL);

INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
VALUES(1, 8, 3, '2022-12-06', '2022-12-09');
INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
VALUES(5, 5, 1, '2022-12-06', '2022-12-09');
INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
VALUES(4, 2, 1, '2022-12-12', '2022-12-15');
INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
VALUES(2, 1, 2, '2022-12-12', '2022-12-15');
INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
VALUES(3, 1, 2, '2022-02-26', '2022-02-27');
INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
VALUES(7, 4, 4, '2022-03-01', '2022-03-05');
INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
VALUES(6, 4, 3, '2022-03-07', '2022-03-10');

INSERT INTO HOSPEDAGEM (Reserva, Quarto, Hotel, Check_in, Check_out)
VALUES(1, 501, 2, '2022-12-06 10:12:15', NULL);
INSERT INTO HOSPEDAGEM (Reserva, Quarto, Hotel, Check_in, Check_out)
VALUES(2, 205, 1, '2022-12-06 14:45:42', NULL);
INSERT INTO HOSPEDAGEM (Reserva, Quarto, Hotel, Check_in, Check_out)
VALUES(3, 103, 1, '2022-12-12 09:21:02', NULL);
INSERT INTO HOSPEDAGEM (Reserva, Quarto, Hotel, Check_in, Check_out)
VALUES(5, 101, 1, '2022-02-26 09:27:04', NULL);
INSERT INTO HOSPEDAGEM (Reserva, Quarto, Hotel, Check_in, Check_out)
VALUES(7, 801, 3, '2022-03-07 13:31:31', NULL);

INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor)
VALUES(1, '2022-12-06 14:17:14', 'Doce de leite Viçosa', 28.89);
INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor)
VALUES(3, '2022-12-12 22:41:20', 'Red Bull', 10.5);
INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor)
VALUES(1, '2022-12-07 12:54:02', 'Pão com linguiça', 135.5);
INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor)
VALUES(2, '2022-12-07 15:23:14', 'Sonho de Valsa', 0.30);
INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor)
VALUES(5, '2022-03-08 13:32:21', 'Coca Cola', 22.50);

INSERT INTO CONSUMO_RESTAURANTE (Hospedagem, Data, Descricao, Valor, Entregue)
VALUES(1, '2022-12-06 20:56:12', 'Buchada de bode com caviar', 2.89, true);
INSERT INTO CONSUMO_RESTAURANTE (Hospedagem, Data, Descricao, Valor, Entregue)
VALUES(1, '2022-12-07 20:43:14', 'Carne moída com limonada', 50.0, false);
INSERT INTO CONSUMO_RESTAURANTE (Hospedagem, Data, Descricao, Valor, Entregue)
VALUES(2, '2022-12-07 13:50:21', 'Coxinha de capifrango', 30.27, true);
INSERT INTO CONSUMO_RESTAURANTE (Hospedagem, Data, Descricao, Valor, Entregue)
VALUES(5, '2022-12-09 12:30:07', 'Jiló com beringela', 1.39, false);

INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario)
VALUES(103, 1, '2022-12-13', 1);
INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario)
VALUES(103, 1, '2022-12-15', 1);
INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario)
VALUES(501, 2, '2022-12-08', 5);
INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario)
VALUES(205, 1, '2022-12-07', 5);
INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario)
VALUES(401, 2, '2022-02-27', 1);
INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario)
VALUES(401, 2, '2022-03-01', 2);
INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario)
VALUES(401, 2, '2022-02-28', 2);
