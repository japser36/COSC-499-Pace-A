# Pace A API documentation

Last Updated: 2021-02-09

This document contains information relating to the use of this projects internal api

## Overview

This api enables safe querying of the database in a controlled manner.

## Content Type

All response bodies are application/json

## /init - POST

Initializes the database by executing the queries in `db_init.sql`
Does not take any parameters

## /skills - GET

Returns all the skills stored in the database.

### Response Example:

`{success:true,
rows:[{name:"Math"},{name:"Language"},{name:"Programming"},{name:"Visual Arts"},{name:"Cooking"},{name:"Management"},{name:"Physics"},{name:"Chemistry"},{name:"Biology"},{name:"Public Speaking"}]}`

## /timezones - GET

Returns all the timezones stored in the database.

### Response Example:

`{"success":true,"rows":[{"value":0,"label":"(GMT+0:00) Greenwich Mean Time","abbr":"GMT"},{"value":0,"label":"(GMT+0:00) UniversalCoordinated Time","abbr":"UTC"},{"value":1,"label":"(GMT+1:00) European Central Time","abbr":"ECT"},{"value":2,"label":"(GMT+2:00) Eastern European Time","abbr":"EET"},{"value":2,"label":"(GMT+2:00) Arabic Standard Time","abbr":"ART"},{"value":3,"label":"(GMT+3:00) Eastern African Time","abbr":"EAT"},{"value":4,"label":"(GMT+4:00) Near East Time","abbr":"NET"},{"value":5,"label":"(GMT+5:00) Pakistan Lahore Time","abbr":"PLT"},{"value":6,"label":"(GMT+6:00) Bangladesh Standard Time","abbr":"BST"},{"value":7,"label":"(GMT+7:00) Vietnam Standard Time","abbr":"VST"},{"value":8,"label":"(GMT+8:00) China Taiwan Time","abbr":"CTT"},{"value":9,"label":"(GMT+9:00) Japan Standard Time","abbr":"JST"},{"value":10,"label":"(GMT+10:00) Australia Eastern Time","abbr":"AET"},{"value":11,"label":"(GMT+11:00) Solomon Standard Time","abbr":"SST"},{"value":12,"label":"(GMT+12:00) New Zealand Standard Time","abbr":"NST"},{"value":-11,"label":"(GMT-11:00) Midway Islands Time","abbr":"MIT"},{"value":-10,"label":"(GMT-10:00) Hawaii Standard Time","abbr":"HST"},{"value":-9,"label":"(GMT-9:00) Alaska Standard Time","abbr":"AST"},{"value":-8,"label":"(GMT-8:00) Pacific Standard Time","abbr":"PST"},{"value":-7,"label":"(GMT-7:00) Phoenix Standard Time","abbr":"PNT"},{"value":-7,"label":"(GMT-7:00) Mountain Standard Time","abbr":"MST"},{"value":-6,"label":"(GMT-6:00) Central Standard Time","abbr":"CST"},{"value":-5,"label":"(GMT-5:00) Eastern Standard Time","abbr":"EST"},{"value":-5,"label":"(GMT-5:00) Indiana Eastern Standard Time","abbr":"IET"},{"value":-4,"label":"(GMT-4:00) Puerto Rico and US Virgin Islands Time","abbr":"PRT"},{"value":-3,"label":"(GMT-3:00) Argentina Standard Time","abbr":"AGT"},{"value":-3,"label":"(GMT-3:00) Brazil Eastern Time","abbr":"BET"},{"value":-1,"label":"(GMT-1:00) Central African Time","abbr":"CAT"}]}`

## /sendmail/invitementor - POST

Sends an email to the given recipient with an invitation link to sign up as a mentor.

### Parameters

org_id - String. The id of the organization sending the invite.
recipient - String. The email to which the invite will be sent.

## /sendmail/notifyofaccept - POST

Sends an email to the given mentee notifying them that they have been accepted by the given mentor.

### Parameters

mentee_id - String. The id of the accepted mentee.
mentor_id - String. The id of the mentor which has accepted the mentee.

## /sendmail/notifyofmatch - POST

Sends an email to the given mentor notifying them that they have matched with the given mentee.

### Parameters

mentee_id - String. The id of the mentee that has requested to be matched.
mentor_id - String. The id of the mentor which has been matched with the mentee.

## /metauser/[id] - GET

Returns the database entry for the metauser with the given id. A metauser is any org, mentee, or mentor.

### Parameters

id - String. The metausers id

### Response Example

`{success:true,
rows:[{"id":"MENTOR1","usertype":"mentor"}]}`

## /metauser/insert - POST

