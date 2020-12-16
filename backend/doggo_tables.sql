drop database doggo_db;
create database doggo_db;

use doggo_db;

create TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    user_name VARCHAR(30),
    password VARCHAR(15),
    age INT,
    gender VARCHAR(5),
    city VARCHAR(30),
    phone_number VARCHAR (15),
    status BOOLEAN
);

create TABLE friends_connection(
    id1 INT,
    id2 INT,

    foreign key(id1) references user(id),
    foreign key(id2) references user(id),
    PRIMARY KEY (id1, id2)
);

create TABLE dog(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    photo_url VARCHAR(150),
    dog_name VARCHAR(50),
    description VARCHAR(150),
    owner_id INT,
    foreign key(owner_id) references user(id)
);

create TABLE requests(
    sender_id INT,
    receiver_id INT,
    request VARCHAR(200),
    foreign key(sender_id) references user(id),
    foreign key(receiver_id) references user(id),
    PRIMARY KEY (sender_id, receiver_id)
);