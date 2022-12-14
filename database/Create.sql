CREATE DATABASE BOM_SONO;
USE BOM_SONO;

CREATE TABLE HOTEL (
    Id_hotel INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Rua VARCHAR(100) NOT NULL,
    Numero VARCHAR(100) NOT NULL,
    Complemento VARCHAR(100),
    Bairro VARCHAR(100) NOT NULL,
    Cidade VARCHAR(100) NOT NULL,
    UF VARCHAR(2) NOT NULL,
    PRIMARY KEY (Id_hotel)
);

-- Remove Tem_TV and Adaptado from TIPO_QUARTO
CREATE TABLE TIPO_QUARTO (
    Id_tipo INT NOT NULL AUTO_INCREMENT,
    Valor FLOAT NOT NULL,
    Tem_TV BOOLEAN NOT NULL,
    Adaptado BOOLEAN NOT NULL,
    Numero_camas_casal INT NOT NULL,
    Numero_camas_solteiro INT NOT NULL,
    PRIMARY KEY (Id_tipo)
);

CREATE TABLE QUARTO (
    Numero INT NOT NULL,
    Hotel INT NOT NULL,
    Tipo INT NOT NULL,
    PRIMARY KEY (Numero, Hotel),
    FOREIGN KEY (Hotel) REFERENCES HOTEL(Id_hotel) ON DELETE CASCADE,
    FOREIGN KEY (Tipo) REFERENCES TIPO_QUARTO(Id_tipo) ON DELETE CASCADE
);

CREATE TABLE CLIENTE (
    Id_cliente INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Telefone CHAR(11) NOT NULL,
    Pais_origem VARCHAR(30) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Senha VARCHAR(50) NOT NULL,
    Rua VARCHAR(100) NOT NULL,
    Numero INT NOT NULL,
    Complemento VARCHAR(100),
    Bairro VARCHAR(50) NOT NULL,
    Cidade VARCHAR(50) NOT NULL,
    UF CHAR(2) NOT NULL,
    PRIMARY KEY (Id_cliente)
);

CREATE TABLE RESERVA (
		Id_reserva INT NOT NULL AUTO_INCREMENT,
    Cliente INT NOT NULL,
    Tipo INT NOT NULL,
    Num_hospedes INT NOT NULL,
    Data_prevista_entrada DATE NOT NULL,
    Data_prevista_saida DATE NOT NULL,
    PRIMARY KEY (Id_reserva),
    FOREIGN KEY (Cliente) REFERENCES CLIENTE(Id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (Tipo) REFERENCES TIPO_QUARTO(Id_tipo) ON DELETE CASCADE
);

CREATE TABLE HOSPEDAGEM (
		Id_hospedagem INT NOT NULL AUTO_INCREMENT,
		Reserva INT NOT NULL,
		Quarto INT NOT NULL,
		Hotel INT NOT NULL,
		Check_in DATETIME NOT NULL,
		Check_out DATETIME,
		PRIMARY KEY (Id_hospedagem),
    FOREIGN KEY (Reserva) REFERENCES RESERVA(Id_reserva) ON DELETE CASCADE,
    FOREIGN KEY (Quarto, Hotel) REFERENCES QUARTO(Numero, Hotel) ON DELETE CASCADE
);

-- I wanna use autoincrement but I can't ;-;
CREATE TABLE HOSPEDE (
  Id_hospede INT NOT NULL,
  Hospedagem INT NOT NULL,
  Nome VARCHAR(100) NOT NULL,
  Email VARCHAR(100),
  CPF CHAR(11),
  Nascimento DATE NOT NULL,
  Sexo CHAR(1) NOT NULL,	-- M or F
  Profissao VARCHAR(30),
  Nacionalidade VARCHAR(50),
  Descricao_documento VARCHAR(30),
  Tipo_documento VARCHAR(30),
  Orgao_exp VARCHAR(30),
  DDI_celular CHAR(4), -- CHAR has a fix length (if DDI = 55, put 0055) -> necessary for pattern
  DDD_celular CHAR(3), -- CHAR has a fix length (if DDD = 33, put 033) -> necessary for pattern
  Numero_celular VARCHAR(10),
  DDD_telefone CHAR(3), -- CHAR has a fix length (if DDD = 33, put 033) -> necessary for pattern
  DDI_telefone CHAR(4), -- CHAR has a fix length (if DDI = 55, put 0055) -> necessary for pattern
  Numero_telefone VARCHAR(10),
  Endereco VARCHAR(150),
  Cidade VARCHAR(150),
  Estado VARCHAR(150),
  Pais VARCHAR(150),
  CEP VARCHAR(30),
  Ultima_cidade VARCHAR(50),
  Ultima_estado VARCHAR(50),
  Ultima_pais VARCHAR(50),
  Proxima_cidade VARCHAR(50),
  Proxima_estado VARCHAR(50),
  Proxima_pais VARCHAR(50),
  Motivo INT,
  Meio_transporte INT,
  Observacoes VARCHAR(300),
  PRIMARY KEY (Id_hospede, Hospedagem),
  FOREIGN KEY (Hospedagem) REFERENCES HOSPEDAGEM(Id_hospedagem) ON DELETE CASCADE
);

CREATE TABLE VAGA (
    Id_vaga INT NOT NULL AUTO_INCREMENT,
    Hotel INT NOT NULL,
    Hospedagem INT,
    PRIMARY KEY (Id_vaga),
    FOREIGN KEY (Hotel) REFERENCES HOTEL(Id_hotel) ON DELETE CASCADE,
    FOREIGN KEY (Hospedagem) REFERENCES HOSPEDAGEM(Id_hospedagem) ON DELETE SET NULL
);

CREATE TABLE FUNCIONARIO (
    Id_funcionario INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Cargo VARCHAR(100) NOT NULL,
    PRIMARY KEY (Id_funcionario)
);

CREATE TABLE ARRUMACAO (
    Quarto INT NOT NULL,
    Hotel INT NOT NULL,
    Data DATE NOT NULL,
    Funcionario INT NOT NULL,
    PRIMARY KEY(Quarto, Hotel, Data),
    FOREIGN KEY (Funcionario) REFERENCES FUNCIONARIO(Id_funcionario) ON DELETE CASCADE,
    FOREIGN KEY (Quarto, Hotel) REFERENCES QUARTO(Numero, Hotel) ON DELETE CASCADE
);

CREATE TABLE DESPESA_HOTEL (
		Id_despesa INT NOT NULL AUTO_INCREMENT,
    Hospedagem INT NOT NULL,
    Data DATETIME NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Valor FLOAT NOT NULL,
    PRIMARY KEY(Id_despesa),
    FOREIGN KEY (Hospedagem) REFERENCES HOSPEDAGEM(Id_hospedagem) ON DELETE CASCADE
);

CREATE TABLE CONSUMO_RESTAURANTE (
		Id_consumo INT NOT NULL,
    Hospedagem INT NOT NULL,
    Data DATETIME NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Valor FLOAT NOT NULL,
    Entrege BOOLEAN NOT NULL,
    PRIMARY KEY(Id_consumo),
    FOREIGN KEY (Hospedagem) REFERENCES HOSPEDAGEM(Id_hospedagem) ON DELETE CASCADE
);
