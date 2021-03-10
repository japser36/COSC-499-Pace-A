# Pace A API documentation

Last Updated: 2021-02-09

This document contains information relating to the use of this projects internal api

## Overview

This api enables safe querying of the database in a controlled manner.

## Content Type

All response bodies are application/json

## /init - POST

Initializes the database by executing the queries in `db_init.sql`
Does not take any paramaters.

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

### Paramaters:

org_id - String. The id of the organization sending the invite.
recipient - String. The email to which the invite will be sent.

## /org/[id] - GET

Returns the database entry for the organization with the given id.

### Paramaters:

id - String. The organization id

### Response Example

`{success:true,
rows:[{id:"TESTORG1",org_name:"ORGNAME1",email:"org1@test.ca"}]}`

## /org/getall - GET

Returns the id for every org in the database.

## /org/insert - POST

Inserts a new organization into the database. Responds with `success: true` if successful.

### Paramaters:

id - String. A unique organization id. Acts as primarykey in the database.
org_name - String. Organization name.
email - String. Organizations email address.

## /org/users/[id] - GET

Returns every user within an organization

### Paramaters: 

id - String. The organizations id

### Response Example:

`{success:true,
rows:[{id:"MENTEE1",firstname:"FN_mentee1",lastname:"LN_mentee1",displayname:"DN_mentee1",email:"mentee1@test.ca",skills:"[{name: "javascript"}]",timezone:-8,org_id:"TESTORG1",usertype:"mentee",mentor_id:null},{id:"MENTOR1",firstname:"FN_mentor1",lastname:"LN_mentor1",displayname:"DN_mentor1",email:"mentor1@test.ca",skills:"[{name: "javascript"}]",timezone:-8,org_id:"TESTORG1",usertype:"mentor",mentor_id:null}]}`

## /user/[id] - GET

Returns the database entry for the user with thegiven id.

### Paramaters:

id - String. The users id.

### Response Example

`{success:true,
rows:[{id:"MENTEE1",firstname:"FN_mentee1",lastname:"LN_mentee1",displayname:"DN_mentee1",email:"mentee1@test.ca",skills:"[{name: 'javacsript'}]",timezone:-8,org_id:"TESTORG1",usertype:"mentee",mentor_id:MENTOR1}]}`

## /user/insert - POST

Inserts a new organization into the database. Responds with `success: true` if successful.

### Paramaters:

id - String. The users id. Acts as primary key in the database.
firstName - String. The users first name.
lastName - String. The users last name.
displayName - String. The users display name.
email - String. The users email address.
skills - String. A string representing an array of skills.
timezone - Integer. Numerical representation of the users timezone. Example: -8 (for PST).
org_id - String. The id of the organizationthe user is. associated with.
userType - String. Either 'mentee' or 'mentor'.

## /user/set-mentor - POST

Sets a users mentor_id. For use only if the user is a mentee.

### Paramaters:

mentor_id - String. Value to be assigned to users mentor_id column.
mentee_id - String. Id of the user who's mentor_id column is to be updated.

## /user/set-skills - POST

Sets a users skills.

### Paramaters:

id - String. The users id.
skills - Skill Array. An array of Skill objects.

### Request Body Example

{id: 'MENTEE1',
skills: [{name: 'Math'},{name: 'Programming'}]}

## /user/get-mentees/[mentor_id] - GET

Returns all the mentees with the given mentor_id.

### Paramaters:

mentor_id - String. A mentors id.

### Response Example

`{"success":true,"rows":[{"id":"MENTEE1","firstname":"FNmentee1","lastname":"LNmentee1","displayname":"DNmentee1","email":"mentee1@test.ca","skills":null,"timezone":"{\"value\":-8,\"label\":\"(GMT-8:00) Pacific Standard Time\",\"abbr\":\"PST\"}","org_id":"TESTORG1","usertype":"mentee","mentor_id":"MENTOR1"},{"id":"MENTEE2","firstname":"FNmentee2","lastname":"LNmentee2","displayname":"DNmentee2","email":"mentee2@test.ca","skills":null,"timezone":"{\"value\":-8,\"label\":\"(GMT-8:00) Pacific Standard Time\",\"abbr\":\"PST\"}","org_id":"TESTORG2","usertype":"mentee","mentor_id":"MENTOR1"}]}`

## /pendingmatches/[mentor_id] - GET

Returns all the pending matches with the given mentor_id

### Paramaters:

mentor_id - String. A mentors id.

### Response Example

`{"success":true,"rows":[{"id":1,"mentee_id":"MENTEE2","mentor_id":"MENTOR1","skills":"[{\"name\":\"Programming\"},{\"name\":\"Math\"}]"},{"id":2,"mentee_id":"MENTEE3","mentor_id":"MENTOR1","skills":"[{\"name\":\"Programming\"},{\"name\":\"Physics\"}]"},{"id":3,"mentee_id":"MENTEE4","mentor_id":"MENTOR1","skills":"[{\"name\":\"Programming\"}]"}]}`

## /pendingmatches/delete - POST

deletes all the pending matches accociated with the given mentee.

### Paramaters:

mentee_id - String. a mentees id.

## /pendingmatches/deleterow - POST

deletes the pending match accociated with the given mentee and mentor.

### Paramaters:

mentee_id - String. a mentees id.
mentor_id - String. a mentors id.

