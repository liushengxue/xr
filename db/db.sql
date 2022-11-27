CREATE TABLE
    user_info(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time',
        job_number VARCHAR(255),
        name VARCHAR(255),
        sex VARCHAR(255),
        phone VARCHAR(255),
        componey_phone VARCHAR(255),
        job VARCHAR(255),
        link_man VARCHAR(255),
        link_man_phone VARCHAR(255),
        join_time VARCHAR(255),
        address VARCHAR(255),
        password VARCHAR(32),
        role VARCHAR(32),
        is_delete INT DEFAULT(0)
    ) COMMENT '';

CREATE TABLE
    product(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time' DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255),
        createBy VARCHAR(255),
        is_delete INT DEFAULT(0)
    ) COMMENT '';

CREATE TABLE
    model(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time' DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255),
        type_id INT,
        createBy VARCHAR(255),
        is_delete INT DEFAULT(0)
    ) COMMENT '';

CREATE TABLE
    brand(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time' DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255),
        type_id INT,
        createBy VARCHAR(255),
        is_delete INT DEFAULT(0)
    ) COMMENT '';

CREATE TABLE
    orders(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time' DEFAULT CURRENT_TIMESTAMP,
        name VARCHAR(255),
        createBy VARCHAR(255),
        type_id VARCHAR(255),
        model_id VARCHAR(255),
        brand_id VARCHAR(255),
        price VARCHAR(255),
        count VARCHAR(255),
        real_count VARCHAR(255),
        sent_count VARCHAR(255),
        note VARCHAR(255),
        is_delete INT DEFAULT(0),
        status VARCHAR(255),
        storage_address VARCHAR(255),
        custom_name VARCHAR(255),
        custom_phone VARCHAR(255),
        custom_address VARCHAR(255),
        pay_type VARCHAR(255),
        deposit VARCHAR(255),
        total_price VARCHAR(255),
        express_name VARCHAR(255),
        order_num VARCHAR(255),
        express_phone VARCHAR(255),
        express_address VARCHAR(255)
    ) COMMENT '';

CREATE TABLE
    storage(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time' DEFAULT CURRENT_TIMESTAMP,
        type_id VARCHAR(255),
        model_id VARCHAR(255),
        brand_id VARCHAR(255),
        count VARCHAR(255),
        config VARCHAR(255),
        note VARCHAR(255),
        storage_address VARCHAR(255),
        factory VARCHAR(255),
        createBy VARCHAR(255),
        name VARCHAR(255),
        is_delete int DEFAULT(0)
    ) COMMENT '';

CREATE TABLE
    order_num(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        create_time DATETIME COMMENT 'Create Time' DEFAULT CURRENT_TIMESTAMP,
        num VARCHAR(255),
        createBy VARCHAR(255),
        custom_name VARCHAR(255),
        is_delete INT DEFAULT(0)
    ) COMMENT '';