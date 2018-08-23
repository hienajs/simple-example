-- Limpa sessoes nesse banco de dados
SELECT pg_terminate_backend(pg_stat_activity.pid)
  FROM pg_stat_activity
 WHERE pg_stat_activity.datname = 'todo'
   AND pid <> pg_backend_pid();

-- Exclui banco de dados se existe
DROP DATABASE IF EXISTS todo;

-- Cria o banco de dados
CREATE DATABASE todo;

-- Create Usuário
CREATE USER example WITH ENCRYPTED PASSWORD 'example';

-- Atribui previlégio ao banco de dados
GRANT ALL PRIVILEGES ON DATABASE todo TO example;
