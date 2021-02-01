CREATE TABLE org (
	id VARCHAR(127),
	org_name VARCHAR(127),
	email VARCHAR(127),
	PRIMARY KEY(id)
);

CREATE TABLE users (
	id VARCHAR(127),
	firstName VARCHAR(127),
	lastName VARCHAR(127),
	displayName VARCHAR(255),
	email VARCHAR(127),
	userType VARCHAR(7),
	PRIMARY KEY(id)
);

CREATE TABLE mentor (
	id VARCHAR(127),
	org_id VARCHAR(127),
	skills VARCHAR(255),
	timezone INT,
	PRIMARY KEY(id),
	FOREIGN KEY (id) REFERENCES users(id),
	FOREIGN KEY (org_id) REFERENCES org(id)
);

CREATE TABLE mentee (
	id VARCHAR(127),
	mentor_id VARCHAR(127),
	org_id VARCHAR(127),
	skills VARCHAR(255),
	timezone INT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES users(id),
	FOREIGN KEY (mentor_id) REFERENCES mentor(id),
	FOREIGN KEY (org_id) REFERENCES org(id)
);

