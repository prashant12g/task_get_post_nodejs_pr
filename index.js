const express = require('express');
const Joi = require('joi'); // used for validation purpose
const app = express();
app.use(express.json());


const courses = [
    { id: 1, name: 'SST', weightage: 25, type: 'elective', noOfStudentsEnrolled: 65 },
    { id: 2, name: 'Mathematics', weightage: 45, type: 'core', noOfStudentsEnrolled: 40 },
    { id: 3, name: 'Science', weightage: 30, type: 'core', noOfStudentsEnrolled: 54 },
    { id: 4, name: 'English', weightage: 50, type: 'core', noOfStudentsEnrolled: 65 },
    { id: 5, name: 'Hindi', weightage: 20, type: 'core', noOfStudentsEnrolled: 35 },
    { id: 6, name: 'History', weightage: 40, type: 'elective', noOfStudentsEnrolled: 85 },
];

app.get('/', (req, res) => {
    res.send('Welcome to landing home page');
});


// endpoint to get list of all courses
app.get('/api/courses', function (req, res) {
    res.send(courses);
});


// Joi is for validation
// post endpoint to create a new course
app.post('/api/courses', (req, res) => {
    var schema = Joi.object({
        name: Joi.string().min(2).required()
    });
    var result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
        return;
    }
    var course = {
        id: courses.length + 1,
        name: req.body.name,
        weightage: req.body.weightage,
        type: req.body.type,
        noOfStudentsEnrolled: req.body.noOfStudentsEnrolled
    };
    courses.push(course);
    res.send(course);
});


// endpoint to get specific course details
app.get('/api/courses/:id', (req, res) => {
    var course = courses.find(c =>  c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send('The course was the given id was not found');
    res.send(course);
});


// for unmatched path URL for GET 
app.get('*', (req, res) => {
    res.send('This is a default response as the requested URL does not match any of the GET request!!');
});


app.post('*', (req, res) => {
    res.send('This is a default response as the requested URL does not match any of the POST request!!');
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));