Inserts a new entry into the metauser table.

## Parameters

id - String. The id of the new metauser.
usertype - String. Either 'org', 'mentee', or 'mentor'.

## /org/[id] - GET

Returns the database entry for the organization with the given id.

### Parameters

id - String. The organization id

### Response Example

`{success:true,
rows:[{id:"TESTORG1",org_name:"ORGNAME1",email:"org1@test.ca"}]}`

## /org/getall - GET

Returns the id for every org in the database.

### Response Example

`{success:true,
rows:[{"id":"TESTORG1"},{"id":"TESTORG2"},{"id":"TESTORG3"}]}`

## /org/insert - POST

Inserts a new organization into the database. Responds with `success: true` if successful.

### Parameters

id - String. A unique organization id. Acts as primarykey in the database.
org_name - String. Organization name.
email - String. Organizations email address.

## /org/set-name - POST

Updates the name of the given org with a new value.

### Parameters

org_id - String. The id of the organization.
org_name - String. The new name to be set.

## /org/users/[id] - GET

Returns every user within an organization.

### Parameters 

id - String. The organizations id

### Response Example:

`{success:true,
rows:[{id:"MENTEE1",firstname:"FN_mentee1",lastname:"LN_mentee1",displayname:"DN_mentee1",email:"mentee1@test.ca",skills:"[{name: "javascript"}]",timezone:-8,org_id:"TESTORG1",usertype:"mentee",mentor_id:null},{id:"MENTOR1",firstname:"FN_mentor1",lastname:"LN_mentor1",displayname:"DN_mentor1",email:"mentor1@test.ca",skills:"[{name: "javascript"}]",timezone:-8,org_id:"TESTORG1",usertype:"mentor",mentor_id:null}]}`

## /org/mentees/[id] - GET

Returns every mentee within an organization.

### Parameters 

id - String. The organizations id

### Response Example:

`{success:true,
rows:[{"id":"MENTEE1","firstname":"FNmentee1","lastname":"LNmentee1","displayname":"DNmentee1","email":"mentee1@test.ca","skills":"[{\"name\":\"Management\"},{\"name\":\"Cooking\"},{\"name\":\"Public Speaking\"}]","timezone":"{\"value\":-8,\"label\":\"(GMT-8:00) Pacific Standard Time\",\"abbr\":\"PST\"}","bio":null,"org_id":"TESTORG1","usertype":"mentee","mentor_id":"MENTOR1","calendar":null},{"id":"MENTEE2","firstname":"FNmentee2","lastname":"LNmentee2","displayname":"DNmentee2","email":"mentee2@test.ca","skills":"[{\"name\":\"Programming\"},{\"name\":\"Math\"}]","timezone":"{\"value\":-8,\"label\":\"(GMT-8:00) Pacific Standard Time\",\"abbr\":\"PST\"}","bio":null,"org_id":"TESTORG1","usertype":"mentee","mentor_id":null,"calendar":null}]}`

## /org/mentors/[id] - GET

Returns every mentor within an organization.

### Parameters 

id - String. The organizations id

### Response Example:

`{success:true,
rows:[{"id":"MENTOR1","firstname":"FNmentor1","lastname":"LNmentor1","displayname":"DNmentor1","email":"mentor1@test.ca","skills":"[{\"name\":\"Programming\"},{\"name\":\"Math\"},{\"name\":\"Physics\"}]","timezone":"{\"value\":-8,\"label\":\"(GMT-8:00) Pacific Standard Time\",\"abbr\":\"PST\"}","bio":null,"org_id":"TESTORG1","usertype":"mentor","mentor_id":null,"calendar":null},{"id":"MENTOR2","firstname":"FNmentor2","lastname":"LNmentor2","displayname":"DNmentor2","email":"mentor2@test.ca","skills":"[{\"name\":\"Visual Arts\"},{\"name\":\"Math\"},{\"name\":\"Language\"}]","timezone":"{\"value\":-8,\"label\":\"(GMT-8:00) Pacific Standard Time\",\"abbr\":\"PST\"}","bio":null,"org_id":"TESTORG1","usertype":"mentor","mentor_id":null,"calendar":null}]}`

## /user/[id] - GET

Returns the database entry for the user with thegiven id.

### Parameters

id - String. The users id.

### Response Example

`{success:true,
rows:[{id:"MENTEE1",firstname:"FN_mentee1",lastname:"LN_mentee1",displayname:"DN_mentee1",email:"mentee1@test.ca",skills:"[{name: 'javacsript'}]",timezone:-8,org_id:"TESTORG1",usertype:"mentee",mentor_id:MENTOR1}]}`

