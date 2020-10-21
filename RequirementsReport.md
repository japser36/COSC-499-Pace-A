## 2. Overview of your system architecture


### 2.1 Tech Stack

The client didn’t have many specific tech requirement constraints, other than that this was a web based application that needed some embeddable functionality. The application called for a front-end to provide the contents of the web portal, and a back-end to communicate and interface securely with a database. Below is a list of options we considered, with some pros and cons of each.


#### 2.1.1 Front End

**PHP:** PHP rendered HTML running on a linux/apache web server environment



*   <span style="text-decoration:underline;">Pros:	</span>Lightning fast, great control over HTML content
*   <span style="text-decoration:underline;">Cons:</span>	Difficult to set up complex systems, team has less experience

**Python:** Python web server



*   <span style="text-decoration:underline;">Pros:</span>	Fast, powerful, easy DB integration, group is experienced in python
*   <span style="text-decoration:underline;">Cons:</span>	Group is not experienced in python web development, lots of research required

**NodeJS/ReactJS:** A Node JS server running a ReactJS web client



*   <span style="text-decoration:underline;">Pros:</span>	Flexible, rapid development via NPM modules
*   <span style="text-decoration:underline;">Cons:</span>	JS dependent - browsers must enable JS, node modules require updates


#### 2.1.2 Back End

**PHP:** A web PHP server would communicate to itself via ajax and form submission in the client



*   <span style="text-decoration:underline;">Pros:</span>	Easy to connect front end to back end, very fast
*   <span style="text-decoration:underline;">Cons:</span>	Difficult to set up securely, harder to manage complex systems

**NodeJS/Express:** A NodeJS server running an express HTTP server for HTTP endpoints



*   <span style="text-decoration:underline;">Pros:</span>	Fast development with node modules, well documented
*   <span style="text-decoration:underline;">Cons:</span>	Node modules require updates


#### 2.1.3 Database

**Non-relational DB:** Google’s Firebase Firestore is an example of a non-relational database



*   <span style="text-decoration:underline;">Pros:</span>	Easy to integrate via APIs, fast, easy usage, hosted, fast setup
*   <span style="text-decoration:underline;">Cons:</span>	Non-relational (no SQL available), not free, not hosted in-house (google hosted)

**Relational DB:** MySQL, PostgreSQL, other relational databases



*   <span style="text-decoration:underline;">Pros:</span>	Powerful SQL for complex systems, hostable in-house on a secure server
*   <span style="text-decoration:underline;">Cons:</span>	More difficult to set up than non-relational DB


#### 2.1.4 Summary

The chosen stack for this project’s framework was a NodeJS/ReactJS front end, with a NodeJS/Express backend, using a relational DB. The primary reasoning for this was to support rapid development to allow for fast client feedback, and ease of development since both the front and back ends would be coded in a similar JS environment. A relational database was chosen to allow for more robust control over the complex data structures that were anticipated being in a time-scheduling application. The specific database that was chosen was PostgreSQL, since it has lots of features and is easily integrated into a Node based environment via the `pg` package.


### 2.2 Data Flow Diagrams


#### 2.2.1 Level 0 DFD



![alt_text](images/L0DFD.png "Level 0 Data-Flow Diagram")


_Fig. 1 - The level 0 data flow diagram models how the different user groups interact with the system._


#### 2.2.2 Level 1 DFD



![alt_text](images/L1DFD.png "Level 1 Data-Flow Diagram")


_Fig. 2 - The level 1 data flow diagram models how the different user groups interact with the system, and how the system internally communicates data._

