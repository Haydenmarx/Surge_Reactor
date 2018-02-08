DROP DATABASE IF EXISTS surge_reactor_riders;

CREATE DATABASE surge_reactor_riders;

\c surge_reactor_riders;

CREATE TABLE users (
  id SERIAL,
  username VARCHAR,
  start_longitude INT,
  start_latitude INT,
  destination_longitude INT,
  destination_latitude INT,
  one BOOLEAN,
  two BOOLEAN,
  three BOOLEAN,
  four BOOLEAN,
  five BOOLEAN,
  six BOOLEAN,
  seven BOOLEAN,
  eight BOOLEAN,
  nine BOOLEAN,
  ten BOOLEAN,
  eleven BOOLEAN,
  twelve BOOLEAN,
  thirteen BOOLEAN,
  fourteen BOOLEAN,
  fifteen BOOLEAN,
  sixteen BOOLEAN,
  seventeen BOOLEAN,
  eighteen BOOLEAN,
  nineteen BOOLEAN,
  twenty BOOLEAN,
  twentyone BOOLEAN,
  twentytwo BOOLEAN,
  twentythree BOOLEAN,
  twentyfour BOOLEAN,
  patience INT,
  PRIMARY KEY (id) 
);