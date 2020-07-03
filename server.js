var fs = require('fs');

var data = fs.readFileSync('additional.json');
var afidata = fs.readFileSync('afinn111.json');
var additional = JSON.parse(data);
var afinn = JSON.parse(afidata);

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var server = app.listen(3000, listening);

function listening() {
  console.log('listening');
}
app.use(express.static('website'));

app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.post('/analyze', analyzeThis);

function analyzeThis(req, res) {
  var txt = req.body.text;
  var words = txt.split(/\W+/);
  var totalScore = 0;
  for (i = 0; i < words.length; i++) {
    var word = words[i];
    var score = 0;
    if (additional.hasOwnProperty(word)) {
      score = Number(additional[word]);
    } else if (afinn.hasOwnProperty(word)) {
      score = Number(afinn[word]);
    }
    totalScore += score;

  }


  var comp = totalScore / words.length;
  var reply = {
    score: totalScore,
    comparative: comp
  }

  res.send(reply);

}


app.get('/add/:word/:score?', sendWord);

function sendWord(req, res) {
  let data = req.params;
  let word = data.word;
  let score = Number(data.score);
  let reply = '';
  if (!score) {
    reply = {
      mes: "The score is required."
    }
    res.send(reply);
  } else {

    additional[word] = score;
    var da = JSON.stringify(additional, null, 2);

    fs.writeFile('additional.json', da, finished);

    function finished(err) {
      console.log('all set.');

      reply = {
        word: additional,
        score: score,
        status: "Success."
      }
      res.send(reply);
    }


  }
}

app.get('/all', sendAll);

function sendAll(req, res) {

  var d = {
    additional: additional,
    afinn: afinn,
  }

  res.send(d);

}




app.get('/search/:word', searchWord)

function searchWord(req, res) {
  let data = req.params;
  let word = data.word;
  let reply = '';
  if (additional[word]) {
    reply = {
      status: "found",
      word: word,
      score: words[word]
    }
  } else {
    reply = {
      status: "not found",
      word: word
    }
  }
  res.send(reply);


  console.log('ciao');
}