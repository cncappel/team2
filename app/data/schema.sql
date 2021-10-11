CREATE DATABASE IF NOT EXISTS msisdb_books;
USE msisdb_books;

DROP TABLE IF EXISTS books;
CREATE TABLE books (
bookID int PRIMARY KEY AUTO_INCREMENT ,
    title varchar(55) UNIQUE NOT NULL,
author varchar(48),
    yearPublished int,
    publisher varchar(55),
    pageCount int,
    MSRP varchar(8)
);

INSERT INTO books (bookID, title, author, yearPublished, publisher, pageCount, MSRP) VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Charles Scribners Sons', 240, '$19.50'),
(2, 'Moby Dick', 'Herman Mellvelle', 1851, 'Penguin Random House', 752, '$32.99'),
(3, 'The Rose Code', 'Kate Quinn', 2021, 'Charles Scribners Sons', 240, '$19.50'),
(4, 'Caught', 'Harper Collins', 1925, 'Harper Collins', 240, '19.50'),
(5, 'War & Peace', 'Leo Tolstoy', 1875, 'Simon & Schuster', 1050, '$99.99'),
(6, 'Hamlet', 'William Shakespeare', 1601, 'Springer Nature', 98, '$10.95'),
(7, 'The Devine Comedy', 'Dante Alighieri', 1320, 'N/A', 153, '$15.99');