## /user/insert - POST

Inserts a new user into the database. Responds with `success: true` if successful.

### Parameters

id - String. The users id. Acts as primary key in the database.
firstName - String. The users first name.
lastName - String. The users last name.
displayName - String. The users display name.
email - String. The users email address.
skills - String. A string representing an array of skills.
timezone - Integer. Numerical representation of the users timezone. Example: -8 (for PST).
org_id - String. The id of the organizationthe user is. associated with.
userType - String. Either 'mentee' or 'mentor'.

## /user/delete - POST

Deletes the given user from the database. This involves removing any reference to the user from the pendingmatches, users, and metauser tables. Also updates mentor_id to null for all users whos mentor_id was the id of the deleted user.

### Parameters

id - String. The id of the user to be deleted.

## /user/set-bio - POST

Sets a users bio.

### Parameters:

id - String. The id of the user.
bio - String. The bio to be set.

## /user/set-calendar - POST

Sets a users calendar.

### Parameters:

id - String. The id of the user.
calendar - String. A link to the users calendar.

## /user/displayname - POST

Sets a users displayname.

### Parameters:

id - String. The id of the user.
displayname - String. The displayname to be set.

## /user/set-mentor - POST

Sets a users mentor_id. For use only if the user is a mentee.

### Parameters

mentor_id - String. Value to be assigned to users mentor_id column.
mentee_id - String. Id of the user who's mentor_id column is to be updated.

## /user/set-skills - POST

Sets a users skills.

### Parameters

id - String. The users id.
skills - Skill Array. An array of Skill objects.

## /user/get-mentees/[mentor_id] - GET

Returns all the mentees with the given mentor_id.

### Parameters

mentor_id - String. A mentors id.

### Response Example

`{"success":true,"rows":[{"id":"MENTEE1","firstname":"FNmentee1","lastname":"LNmentee1","displayname":"DNmentee1","email":"mentee1@test.ca","skills":null,"timezone":"{\"value\":-8,\"label\":\"(GMT-8:00) Pacific Standard Time\",\"abbr\":\"PST\"}","org_id":"TESTORG1","usertype":"mentee","mentor_id":"MENTOR1"},{"id":"MENTEE2","firstname":"FNmentee2","lastname":"LNmentee2","displayname":"DNmentee2","email":"mentee2@test.ca","skills":null,"timezone":"{\"value\":-8,\"label\":\"(GMT-8:00) Pacific Standard Time\",\"abbr\":\"PST\"}","org_id":"TESTORG2","usertype":"mentee","mentor_id":"MENTOR1"}]}`

## /pendinginvite/[org_id] - GET

Returns all pending invites for the given organization.

### Parameters

org_id - String. An organizations id.

### Response Example

`{"success":true,
"rows":[{"id":1,"org_id":"TESTORG1","email":"mentor1@test.ca"},{"id":2,"org_id":"TESTORG1","email":"mentor2@test.ca"}]}`

## /pendinginvite/insert - POST

Inserts a new pendinginvite into the database.

### Parameters

org_id - String. The id of the organization that sent the invite.
email - String. The email of the invitee.

## /pendinginvite/delete - POST

Deletes a pendinginvite from the database.

### Parameters

org_id - String. An organizations id.
email - String. The email of the invitee.

## /pendingmatches/[mentor_id] - GET

Returns all the pending matches with the given mentor_id

### Parameters

mentor_id - String. A mentors id.

### Response Example

`{"success":true,"rows":[{"id":1,"mentee_id":"MENTEE2","mentor_id":"MENTOR1","skills":"[{\"name\":\"Programming\"},{\"name\":\"Math\"}]"},{"id":2,"mentee_id":"MENTEE3","mentor_id":"MENTOR1","skills":"[{\"name\":\"Programming\"},{\"name\":\"Physics\"}]"},{"id":3,"mentee_id":"MENTEE4","mentor_id":"MENTOR1","skills":"[{\"name\":\"Programming\"}]"}]}`

## /pendingmatches/insert - POST

Inserts a new pendingmatch into the database. Responds with `success: true` if successful.

### Parameters

mentee_id - String. A mentees id.
mentor_id - String. A mentors id.
skills - Skill Array. An array of Skill objects.These skills should be the skills which the given mentee and mentor have in common.

## /pendingmatches/delete - POST

Deletes all the pending matches accociated with the given mentee.

### Parameters

mentee_id - String. a mentees id.

## /pendingmatches/deleterow - POST

Deletes the pending match accociated with the given mentee and mentor.

### Parameters

mentee_id - String. a mentees id.
mentor_id - String. a mentors id.

