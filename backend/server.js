const express = require('express');
const app = express();
const PORT = 8080;

// Temp test object for API testing
// TODO: change once database test obj is available / refactor to match react component.
const testObj = {
    id: 'testId',
    content: 'testContent'
}


// Middleweare for converting responses to json.
app.use(express.json());

app.listen(
    PORT,
    () => console.log(`Ready on http://localhost:${PORT}`)
)

app.get('/', (req, res) => {
    res.status(200).send(testObj)
});