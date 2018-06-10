CREATE TABLE newUsers (
    email VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (email) VALUES
("james34@yahoo.com"), ('kendall@gmail.com');