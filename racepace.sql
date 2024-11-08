drop table if exists users;
drop table if exists characters;

create table users(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    current_character INTEGER DEFAULT 0
);

create table characters(
    character_id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_name TEXT UNIQUE
);
insert into characters(character_name)
values('jakob');
insert into characters(character_name)
values('cole');
insert into characters(character_name)
values('Mo');
insert into characters(character_name)
values('Eliud');
insert into characters(character_name)
values('Grant');

insert into users(username,password,current_character)
values ('root','',0);