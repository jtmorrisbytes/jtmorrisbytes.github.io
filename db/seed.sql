-- Syntax: PostgreSQL
-- TODO LAST: create a table to hold metadata information for the server


-- Create a table to hold a list of projects to be displayed from github
CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(25),
    blog_post text,
    hosted_link text,
);


-- create a user table to cache needed profile information