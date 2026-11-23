DROP TABLE IF EXISTS jogos;

CREATE TABLE jogos (
    id INTEGER PRIMARY KEY,
    titulo TEXT NOT NULL,
    genero TEXT NOT NULL,
    ano INTEGER,
    nota REAL,
    jogadores INTEGER
);

INSERT INTO jogos (titulo, genero, ano, nota, jogadores) VALUES
('Minecraft', 'Sandbox', 2011, 9.2, 18),
('Terraria', 'Sandbox', 2011, 8.1, 6),
('Hollow Knight', 'Plataforma', 2017, 9.0, 4),
('Celeste', 'Plataforma', 2018, 8.7, 3),
('Cuphead', 'Plataforma', 2017, 7.9, 7),
('Fortnite', 'Tiro', 2017, 7.5, 15),
('Valorant', 'Tiro', 2020, 8.3, 9),
('Free Fire', 'Tiro', 2017, 6.4, 14),
('Rocket League', 'Esporte', 2015, 8.0, 8),
('EA Sports FC 24', 'Esporte', 2023, 6.8, 16),
('Mario Kart 8 Deluxe', 'Corrida', 2017, 9.1, 10),
('Forza Horizon 5', 'Corrida', 2021, 8.6, 5),
('Street Fighter 6', 'Luta', 2023, 7.7, 4),
('Mortal Kombat 1', 'Luta', 2023, 7.2, 6),
('Undertale', 'RPG', 2015, 9.4, 5),
('Hades', 'RPG', 2020, NULL, 2),
('Tetris', 'Puzzle', 1984, 8.2, 12),
('Portal 2', 'Puzzle', 2011, 9.3, 3),
('Zelda: Breath of the Wild', 'Aventura', 2017, 9.6, 6),
('Outlast', 'Terror', 2013, 7.0, 2);
