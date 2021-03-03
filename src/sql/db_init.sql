CREATE TABLE IF NOT EXISTS org (
	id VARCHAR(127),
	org_name VARCHAR(127),
	email VARCHAR(127),
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS users (
	id VARCHAR(127),
	firstName VARCHAR(127),
	lastName VARCHAR(127),
	displayName VARCHAR(255),
	email VARCHAR(127),
	skills VARCHAR(255),
	timezone INT,
	org_id VARCHAR(127),
	userType VARCHAR(7),
	mentor_id VARCHAR(127) DEFAULT NULL,
	PRIMARY KEY(id),
	CHECK (userType = 'mentee' OR userType = 'mentor'),
	FOREIGN KEY (org_id) REFERENCES org(id),
	FOREIGN KEY (mentor_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS alluser;
CREATE TABLE IF NOT EXISTS metauser (
	id VARCHAR(127),
	userType VARCHAR(7),
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS skill;
CREATE TABLE IF NOT EXISTS skill (
	name VARCHAR(127),
	PRIMARY KEY(name)
);

DROP TABLE IF EXISTS timezone;
CREATE TABLE IF NOT EXISTS timezone (
	value INT,
	label VARCHAR(127),
	abbr VARCHAR(127),
	PRIMARY KEY(abbr)
);

INSERT INTO skill (name) VALUES ('Math');
INSERT INTO skill (name) VALUES ('Language');
INSERT INTO skill (name) VALUES ('Programming');
INSERT INTO skill (name) VALUES ('Visual Arts');
INSERT INTO skill (name) VALUES ('Cooking');
INSERT INTO skill (name) VALUES ('Management');
INSERT INTO skill (name) VALUES ('Physics');
INSERT INTO skill (name) VALUES ('Chemistry');
INSERT INTO skill (name) VALUES ('Biology');
INSERT INTO skill (name) VALUES ('Public Speaking');

INSERT INTO timezone (value, label, abbr) VALUES (0, '(GMT+0:00) Greenwich Mean Time', 'GMT');
INSERT INTO timezone (value, label, abbr) VALUES (0, '(GMT+0:00) UniversalCoordinated Time', 'UTC');
INSERT INTO timezone (value, label, abbr) VALUES (1, '(GMT+1:00) European Central Time', 'ECT');
INSERT INTO timezone (value, label, abbr) VALUES (2, '(GMT+2:00) Eastern European Time', 'EET');
INSERT INTO timezone (value, label, abbr) VALUES (2, '(GMT+2:00) Arabic Standard Time', 'ART');
INSERT INTO timezone (value, label, abbr) VALUES (3, '(GMT+3:00) Eastern African Time', 'EAT');
INSERT INTO timezone (value, label, abbr) VALUES (4, '(GMT+4:00) Near East Time', 'NET');
INSERT INTO timezone (value, label, abbr) VALUES (5, '(GMT+5:00) Pakistan Lahore Time', 'PLT');
INSERT INTO timezone (value, label, abbr) VALUES (6, '(GMT+6:00) Bangladesh Standard Time', 'BST');
INSERT INTO timezone (value, label, abbr) VALUES (7, '(GMT+7:00) Vietnam Standard Time', 'VST');
INSERT INTO timezone (value, label, abbr) VALUES (8, '(GMT+8:00) China Taiwan Time', 'CTT');
INSERT INTO timezone (value, label, abbr) VALUES (9, '(GMT+9:00) Japan Standard Time', 'JST');
INSERT INTO timezone (value, label, abbr) VALUES (10, '(GMT+10:00) Australia Eastern Time', 'AET');
INSERT INTO timezone (value, label, abbr) VALUES (11, '(GMT+11:00) Solomon Standard Time', 'SST');
INSERT INTO timezone (value, label, abbr) VALUES (12, '(GMT+12:00) New Zealand Standard Time', 'NST');
INSERT INTO timezone (value, label, abbr) VALUES (-11, '(GMT-11:00) Midway Islands Time', 'MIT');
INSERT INTO timezone (value, label, abbr) VALUES (-10, '(GMT-10:00) Hawaii Standard Time', 'HST');
INSERT INTO timezone (value, label, abbr) VALUES (-9, '(GMT-9:00) Alaska Standard Time', 'AST');
INSERT INTO timezone (value, label, abbr) VALUES (-8, '(GMT-8:00) Pacific Standard Time', 'PST');
INSERT INTO timezone (value, label, abbr) VALUES (-7, '(GMT-7:00) Phoenix Standard Time', 'PNT');
INSERT INTO timezone (value, label, abbr) VALUES (-7, '(GMT-7:00) Mountain Standard Time', 'MST');
INSERT INTO timezone (value, label, abbr) VALUES (-6, '(GMT-6:00) Central Standard Time', 'CST');
INSERT INTO timezone (value, label, abbr) VALUES (-5, '(GMT-5:00) Eastern Standard Time', 'EST');
INSERT INTO timezone (value, label, abbr) VALUES (-5, '(GMT-5:00) Indiana Eastern Standard Time', 'IET');
INSERT INTO timezone (value, label, abbr) VALUES (-4, '(GMT-4:00) Puerto Rico and US Virgin Islands Time', 'PRT');
INSERT INTO timezone (value, label, abbr) VALUES (-3, '(GMT-3:00) Argentina Standard Time', 'AGT');
INSERT INTO timezone (value, label, abbr) VALUES (-3, '(GMT-3:00) Brazil Eastern Time', 'BET');
INSERT INTO timezone (value, label, abbr) VALUES (-1, '(GMT-1:00) Central African Time', 'CAT');

INSERT INTO org (id, org_name, email) VALUES ('TESTORG1', 'ORGNAME1', 'org1@test.ca');
INSERT INTO org (id, org_name, email) VALUES ('TESTORG2', 'ORGNAME2', 'org2@test.ca');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType) VALUES ('MENTEE1', 'FNmentee1', 'LNmentee1', 'DNmentee1', 'mentee1@test.ca', 'noskills', -8, 'TESTORG1', 'mentee');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType) VALUES ('MENTEE2', 'FNmentee2', 'LNmentee2', 'DNmentee2', 'mentee2@test.ca', 'noskills', -8, 'TESTORG2', 'mentee');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType) VALUES ('MENTOR1', 'FNmentor1', 'LNmentor1', 'DNmentor1', 'mentor1@test.ca', 'noskills', -8, 'TESTORG1', 'mentor');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, userType) VALUES ('MENTOR2', 'FNmentor2', 'LNmentor2', 'DNmentor2', 'mentor2@test.ca', 'noskills', -8, 'TESTORG2', 'mentor');

