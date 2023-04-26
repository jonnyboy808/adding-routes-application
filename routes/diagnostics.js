const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

diagnostics.post('/', (req, res) => {
  console.log("post request received at diagnostics.js")
  console.log(req.body);
  const {tip, topic, username } = req.body;
  

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