function setup() {
  // put setup code here
  noCanvas();

  //  drawData();
  console.log('running');


  const button = select('#submit');
  button.mousePressed(submitWord);

  const buttonA = select('#analyze');
  buttonA.mousePressed(analyzeThis);

}

function analyzeThis() {
  var txt = select('#textinput').value();

  var data = {
    text: txt
  }

  httpPost('analyze', data, 'json', dataPosted, dataErr);
}

function dataPosted(result) {
  console.log(result);
}

function dataErr(err) {
  console.log(err);
}


function submitWord() {
  let word = select('#word').value();
  let score = select('#score').value();
  console.log(word, score);

  loadJSON('add/' + word + '/' + score, finished);


  function finished(data) {
    console.log(data);
    document.getElementById("word").value = "";
    document.getElementById("score").value = "";
  }
}




function draw() {
  // put drawing code here
}