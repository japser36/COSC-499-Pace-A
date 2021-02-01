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
	skills VARCHAR(127),
	timezone INT,
	org_id VARCHAR(127),
	userType VARCHAR(7),
	mentor_id VARCHAR(127) DEFAULT NULL,
	PRIMARY KEY(id),
	CHECK (userType = 'mentee' OR userType = 'mentor'),
	FOREIGN KEY (org_id) REFERENCES org(id),
	FOREIGN KEY (mentor_id) REFERENCES users(id)
);

