CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstNname  VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
)

CREATE TABLE searches (
  id SERIAL PRIMARY KEY,
  searchTerm VARCHAR(255) NOT NULL
)

CREATE TABLE user_searches (
  user_id int NOT NULL,
  search_id int NOT NULL,
  CONSTRAINT PK_user_searches PRIMARY KEY
    (
      user_id,
      search_id
    ),
  FOREIGN KEY (user_id) REFERENCES users(id)
  FOREIGN KEY (search) REFERENCES searches(id)
)