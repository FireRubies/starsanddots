//Figure out why it won't play, save, or record the audio
//Maybe use another audio library to save the file and
//record the audio but still use p5js to play the audio?
//Try to make it work here first!!
//https://editor.p5js.org/FireRubies/sketches/_IfdC2qwE

var text_data = "";
/* var soundFile = new p5.SoundFile(); */
var chunks = [];
var ac = new AudioContext();
var osc = ac.createOscillator();
var dest = ac.createMediaStreamDestination();
var mediaRecorder = new MediaRecorder(dest.stream);
osc.connect(dest);

/* function setup() {
  createCanvas(400, 400);
userStartAudio();
  recorder = new p5.SoundRecorder();
  recorder.setInput(osc);
}

function draw() {
  background(220);
} */

var openFile = function (event) {
  var input = event.target;

  var reader = new FileReader();
  reader.onload = function () {
    var text = reader.result;
    var char_data = {};
    var unique_chars = findUnique(text);
    for (var i = 0; i < unique_chars.length; i++) {
      var pchar = unique_chars[i];
      char_data[pchar] = [
        prompt(`Enter Frequency for "${pchar}"`),
        prompt(`Enter Duration for "${pchar}"`),
      ];
    }
    main(text, char_data, prompt(`Enter Pause Time`));
  };
  reader.readAsText(input.files[0]);
};

function findUnique(str) {
  // Split the string to make array
  str = str.split("");
  console.log(str);
  // Create a set using array
  str = new Set(str);

  // Convert the set into array using spread
  // operator
  str = [...str];

  return str;
}

async function main(text, char_data, pause_time) {
	mediaRecorder.start();
  console.log("wqwqe")
  osc.start(0);
  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    var char_freq = parseInt(char_data[char][0]);
    var char_dur = parseInt(char_data[char][1]);
    console.log("wqwqawdwe")
    console.log(char_freq);
    console.log(osc.frequency)
    await osc.frequency.setValueAtTime(char_freq, ac.currentTime);
    //await startOscillator();
    console.log("wqwwdwdwdwdwdwdwdwdwdwwqe")
    await sleep(char_dur).then(stopOscillator);
    await sleep(pause_time);
    console.log("wqwadwawdawdqe")
  }
  console.log("mlob");
  
  await mediaRecorder.stop();
  console.log("blob");
  //soundFile.play();
  console.log("test1232");
}

function stopOscillator() {
	//console.log("stopping oscillator");
  //osc.disconnect();
  osc.frequency.setValueAtTime(0, ac.currentTime);
}

function startOscillator() {
	//console.log("starting oscillator");
  osc.connect(dest);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

     mediaRecorder.ondataavailable = function(evt) {
       // push each chunk (blobs) in an array
       chunks.push(evt.data);
     };

     mediaRecorder.onstop = function(evt) {
       // Make blob out of our blobs, and open it.
       var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
       document.querySelector("audio").src = URL.createObjectURL(blob);
     };
