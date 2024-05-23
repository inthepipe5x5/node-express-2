
CREATE TABLE users (
    username text PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    admin boolean DEFAULT false
);
-- insert an admin as first user
INSERT INTO USERS(username, first_name, last_name, email, phone, password, admin) VALUES ('admin', 'admin', 'user', 'admin@bankly.com', '1-800-456-7890', 'true') 