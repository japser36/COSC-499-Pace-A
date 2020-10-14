# COSC-499-Pace-A

We have created a video presentation demonstrating our project.

### Material Checklist
* Maya: X
* Jasper: X
* Daniel: X
* Shamus: X

### Recording Checklist
* Maya: X
* Jasper: X
* Daniel: X
* Shamus: X

Testing Notes:
Slide 1:
Each feature will be broken down into tasks.
Tasks will have a single purpose or function.
A coding task will therefore be for a single unit of code such as a method, class, or component.
Having single purpose tasks makes testing much easier.
Each task will be defined with a set of acceptance criteria.
Unit tests and Integration tests will be written for each task according to the acceptance criteria.
These tests should exhaust the logic of the task without depending on the internal structure of the code.
Tests will rely upon mocks to test the logic of code without reliance on external entities.
We will be utilising Jest and the React Testing Library to test our javascript code and tSQLt to test the functionality of our database.

Slide 2:
We will be using the test driven development strategy to reduce wastage of both time and code.
All of the tests for a task will be written prior to the development of the task.
This ensures that code is written only to satisfy its acceptance criteria.
Therefore, a task is considered complete when all of its tests pass.
Pull Requests to merge into the develop branch will not be accepted until the full testing suite passes.
This will be accomplished automatically via GitHub Actions and will ensure continuous integration of code that is fully regression tested.

Slide 3:
The test suite will contain all fast running unit and integration tests to save time during the daily workflow.
System tests will be administered at each milestone since they are more time consuming.
A successful round of system testing will result in a merge from the develop branch into the master branch.
This ensures that the master branch is always in a state that has been fully unit, integration, and system tested.
This means that although the master branch may not be updated with the latest changes, an acceptance test can be requested at any time.
