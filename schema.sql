Create database inoverse_db;
use inoverse_db;
create table users (
	id int auto_increment primary key,
    name varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(255) not null,
    role enum('admin') not null default 'admin',
    created_at timestamp default current_timestamp
    );
create table services (
	id int auto_increment primary key,
    title varchar(250) not null, 
    description text not null,
    use_cases text null, 
    icon varchar(100) null,
    order_index	int default 0,
    is_active boolean default true,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);
create table projects (
	id int auto_increment primary key,
    title varchar(150) not null,
    description text not null,
    technologies varchar(250) null,
    outcome text null,
    image_url varchar(255) null,
    project_url varchar(255) null,
    order_index int default 0,
    is_active boolean default true,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);
create table messages (
	id int auto_increment primary key,
    name varchar(255) not null,
    email varchar(100) not null,
    message text not null,
    is_read boolean default false,
    created_at timestamp default current_timestamp
);
create table content (
	id int auto_increment primary key,
    page varchar(50) not null, 
    section varchar(50) not null,
    value text not null, 
    updated_at timestamp default current_timestamp on update current_timestamp,
    unique key unique_page_section (page, section)
);
show tables;
describe services;
select * from services;