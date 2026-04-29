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

//SAMPLE DATA
INSERT INTO services (title, description, use_cases, order_index) VALUES
(
  'Custom Web Development',
  'We build professional, responsive web applications tailored to your business needs using modern technologies.',
  'Company websites, e-commerce platforms, internal tools',
  1
),
(
  'System Development',
  'End-to-end custom software systems designed to streamline your operations and improve efficiency.',
  'Inventory systems, HR systems, billing systems',
  2
),
(
  'API Development & Integration',
  'We design and build RESTful APIs that power your applications and connect with third-party services.',
  'Mobile app backends, third-party integrations, microservices',
  3
),
(
  'Database Design & Management',
  'Proper schema design, optimization, and management of relational databases for your applications.',
  'MySQL, data migration, query optimization',
  4
);
INSERT INTO projects (title, description, technologies, outcome, order_index) VALUES
(
  'Business Management System',
  'A full-stack internal management system built for a local business to track inventory, sales, and employees.',
  'React, Node.js, Express.js, MySQL',
  'Reduced manual work by 60% and improved reporting accuracy.',
  1
),
(
  'Company Portfolio Website',
  'A responsive multi-page company website with a CMS for managing content and a contact inquiry system.',
  'React, Node.js, Express.js, MySQL',
  'Professional online presence with a fully functional admin panel.',
  2
),
(
  'RESTful API Service',
  'A scalable API backend built to serve a mobile application with authentication and data management.',
  'Node.js, Express.js, MySQL, JWT',
  'Handled 1,000+ daily requests with consistent response times.',
  3
);
INSERT INTO content (page, section, value) VALUES
('home',  'hero_title',       'Building Smart Software for Modern Businesses'),
('home',  'hero_subtitle',    'Inoverse Technologies specializes in custom systems development, web applications, and scalable backend solutions.'),
('home',  'cta_text',         'Let us build your next project'),
('about', 'company_description', 'Inoverse Technologies is a software engineering company dedicated to delivering high-quality, custom-built digital solutions for businesses of all sizes.'),
('about', 'mission',          'To empower businesses through innovative and reliable software solutions that drive growth and efficiency.'),
('about', 'vision',           'To be a leading software development partner recognized for quality, creativity, and technical excellence.'),
('about', 'core_values',      'Innovation, Quality, Integrity, Collaboration, Client Focus'),
('about', 'why_choose_us',    'We combine technical expertise with a deep understanding of business needs to deliver solutions that actually work.');
