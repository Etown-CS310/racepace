drop table if exists users;

create table users(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    current_character TEXT DEFAULT "jakob"
);

insert into users(username,password,current_character)
values ('root','','jakob');