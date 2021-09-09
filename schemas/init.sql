CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
);
