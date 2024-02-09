// Existing code:
const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.json()); 

let people = [
    {personName: 'Bernard Arnault & family', countryOfCitizenship: 'France', industry: 'Fashion & Retail', source: 'LVMH', finalWorth:'217619.347', squareImage:'//specials-images.forbesimg.com/imageserve/5dc05518ca425400079c659f/416x416.jpg?background=000000&cropX1=0&cropX2=4000&cropY1=1209&cropY2=5212'},
    {personName: 'Elon Musk', countryOfCitizenship: 'United States', industry: 'Automotive', source: 'Tesla, SpaceX', finalWorth:'199481.378', squareImage:'https://specials-images.forbesimg.com/imageserve/62d700cd6094d2c180f269b9/416x416.jpg?background=000000&cropX1=0&cropX2=959&cropY1=0&cropY2=959'},
    {personName: 'Jeff Bezos', countryOfCitizenship: 'United States', industry: 'Technology', source: 'Amazon', finalWorth:'192840.067', squareImage:'https://specials-images.forbesimg.com/imageserve/5bb22ae84bbe6f67d2e82e05/416x416.jpg?background=000000&cropX1=627&cropX2=1639&cropY1=129&cropY2=1142'},
    // {personName: 'Mark Zuckerberg', countryOfCitizenship: 'United States', industry: 'Technology', source: 'Facebook', finalWorth:'165118.298', squareImage:'//specials-images.forbesimg.com/imageserve/5c76b7d331358e35dd2773a9/416x416.jpg?background=000000&cropX1=0&cropX2=4401&cropY1=0&cropY2=4401'},
    // {personName: 'Larry Ellison', countryOfCitizenship: 'United States', industry: 'Technology', source: 'Oracle', finalWorth:'144212.348', squareImage:'//specials-images.forbesimg.com/imageserve/5e8b62cfc095010007bffea0/416x416.jpg?background=000000&cropX1=0&cropX2=4529&cropY1=652&cropY2=5184'},
    
];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/top-richest/all', function (req, res) {
    // Sorting the people array by finalWorth in descending order
    people.sort((a, b) => parseFloat(b.finalWorth) - parseFloat(a.finalWorth));

    if (people) {
        res.send(people)
    } else {
        res.status(404).send({ message: 'People Not found' });
    }
});

app.post('/add', function (req, res) {
    const { personName, countryOfCitizenship, industry, source, finalWorth, squareImage } = req.body;
    if (!personName || !countryOfCitizenship || !industry || !source || !finalWorth || !squareImage) {
        return res.status(400).send({ message: 'All details are required' });
    }

    const newPerson = {
        personName,
        countryOfCitizenship,
        industry,
        source,
        finalWorth,
        squareImage
    };
    
    
    people.push(newPerson);
    res.status(201).send(newPerson);
});

//Existing code ...
let server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

module.exports = server; 



