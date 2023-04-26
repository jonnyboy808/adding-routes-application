const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log("post request received at diagnostics.js")
  console.log(req.body);
  const {tip, topic, username } = req.body;
  
  //If all required properties--tip, topic, and username--are present
  //variable for the new error object we'll create
  const newDiagnostic = {
    time: Date.now(),
    error_id: uuidv4(),
    errors: req.body
  }

  readAndAppend(newDiagnostic, './db/diagnostics.json');

  const response = {
    status: 'success',
    body: newDiagnostic,
  };

  res.json(response);
});

module.exports = diagnostics;