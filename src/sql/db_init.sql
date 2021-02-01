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

INSERT INTO org (id, org_name, email) VALUES ('TESTORG1', 'ORGNAME1', 'org1@test.ca');
INSERT INTO org (id, org_name, email) VALUES ('TESTORG2', 'ORGNAME2', 'org2@test.ca');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType) VALUES ('MENTEE1', 'FN_mentee1', 'LN_mentee1', 'DN_mentee1', 'mentee1@test.ca', 'noskills', -8, 'TESTORG1', 'mentee');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType) VALUES ('MENTEE2', 'FN_mentee2', 'LN_mentee2', 'DN_mentee2', 'mentee2@test.ca', 'noskills', -8, 'TESTORG2', 'mentee');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType) VALUES ('MENTOR1', 'FN_mentor1', 'LN_mentor1', 'DN_mentor1', 'mentor1@test.ca', 'noskills', -8, 'TESTORG1', 'mentor');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType) VALUES ('MENTOR2', 'FN_mentor2', 'LN_mentor2', 'DN_mentor2', 'mentor2@test.ca', 'noskills', -8, 'TESTORG2', 'mentor');

