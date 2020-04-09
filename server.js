var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
];

// GET /api/todos
app.get("/api/todos", function (req, res, next) {
    res.send(todoList);
})
/* let listID = 1; */
// GET /api/todos/:id
app.get("/api/todos/:id", function (req, res, next) {
    let id = parseInt(req.params.id); //req.params.id will be a string, parseInt turns it into an integer
    let foundID = todoList.find (function (item) {
       return item.id === id;
    })
     res.send(foundID);
})
// POST /api/todos
app.post("/api/todos", function (req, res, next) {
   let nextID = todoList.reduce((acc,curr) => {
       if(curr.id > acc){
           return curr.id
       }
       return acc++
   }, 0) + 1  //this reduce function is written to return the highest number ID, and then adds one to that here
   
    let toDoObj = {
        id: nextID,
        todo: req.body.todo
    }
    todoList.push(toDoObj)

    res.send(toDoObj)
    /* req.body;  //this will hold the string value of what is being added to the todo list
   let toDoObj.id = todoList.length + 1; //this is bad */
    
    
    /* let newTodo = {}; partially correct, can go ahead and fill in the below values as seen above
    newTodo["id"] = req.body.id; wrong, we aren't given this info.  We genrate it using the reduce method above
    newTodo["todo"] = req.body.todo; correct, this is the only info the user "enters"
    todoList.push(newTodo); correct!
    res.send("Todo item added!") */
})
// PUT /api/todos/:id
app.put("/api/todos/:id", function (req, res, next) {
    let id = parseInt(req.params.id); 
    let foundID = todoList.find (function (item) {
        return item.id === id;
     });
     foundID.todo = req.body.todo;
     res.send(foundID);
})


// DELETE /api/todos/:id
app.delete("/api/todos/:id", function (req, res, next) {
    let id = parseInt(req.params.id); 
    let removedItem;
    let foundID = todoList.find (function (item) {
        return item.id === id;
     });
      for (let i = 0; i <todoList.length; i++) {
         if (
             todoList[i] === foundID) {
                removedItem = todoList.splice(i, 1);
             }
     }
     /* let removedItem = todoList.splice(foundID, 1); this grabs the wrong item, since the ID doesn't necessarily match the index number */
      res.send(removedItem);
})

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})