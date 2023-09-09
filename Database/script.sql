SELECT case when count(*) > 0 then 'true' else 'false' end as 'resultado' FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = 'dbsenai';

select * from databasemysql.roles;

drop database databasemysql;

create table if not exists employees(
id int primary key auto_increment not null,
firstName varchar(50) not null,
lastName varchar(50) not null,
email varchar(60) not null
);
create table if not exists employees(id int primary key auto_increment not null,firstName varchar(50) not null,lastName varchar(50) not null,email varchar(60) not null);
create table if not exists typesRoles(
id int primary key auto_increment not null,
typeName varchar(50) not null
);
create table if not exists typesRoles(id int primary key auto_increment not null,typeName varchar(50) not null);

create table if not exists roles(
id int primary key auto_increment not null,
roleName varchar(50) not null,
typeid int not null,
foreign key(typeid) references databasemysql.typesRoles(id) on update cascade on delete cascade
);
create table if not exists roles(id int primary key auto_increment not null,roleName varchar(50) not null,typeid int not null,foreign key(typeid) references databasemysql.typesRoles(id) on update cascade on delete cascade);
drop database base;
drop database databasemysql;
create table if not exists users(
id int primary key auto_increment not null,
employeeid int not null,
passwordHash varchar(255) not null,
passwordSalt varchar(70) not null,
foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade
);
create table if not exists users(id int primary key auto_increment not null,employeeid int not null,passwordHash varchar(255) not null,passwordSalt varchar(70) not null,foreign key(employeeid) references databasemysql.employee(id) on update cascade on delete cascade);

create table if not exists employeeRoles(
id int primary key auto_increment not null,
employeeid int not null,
roleid int not null,
foreign key(employeeid) references databasemysql.employees(id) on update cascade on delete cascade,
foreign key(roleid) references databasemysql.roles(id) on update cascade on delete cascade
);
create table if not exists employeeRoles(id int primary key auto_increment not null,employeeid int not null,roleid int not null,foreign key(employeeid) references databasemysql.employee(id) on update cascade on delete cascade,foreign key(roleid) references databasemysql.roles(id) on update cascade on delete cascade);


select * from databasemysql.typesroles;
select * from databasemysql.roles;
select * from databasemysql.employees;
select * from databasemysql.employeeroles;
select * from databasemysql.users;

select case when count(*) > 0 then "True" else "False" end as resultado from databasemysql.employees where lastName = "Adiministrador"; 