## Definitions
#### Task
A unitary step in the process to completing a feature.  
#### Unit
A piece of code which performs a single purpose or function.
#### Developer
The person responsible for completing a task.
#### Acceptance Criteria
High level list of criteria which a feature or task must satisfy in order to be accepted into the develop branch.
#### Validation Technique
The tool and type of test which is appropriate for satisfying the acceptance criteria.
#### Acceptable Coverage
The minimum code coverage which our testing should achieve. This is up to our discretion and should loosely be considered as 80-90%.
#### Test Suite
The set of all fast running unit and integration tests. The test suite is updated with the tests for each task as the task is completed.
#### Manual Review
A manual check to determine that a pull request satisfies the acceptance criteria of the task it claims to complete.
#### Reason for Rejection
The rational of a reviewer for rejecting a pull request. A reason for rejection should include a suggestion for improvement or else the reviewer should contact the requester to discuss the issue.
#### Mock
A mock is a replica of an object that simulates the behaviour of that object. Mocks are used for testing to allow code to be tested without reliance on external systems.

## Tools
#### [Jest](https://jestjs.io/docs/en/getting-started)
Jest is a feature rich JavaScript testing framework which focuses on simplicity and efficiency. Jest will act as our main testing framework since it allows for easy mocking and provides rich context when tests fail. Jest is also very well documented making it easy for the team to learn it quickly. Jest makes regression testing React components fast and easy with snapshot testing. This way UI components can be tested automatically during the continuous integration process without wasting time building the app. Jest’s ability to work with webpack also makes it useful for our project.
#### [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
The React Testing Library provides greater confidence when testing React components and makes code more maintainable. The library allows tests to work with the actual DOM nodes in the same way as the user. This allows for testing that is closer to the intended user experience. By combining the React Testing Library with Jest we will be able to test our frontend with confidence.
#### [tSQLt](https://tsqlt.org/)
tSQLt is an SQL unit testing framework which we will be using to test our database. tSQLt automatically runs tests within transactions to reduce cleanup and provides mocking tools to allow for isolated testing. The framework can be integrated into our continuous integration workflow since output can be generated in both plain text and XML.
#### [ESLint](https://eslint.org/docs/user-guide/getting-started)
ESLint is a JavaScript linting tool which can easily be integrated into our continuous integration pipeline. This tool will be used to ensure that all of our code follows the same standards and style guidelines.
#### [GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions)
GitHub Actions will be used to automate the continuous integration process. This will be used to run regression testing and linting whenever code changes are suggested (whenever a pull request is created).

