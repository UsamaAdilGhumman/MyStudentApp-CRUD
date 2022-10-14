const express = require('express')
var bodyParser = require('body-parser')
const Student = require('./student')
const cors = require('cors')

const app = express()
const port = process.env.port | 5000

let counter = 0;
/// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(cors())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.post('/api',(req,res)=>{
    counter = counter + 1
    const id = counter
    const {name,dept} = req.body;
    Student.push({id,name,dept})
    res.send(Student)
    // console.log(req.body);
})

app.delete('/api/:id',(req,res)=>{
    console.log(req.params);
    let index = Student.map((e)=>{
        return e.id;
    }).indexOf(req.params.id);


    Student.splice(index,1)
    res.send(Student)
})

app.put('/api/:id',(req,res)=>{
    //console.log(req.params);
    // console.log(req.body);
    // const id = req.params.id;
    //console.log(id);
    // console.log(Student[id-1]);

    objIndex = Student.findIndex((obj => obj.id == req.params.id));
    // console.log(objIndex);

    // console.log(Student[objIndex].name);

    const {name,dept} = req.body;

    Student[objIndex].name = name;
    Student[objIndex].id = req.params.id;
    Student[objIndex].dept = dept;

    res.send(Student)
     

})
app.get('/api/:id',(req,res)=>{

    const student = Student.filter((obj)=> obj.id == req.params.id)
    
    res.send(student)
})

app.get('/api',(req,res)=>{
    res.send(Student)
})

app.listen(port,()=>{
    console.log(`This app is running in http://localhost:${port}/`);
})