CREATE TABLE users (
	fb_uid VARCHAR(127),
	firstName VARCHAR(127),
	lastName VARCHAR(127),
	displayName VARCHAR(255),
	email VARCHAR(127),
	passHash VARCHAR(127),
	userType VARCHAR(7),
    verified BOOLEAN DEFAULT FALSE,
	PRIMARY KEY(fb_uid)
);

CREATE TABLE mentee (

);

CREATE TABLE mentor (

);

CREATE TABLE admin (

);