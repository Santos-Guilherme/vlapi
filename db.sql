Create DATABASE dbvlservice;

use dbvlservice;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    setor INT,
    cnpj VARCHAR(20) NOT NULL,
    logo VARCHAR(255),
    aparecer_home BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (setor) REFERENCES tags(id)
);

CREATE TABLE servidores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    especificacoes TEXT NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    empresa_id INT,
    historico_manutencao TEXT,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

INSERT INTO usuarios (usuario, senha) VALUES
('admin', '1234'),
('usuario', 'senha');

INSERT INTO tags (nome) VALUES
('Notícias'),
('Bebidas'),
('Educação'),
('Vestuário'),
('Cosméticos');

INSERT INTO empresas (nome, setor, cnpj, logo, aparecer_home) VALUES
('Quero Bolsa', 3, '12345678000101', 'storage\\logo\\querobolsa', TRUE),
('Coca-Cola Brasil', 2, '98765432000102', 'storage\\logo\\cocacola_brasil', TRUE),
('Ambev', 2, '24681012000103', 'storage\\logo\\ambev', TRUE),
('Exame', 1, '13579246000104', 'storage\\logo\\exame', FALSE),
('Dafiti', 4, '11223344000105', 'storage\\logo\\dafiti', TRUE),
('Natura', 5, '54321678000106', 'storage\\logo\\natura', TRUE),
('Adidas Brasil', 4, '78901234000107', 'storage\\logo\\adidas_brasil', TRUE),
('O Boticario', 5, '65432109800108', 'storage\\logo\\oboticario', TRUE);

INSERT INTO servidores (especificacoes, localizacao, status, empresa_id, historico_manutencao) VALUES
('Servidor de EAD', 'São Paulo, Brasil', 'Online', 1, 'Manutenção preventiva - 20/04/2022 15:20'),
('Servidor de gestão de inventário', 'Rio de Janeiro, Brasil', 'Offline', 2, 'Manutenção corretiva - 15/05/2022 10:30'),
('Servidor de vendas online', 'Brasília, Brasil', 'Em manutenção', 3, 'Atualização de software - 25/06/2022 08:45'),
('Servidor de marketing digital', 'Porto Alegre, Brasil', 'Desativado', NULL, NULL),
('Servidor de teste de software', 'Curitiba, Brasil', 'Online', 4, 'Manutenção preventiva - 05/07/2022 14:00'),
('Servidor de analytics', 'Belo Horizonte, Brasil', 'Desativado', NULL, NULL),
('Servidor de armazenamento de dados', 'Salvador, Brasil', 'Online', 2, 'Manutenção corretiva - 30/07/2022 11:20'),
('Servidor de vendas físicas', 'São Paulo, Brasil', 'Online', 1, 'Manutenção preventiva - 20/04/2022 15:20'),
('Servidor de logística', 'Rio de Janeiro, Brasil', 'Offline', 2, 'Manutenção corretiva - 15/05/2022 10:30'),
('Servidor de controle de qualidade', 'Curitiba, Brasil', 'Em manutenção', 3, 'Atualização de software - 25/06/2022 08:45'),
('Servidor de atendimento ao cliente', 'Brasília, Brasil', 'Desativado', NULL, NULL),
('Servidor de recursos humanos', 'Porto Alegre, Brasil', 'Online', 4, 'Manutenção preventiva - 05/07/2022 14:00'),
('Servidor de pesquisa e desenvolvimento', 'Belo Horizonte, Brasil', 'Desativado', NULL, NULL),
('Servidor de suporte técnico', 'Salvador, Brasil', 'Online', 2, 'Manutenção corretiva - 30/07/2022 11:20'),
('Servidor de segurança da informação', 'Manaus, Brasil', 'Online', 5, 'Atualização de firewall - 10/08/2022 09:15'),
('Servidor de produção', 'Recife, Brasil', 'Desativado', NULL, NULL),
('Servidor de armazenamento em nuvem', 'Fortaleza, Brasil', 'Desativado', NULL, NULL),
('Servidor de teste de performance', 'Florianópolis, Brasil', 'Online', 6, 'Manutenção preventiva - 15/09/2022 13:30');