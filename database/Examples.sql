-- It simulate the first day of Bom Sono's company (population of data)

INSERT INTO HOTEL (Nome, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Durma Bem', 'Rua Avenida', '10', NULL, 'Copacabana', 'Rio de Janeiro', 'RJ');
INSERT INTO HOTEL (Nome, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Minha Cama', 'Avenida Raimunda Pinto', '105479', NULL, 'Centro', 'Lassance', 'MG');
INSERT INTO HOTEL (Nome, Rua, Numero, Complemento, Bairro, Cidade, UF)
VALUES('Esquina', 'Avenida dos Professores', 's/n', 'CCE', 'Bela Vista', 'Viçosa', 'MG');

INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(300.00, false, false, 1, 0);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(450.00, true, false, 2, 0);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(400.00, true, true, 1, 0);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(600.00, true, false, 1, 1);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(700.00, true, true, 1, 1);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(800.00, true, false, 2, 1);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(250.00, false, false, 0, 1);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(300.00, true, false, 0, 1);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(900.00, true, false, 4, 1);
INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
VALUES(950.00, true, true, 4, 1);

INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(101, 1, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(102, 2, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(103, 2, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(104, 1, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(105, 1, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(201, 5, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(202, 6, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(203, 7, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(204, 5, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(205, 5, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(301, 1, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(302, 4, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(303, 4, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(304, 3, 1);

INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(401, 8, 1);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(402, 8, 2);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(403, 8, 2);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(501, 9, 2);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(502, 9, 2);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(503, 9, 2);

INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(601, 10, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(602, 10, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(603, 1, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(604, 1, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(701, 2, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(702, 2, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(703, 3, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(704, 3, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(801, 4, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(802, 4, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(803, 5, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(804, 5, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(901, 6, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(902, 6, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(903, 7, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(904, 7, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(1001, 8, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(1002, 8, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(1003, 9, 3);
INSERT INTO QUARTO (Numero, Tipo, Hotel)
VALUES(1004, 9, 3);

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

INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 1);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 1);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 1);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 2);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 2);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 2);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 2);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 3);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 3);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 3);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 3);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 3);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 3);
INSERT INTO VAGA (Status, Cliente, Hotel)
VALUES(false, NULL, 3);

INSERT INTO RESERVA
VALUES(1, 501, '2022-12-06', '2022-12-09', false, false);
INSERT INTO RESERVA
VALUES(5, 205, '2022-12-06', '2022-12-09', false, false);
INSERT INTO RESERVA
VALUES(4, 103, '2022-12-12', '2022-12-15', false, false);
INSERT INTO RESERVA
VALUES(2, 701, '2022-12-12', '2022-12-15', false, false);
INSERT INTO RESERVA
VALUES(3, 101, '2022-02-26', '2022-02-27', false, false);

INSERT INTO ARRUMACAO
VALUES(1 , 103, '2022-12-13');
INSERT INTO ARRUMACAO
VALUES(5 , 103, '2022-12-15');
INSERT INTO ARRUMACAO
VALUES(1 , 501, '2022-12-08');
INSERT INTO ARRUMACAO
VALUES(5 , 205, '2022-12-07');
INSERT INTO ARRUMACAO
VALUES(3 , 401, '2022-02-27');
INSERT INTO ARRUMACAO
VALUES(2 , 401, '2022-03-01');
INSERT INTO ARRUMACAO
VALUES(2 , 401, '2022-02-28');

INSERT INTO CONTA_HOTEL
VALUES(1, 1);
INSERT INTO CONTA_HOTEL
VALUES(2, 2);
INSERT INTO CONTA_HOTEL
VALUES(5, 3);

INSERT INTO DESPESA
VALUES(1, 1, 1, '2022-12-06', 'Doce de leite Viçosa', 28.89);
INSERT INTO DESPESA
VALUES(1, 1, 2, '2022-12-09', 'Red Bull', 10.5);
INSERT INTO DESPESA
VALUES(2, 2, 3, '2022-12-13', 'Pão com linguiça', 135.5);
INSERT INTO DESPESA
VALUES(1, 1, 4, '2022-12-07', 'Sonho de Valsa', 0.30);
INSERT INTO DESPESA
VALUES(5, 3, 5, '2022-12-09', 'Coca Cola', 22.50);

INSERT INTO CONTA_RESTAURANTE
VALUES(1, 1);
INSERT INTO CONTA_RESTAURANTE
VALUES(3, 2);
INSERT INTO CONTA_RESTAURANTE
VALUES(5, 3);

INSERT INTO DESPESA_REFEICAO
VALUES(1, 1, 1, '2022-12-06', 'Buchada de bode com caviar', 2.89, true);
INSERT INTO DESPESA_REFEICAO
VALUES(1, 1, 2, '2022-12-07', 'Carne moída com limonada', 50.0, false);
INSERT INTO DESPESA_REFEICAO
VALUES(3, 2, 3, '2022-12-14', 'Coxinha de capifrango', 30.27, true);
INSERT INTO DESPESA_REFEICAO
VALUES(5, 3, 4, '2022-12-09', 'Jiló com beringela', 1.39, false);
