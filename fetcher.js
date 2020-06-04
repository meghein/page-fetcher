// Implement a small command line node app called fetcher.js which should take a URL as a command-line argument as well as a local file path and download the resource to the specified path.

// Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.

// EXPECTED INPUT: node fetcher.js http://www.example.edu/ ./index.html
// EXPECTED OUTPUT: Downloaded and saved 3261 bytes to ./index.html



// Use the request library to make the HTTP request
// Use Node's fs module to write the file
// Use the callback based approach we've been learning so far
// Do not use the pipe function

const request = require('request');
const fs = require("fs");

const url = process.argv[2];
const localPath = process.argv[3];

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');

request( url, (err, body) => {
  if (err) console.log('error:', error);
  console.log(writeFile(body));
});

const writeFile = (body) => {
  fs.writeFile(`${localPath}`, body, function (err) {
    if (err) return console.log(err);
    request (url, (err, response) => {
      const size = response.headers['content-length'];
      if (err) console.log('error:', err,);
      console.log(`Downloaded and saved ${size} bytes to .${localPath}`);
    })
  });
}


stdin.on('data', (key) => {
  if (key === 'b') {
  process.stdout.write('\rALARM');
  }
  if (key === '\u0003') {
    console.log('Thanks for using me, ciao!');
    process.exit();
  }
});