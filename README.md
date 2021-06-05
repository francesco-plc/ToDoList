# BigLab 2 - Class: 2021 WA1

## Team name: TEAM_NAME

Team members:
* s281697 ERNESTO CRISTIAN
* s281705 POLICASTRO FRANCESCO
* s267601 PAGANINI GIOVANNI
* s288903 ANSARI NEJAD EHSAN

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once cloned this repository, instead, write your names in the above section.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## List of APIs offered by the server


### **_Load Tasks_**
URL:` /api/tasks` + [`/important, /seven, /today, /private`]

Method: GET

Description: Load the list of the tasks according to the filter set (by default the filter is set to 'All')

Request body: None

Response: `200 OK` (success) or` 500 Internal Server Error` (generic error).

Response body: An array of objects, each describing a task.
```
[{
    "id": "1",
    "description": " Go to the market ",
    "important": 0,
    "private": 0,
    "deadline": 2021-05-14T10:45:00.000Z,
    "completed": 0,
}, {
    "id": "2",
    "description": " Go for a walk ",
    "important": 1,
    "private": 1,
    "deadline": 2021-04-14T06:30:00.000Z,
    "completed": 1,
},
...
]
```

### **_Add a new Task_**
URL: `/api/tasks`

Method: POST

Description: Add a new task to the list of the user's tasks.

Request body: An object representing a task (Content-Type: application/json).
When a new task is added its "completed" property is by default set to 0 therefore it is not passed in the request body.

```
{
    "description": " Go for a walk ",
    "important": 1,
    "private": 1,
    "deadline": 2021-04-14T06:30:00.000Z,
}
```

Response: `201 Created` (success) or `503 Service Unavailable`. 

Response body: None

### **_Delete a Task_**
URL: `/api/tasks/<id>`

Method: DELETE

Description: Delete an existing task, identified by its id.

Request body: None

Response: `204 No Content` (success) or `503 Service Unavailable` (generic error).

Response body: None

### **_Update a Taks_**
URL: `/api/tasks/update/<id>`

Method: PUT

Description: Update all the chosen fields of an existing task, identified by its id.

Request body: An object representing a task (Content-Type: application/json).

```
{
    "description": " Go for a walk ",
    "important": 1,
    "private": 1,
    "deadline": 2021-04-14T06:30:00.000Z,
    "completed": 1,
}
```

Response: 201 Created (success) or 503 Service Unavailable. 

Response body: None