function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modeloaded)
}

function modeloaded(){
  console.log("modeloaded!")
}

function draw(){
  image(video,0,0,300,300)
  classifier.classify(video,gotresult)
}

var previous_result ="";

function gotresult(error,results){
if(error){
console.error(error)
}
else{
  if(results[0].label != previous_result && results[0].confidence>0.5){

    console.log(results)
    previous_result = results[0].label
    var synth=window.speechSynthesis
    speak_data="Object Detected is:"+results[0].label
    var utterThis = new SpeechSynthesisUtterance(speak_data)
    synth.speak(utterThis)

    document.getElementById("object_span").innerHTML=results[0].label
    document.getElementById("accuracy_span").innerHTML=results[0].confidence.toFixed(3)
  }

}

}