CREATE TABLE Users (
	id VARCHAR(127),
	firstName VARCHAR(127),
	lastName VARCHAR(127),
	displayName VARCHAR(255),
	email VARCHAR(127),
	userType VARCHAR(7),
	PRIMARY KEY(id)
);

CREATE TABLE Mentee (
	id VARCHAR(127),
	skills VARCHAR(255),
	timezone INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE Mentor (
	id VARCHAR(127),
	admn_id VARCHAR(127),
	skills VARCHAR(255),
	timezone INT,
	PRIMARY KEY(id),
	FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE Administrator (
	id VARCHAR(127),
	org_name VARCHAR(127),
	PRIMARY KEY(id),
	FOREIGN KEY (id) REFERENCES Users(id)
);

CREATE TABLE Mentorship (
	mentor_id VARCHAR(127),
	mentee_id VARCHAR(127),
	PRIMARY KEY(mentor_id, mentee_id),
	FOREIGN KEY (mentor_id) REFERENCES Mentor(id),
	FOREIGN KEY (mentee_id) REFERENCES Mentee(id)
);