## Testing strategy
1.	[All features are reduced to tasks.](#1-all-features-are-reduced-to-tasks)
2.	[Tasks are defined with a set of acceptance criteria and a validation technique.](#2-tasks-are-defined-with-a-set-of-acceptance-criteria-and-a-validation-technique)
3.	[The developer converts each of the acceptance criteria into tests according to the validation technique.](#3-the-developer-converts-each-of-the-acceptance-criteria-into-tests-according-to-the-validation-technique)
4.	[Code is written for the task until each of the tests pass with acceptable coverage.](#4-code-is-written-for-the-task-until-each-of-the-tests-pass-with-acceptable-coverage)
5.	[Once each test passes both the code and its tests are pushed to the origin.](#5-once-each-test-passes-both-the-code-and-its-tests-are-pushed-to-the-origin)
6.	[The developer creates a pull request to merge into the develop branch, causing the full test suite to be run, including regression testing.](#6-the-developer-creates-a-pull-request-to-merge-into-the-develop-branch-causing-the-full-test-suite-to-be-run-including-regression-testing)
7.	[If there is a failure, the developer is responsible for troubleshooting.](#7-if-there-is-a-failure-the-developer-is-responsible-for-troubleshooting)
8.	[Once the test suite passes another member of the team will conduct a manual review.](#8-once-the-test-suite-passes-another-member-of-the-team-will-conduct-a-manual-review)
9.	[If the reviewer rejects the pull request, they will provide a reason for rejection.](#9-if-the-reviewer-rejects-the-pull-request-they-will-provide-a-reason-for-rejection)
10.	[If the reviewer approves the pull request, they will merge it into the develop branch.](#10-if-the-reviewer-approves-the-pull-request-they-will-merge-it-into-the-develop-branch)
11.	[Before each milestone, or at the request of the client, A full system test will be conducted on the develop branch.](#11-before-each-milestone-or-at-the-request-of-the-client-a-full-system-test-will-be-conducted-on-the-develop-branch)
12.	[If there is a failure in the system testing a task will be created to address it.](#12-if-there-is-a-failure-in-the-system-testing-a-task-will-be-created-to-address-it)
13.	[Successful system testing will result in a merge from the develop branch into the master branch.](#13-successful-system-testing-will-result-in-a-merge-from-the-develop-branch-into-the-master-branch)
14.	[Acceptance testing can be performed on the master branch at any time.](#14-acceptance-testing-can-be-performed-on-the-master-branch-at-any-time)

## Each Step in Detail
#### 1. All features are reduced to tasks.
Reduction of a feature into tasks can be done by any member of the team. However, The QA lead must review each task to determine that the completion of all of the tasks will satisfy the acceptance criteria of the feature.
#### 2. Tasks are defined with a set of acceptance criteria and a validation technique.
Acceptance criteria must be reviewed by the QA lead to determine whether they are a true representation of the task’s completion. The tool described in the validation technique is based on the language in which the code for the task will be written. The type of test required (unit or integration) will be obvious based on the nature of the task. The validation technique should also be reviewed by the QA lead.
#### 3. The developer converts each of the acceptance criteria into tests according to the validation technique.
This is done before code is written for the task according to the test-driven development process. Only the external functionality of the code should be tested. In other words, tests should only be concerned with inputs and outputs and not with the internal workings of the code. This results in tests that are not broken by refactoring. Tests should make use of mocks to ensure that code is tested in isolation from external inputs. This means that code which relies on systems that have not yet been developed can be tested.
#### 4. Code is written for the task until each of the tests pass with acceptable coverage.
This is a continuation of the test-driven development process. Coverage testing helps to ensure that each potential output is reachable by some input. High coverage is not sufficient to show that each logical path is being tested. If the acceptance criteria are robust and the conversion of acceptance criteria into tests is done properly then the logic of the task should be fully exhausted. It is the responsibility of the developer to determine whether they have done a proper conversion of the acceptance criteria into tests.
#### 5. Once each test passes both the code and its tests are pushed to the origin.
Tests should be determined to pass manually on the developer’s local machine before pushing to origin.
#### 6. The developer creates a pull request to merge into the develop branch, causing the full test suite to be run, including regression testing.
This process allows changes to be continuously integrated into the code base without disrupting the workflow or breaking parts of the system that had previously been working.
#### 7. If there is a failure, the developer is responsible for troubleshooting.
This may involve communication with other team members to discuss the problem and potential solutions. Manual testing may be necessary to help the developer better understand the problem.
#### 8. Once the test suite passes another member of the team will conduct a manual review.
This involves studying the code to ensure that it does what the developer claims it does. The reviewer should also study the test cases that the developer has written to ensure that the acceptance criteria are being met.
#### 9. If the reviewer rejects the pull request, they will provide a reason for rejection.
The reviewer should not reject the pull request without making the reason for rejection clear. This may include contacting the requester to discuss the issue and provide suggestions for improvement.
#### 10. If the reviewer approves the pull request, they will merge it into the develop branch.
With each of the previous steps being followed the develop branch should continuously be in a working state that is ready for system testing.
#### 11. Before each milestone, or at the request of the client, A full system test will be conducted on the develop branch.
System testing will be a manual process which includes performing a full build of the system. This will mostly involve functional testing and usability testing. However, load testing and security testing may be done depending on what the software is intended to accomplish at the relevant milestone.
#### 12. If there is a failure in the system testing a task will be created to address it.
Failures in system testing should be discussed by the group to determine potential fixes. Tasks created to fix problems found in system testing should be given priority to ensure the product can be delivered by the milestone deadline.
#### 13. Successful system testing will result in a merge from the develop branch into the master branch.
With each of the previous steps being followed the master branch should always be in a state that has been fully unit, integration, and system tested.
#### 14. Acceptance testing can be performed on the master branch at any time.
The client will always have access to a version of the software that they can test and provide feedback on via the master branch. The client can also request that the master branch be updated with the latest changes which will require a round of system testing (see step 11).
