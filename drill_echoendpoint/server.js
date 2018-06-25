const express = require('express');
const app = express();

// your code here!
app.use(express.json());

// we'll run all requests to `/example-1` through this 
// function
const logRequest = (req, res, next) => {
  const logObj = {
    time: (new Date()).toTimeString(),
    method: req.method,
    hostname: req.hostname,
    path: req.path,
    "content type": req.get('Content-Type'),
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body)
  };
  console.dir(logObj);
  // we'll learn more about middleware later in this course, but for now
  // know that calling `next()` causes the next function in the middleware stack
  // to be called
  next();

};

// app.all captures all requests to `/`, regardless of
// the request method.
app.all('/', logRequest);
// GET requests to the root of the server
app.get('/echo/:what', (req, res) => {
  
   const responseObj =  {
     
     hostname: req.hostname,
     query: req.query,
     params:req.params,
     
   };
  res.json(responseObj);
  
});
// POST requests to the root of the server
app.post('/', (req, res) => res.status(201).send('a okay'));



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
