CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  users_name VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE searches (
  id SERIAL PRIMARY KEY,
  search_term VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE users_searches (
  users_id INTEGER REFERENCES users (id) NOT NULL,
  searches_id INTEGER REFERENCES searches (id) NOT NULL,
  CONSTRAINT users_search_pkey PRIMARY KEY (users_id, searches_id)
);