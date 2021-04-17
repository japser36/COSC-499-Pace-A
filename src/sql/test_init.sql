-- Loads data into the database for testing purposes.

INSERT INTO metauser (id, usertype) VALUES ('TESTORG1', 'org');
INSERT INTO metauser (id, usertype) VALUES ('TESTORG2', 'org');
INSERT INTO metauser (id, usertype) VALUES ('MENTOR1', 'mentor');
INSERT INTO metauser (id, usertype) VALUES ('MENTOR2', 'mentor');
INSERT INTO metauser (id, usertype) VALUES ('MENTOR3', 'mentor');
INSERT INTO metauser (id, usertype) VALUES ('MENTOR4', 'mentor');
INSERT INTO metauser (id, usertype) VALUES ('MENTEE1', 'mentee');
INSERT INTO metauser (id, usertype) VALUES ('MENTEE2', 'mentee');
INSERT INTO metauser (id, usertype) VALUES ('MENTEE3', 'mentee');
INSERT INTO metauser (id, usertype) VALUES ('MENTEE4', 'mentee');
INSERT INTO org (id, org_name, email) VALUES ('TESTORG1', 'ORGNAME1', 'org1@test.ca');
INSERT INTO org (id, org_name, email) VALUES ('TESTORG2', 'ORGNAME2', 'org2@test.ca');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, usertype) VALUES ('MENTOR1', 'FNmentor1', 'LNmentor1', 'DNmentor1', 'mentor1@test.ca', '[{"name":"Programming"},{"name":"Math"},{"name":"Physics"}]', '{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"}', 'TESTORG1', 'mentor');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, usertype) VALUES ('MENTOR2', 'FNmentor2', 'LNmentor2', 'DNmentor2', 'mentor2@test.ca', '[{"name":"Visual Arts"},{"name":"Math"},{"name":"Language"}]', '{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"}', 'TESTORG1', 'mentor');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, usertype) VALUES ('MENTOR3', 'FNmentor3', 'LNmentor3', 'DNmentor3', 'mentor3@test.ca', '[{"name":"Chemistry"},{"name":"Biology"},{"name":"Physics"}]', '{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"}', 'TESTORG2', 'mentor');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, usertype) VALUES ('MENTOR4', 'FNmentor4', 'LNmentor4', 'DNmentor4', 'mentor4@test.ca', '[{"name":"Public Speaking"},{"name":"Chemistry"}]', '{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"}', 'TESTORG2', 'mentor');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, usertype, mentor_id) VALUES ('MENTEE1', 'FNmentee1', 'LNmentee1', 'DNmentee1', 'mentee1@test.ca', '[{"name":"Management"},{"name":"Cooking"},{"name":"Public Speaking"}]', '{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"}', 'TESTORG1', 'mentee', 'MENTOR1');
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, usertype, mentor_id) VALUES ('MENTEE2', 'FNmentee2', 'LNmentee2', 'DNmentee2', 'mentee2@test.ca', '[{"name":"Programming"},{"name":"Math"}]', '{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"}', 'TESTORG1', 'mentee', null);
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, usertype, mentor_id) VALUES ('MENTEE3', 'FNmentee3', 'LNmentee3', 'DNmentee3', 'mentee3@test.ca', '[{"name":"Programming"},{"name":"Physics"}]', '{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"}', 'TESTORG2', 'mentee', null);
INSERT INTO users (id, firstName, lastName, displayName, email, skills, timezone, org_id, usertype, mentor_id) VALUES ('MENTEE4', 'FNmentee4', 'LNmentee4', 'DNmentee4', 'mentee4@test.ca', '[{"name":"Programming"},{"name":"Cooking"},{"name":"Language"}]', '{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"}', 'TESTORG2', 'mentee', null);
INSERT INTO pendingmatches (mentee_id, mentor_id, skills) VALUES ('MENTEE2', 'MENTOR1', '[{"name":"Programming"},{"name":"Math"}]');
INSERT INTO pendingmatches (mentee_id, mentor_id, skills) VALUES ('MENTEE3', 'MENTOR1', '[{"name":"Programming"},{"name":"Physics"}]');
INSERT INTO pendingmatches (mentee_id, mentor_id, skills) VALUES ('MENTEE4', 'MENTOR1', '[{"name":"Programming"}]');
