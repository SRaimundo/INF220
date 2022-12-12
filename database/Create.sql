CREATE DATABASE BOM_SONO;
USE BOM_SONO;

CREATE TABLE HOTEL (
    idHotel INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Rua VARCHAR(100) NOT NULL,
    Numero VARCHAR(100) NOT NULL,
    Complemento VARCHAR(100),
    Bairro VARCHAR(100) NOT NULL,
    Cidade VARCHAR(100) NOT NULL,
    UF VARCHAR(2) NOT NULL,
    PRIMARY KEY (idHotel)
);

CREATE TABLE TIPO_QUARTO (
    idTipo INT NOT NULL AUTO_INCREMENT,
    Valor FLOAT NOT NULL,
    Tem_TV BOOLEAN NOT NULL,
    Adaptado BOOLEAN NOT NULL,
    Numero_camas_solteiro INT NOT NULL,
    Numero_camas_casal INT NOT NULL,
    PRIMARY KEY (idTipo)
);

CREATE TABLE QUARTO (
    Numero INT NOT NULL,
    Tipo INT NOT NULL,
    Hotel INT NOT NULL,
    PRIMARY KEY (Numero),
    FOREIGN KEY (Tipo) REFERENCES TIPO_QUARTO(idTipo) ON DELETE CASCADE,
    FOREIGN KEY (Hotel) REFERENCES HOTEL(idHotel) ON DELETE CASCADE
);

CREATE TABLE CLIENTE {
  Id_cliente INT NOT NULL AUTO_INCREMENT,
  Nome VARCHAR(100) NOT NULL,
  Email VARCHAR(100),
  CPF CHAR(11),
  Documento VARCHAR(30),
  Tipo_documento VARCHAR(30),
  Orgao_exp VARCHAR(30),
  DDD_celular CHAR(3), -- CHAR has a fix length (if DDD = 33, put 033) -> necessary for pattern
  DDI_celular CHAR(4), -- CHAR has a fix length (if DDI = 55, put 0055) -> necessary for pattern
  Celular VARCHAR(10),
  DDD_telefone CHAR(3), -- CHAR has a fix length (if DDD = 33, put 033) -> necessary for pattern
  DDI_telefone CHAR(4), -- CHAR has a fix length (if DDI = 55, put 0055) -> necessary for pattern
  Telefone VARCHAR(10),
  Nascimento DATE NOT NULL,
  Sexo CHAR(1) NOT NULL,
  Profissao VARCHAR(30),
  Nacionalidade VARCHAR(50),
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
  Numero_hospedes INT,
  UH INT,
  Data_prev_chegada DATETIME,
  Data_prev_saida DATETIME,
  FNRH VARCHAR(100) NOT NULL
}

CREATE TABLE FUNCIONARIO (
    idFuncionario INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Cargo VARCHAR(100) NOT NULL,
    PRIMARY KEY (idFuncionario)
);

CREATE TABLE VAGA (
    idVaga INT NOT NULL AUTO_INCREMENT,
    Status BOOLEAN NOT NULL,
    Cliente INT,
    Hotel INT NOT NULL,
    PRIMARY KEY (idVaga),
    FOREIGN KEY (Cliente) REFERENCES CLIENTE(idCliente) ON DELETE SET NULL,
    FOREIGN KEY (Hotel) REFERENCES HOTEL(idHotel) ON DELETE CASCADE
);

CREATE TABLE CONTA_HOTEL (
    Cliente INT NOT NULL,
    Codigo INT NOT NULL,
    PRIMARY KEY (Cliente, Codigo),
    FOREIGN KEY (Cliente) REFERENCES CLIENTE(idCliente) ON DELETE CASCADE
);

CREATE TABLE CONTA_RESTAURANTE (
    Cliente INT NOT NULL,
    Codigo INT NOT NULL,
    PRIMARY KEY (Cliente, Codigo),
    FOREIGN KEY (Cliente) REFERENCES CLIENTE(idCliente) ON DELETE CASCADE
);

-- Maybe it's not necessary use Check_in and Check_out
CREATE TABLE RESERVA (
    Cliente INT NOT NULL,
    Quarto INT NOT NULL,
    Data_in DATE NOT NULL,
    Data_out DATE NOT NULL,
    Check_in BOOLEAN NOT NULL,
    Check_out BOOLEAN NOT NULL,
    PRIMARY KEY (Cliente, Quarto, Data_in),
    FOREIGN KEY (Cliente) REFERENCES CLIENTE(idCliente) ON DELETE CASCADE,
    FOREIGN KEY (Quarto) REFERENCES QUARTO(Numero) ON DELETE CASCADE
);

CREATE TABLE ARRUMACAO (
    Funcionario INT NOT NULL,
    Quarto INT NOT NULL,
    Data DATE NOT NULL,
    PRIMARY KEY(Funcionario, Quarto, Data),
    FOREIGN KEY (Funcionario) REFERENCES FUNCIONARIO(idFuncionario) ON DELETE CASCADE,
    FOREIGN KEY (Quarto) REFERENCES QUARTO(Numero) ON DELETE CASCADE
);

-- Maybe it isn't necessary to use Codigo
CREATE TABLE DESPESA (
    Cliente INT NOT NULL,
    Conta INT NOT NULL,
    Codigo INT NOT NULL,
    Data DATE NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Valor FLOAT NOT NULL,
    PRIMARY KEY(Cliente, Codigo, Conta),
    FOREIGN KEY (Cliente, Conta) REFERENCES CONTA_HOTEL(Cliente, Codigo) ON DELETE CASCADE
);

-- Maybe it isn't necessary to use Codigo
CREATE TABLE DESPESA_REFEICAO (
    Cliente INT NOT NULL,
    Conta INT NOT NULL,
    Codigo INT NOT NULL,
    Data DATE NOT NULL,
    Descricao VARCHAR(100) NOT NULL,
    Valor FLOAT NOT NULL,
    Entrege BOOLEAN NOT NULL,
    PRIMARY KEY(Cliente, Conta, Codigo),
    FOREIGN KEY (Cliente,Conta) REFERENCES CONTA_RESTAURANTE(Cliente,Codigo) ON DELETE CASCADE
);
