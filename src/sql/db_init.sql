DROP TABLE IF EXISTS timezone;
DROP TABLE IF EXISTS skill;
DROP TABLE IF EXISTS pendinginvite;
DROP TABLE IF EXISTS pendingmatches;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS org;
DROP TABLE IF EXISTS metauser;

CREATE TABLE metauser (
	id TEXT,
	usertype TEXT,
	PRIMARY KEY(id),
	CHECK (usertype = 'mentee' OR usertype = 'mentor' OR usertype = 'org')
);

CREATE TABLE org (
	id TEXT,
	org_name TEXT,
	email TEXT,
	PRIMARY KEY(id),
	FOREIGN KEY (id) REFERENCES metauser(id)
);

CREATE TABLE users (
	id TEXT,
	firstName TEXT,
	lastName TEXT,
	displayName TEXT,
	email TEXT,
	skills TEXT,
	timezone TEXT,
	bio TEXT,
	org_id TEXT,
	usertype TEXT,
	mentor_id TEXT DEFAULT NULL,
	calendar TEXT DEFAULT NULL,
	PRIMARY KEY(id),
	CHECK (usertype = 'mentee' OR usertype = 'mentor'),
	FOREIGN KEY (id) REFERENCES metauser(id),
	FOREIGN KEY (org_id) REFERENCES org(id),
	FOREIGN KEY (mentor_id) REFERENCES users(id)
);

CREATE TABLE pendingmatches (
	id INT GENERATED ALWAYS AS IDENTITY,
	mentee_id TEXT,
	mentor_id TEXT,
	skills TEXT,
	PRIMARY KEY(id),
	UNIQUE (mentee_id, mentor_id),
	FOREIGN KEY (mentee_id) REFERENCES users(id),
	FOREIGN KEY (mentor_id) REFERENCES users(id)
);

CREATE TABLE pendinginvite (
	id INT GENERATED ALWAYS AS IDENTITY,
	org_id TEXT,
	email TEXT,
	PRIMARY KEY(id),
	UNIQUE (org_id, email),
	FOREIGN KEY (org_id) REFERENCES org(id)
);

CREATE TABLE skill (
	name TEXT,
	PRIMARY KEY(name)
);

CREATE TABLE timezone (
	value INT,
	label TEXT,
	abbr TEXT,
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



