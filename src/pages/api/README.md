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

Unlike the other endpoints, this endpoint creates a connection to the 'Emsi Skills API' (https://api.emsidata.com/apis/skills). Response is length limited to 1000.

### Paramaters:

filter - String. used to filter the results returned from Emsi's 'list all skills' endpoint

### Response Example:

`[{name:"Ruby (Programming Language)"},
{name:"Ruby On Rails"},
{name:"RubyGems"},
{name:"RubyMine"},
{name:"Ruby Version Management"},
{name:"RubyCocoa"},
{name:"Rubylith"},
{name:"Ramaze (Free Software Programmed In Ruby)"}]`

## /org/[id] - GET

Returns the database entry for the organization with the given id.

### Paramaters:

id - String. the organization id

### Response Example

`{success:true,
rows:[{id:"TESTORG1",org_name:"ORGNAME1",email:"org1@test.ca"}]}`

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
