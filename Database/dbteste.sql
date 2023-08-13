create table if not EXISTS Employee(
id INT AUTOINCREMENT PRIMARY KEY,
firtName TEXT NOT NULL,
lastName Text Not null,
email text not null,
passwordHash text not null,
passwordSalt text not null)
