CREATE TABLE users (
	fb_uid VARCHAR(127),
	firstName VARCHAR(127),
	lastName VARCHAR(127),
	displayName VARCHAR(255),
	email VARCHAR(127),
	passHash VARCHAR(127),
	userType VARCHAR(7),
	PRIMARY KEY(fb_uid)
);

CREATE TABLE mentee (
	fb_uid VARCHAR(127),
	mentor_id VARCHAR(127),
	skills VARCHAR(255)
	PRIMARY KEY(fb_uid)
);

CREATE TABLE mentor (
	fb_uid VARCHAR(127),
	adm_id VARCHAR(127),
	skills VARCHAR(255)
	PRIMARY KEY(fb_uid)
);

CREATE TABLE org_admin (
	fb_uid VARCHAR(127),
	org_id VARCHAR(127),
	PRIMARY KEY(fb_uid)
);

CREATE TABLE organization (
	org_id VARCHAR(127),
	org_name VARCHAR(127),
	adm_id VARCHAR(127),
	PRIMARY KEY(org_id)
);