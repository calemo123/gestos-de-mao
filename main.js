Webcam.set({
    width:350,
    height:350,
    imageFormatn : 'png',
    pngQulaity:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapShot()
{
      Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML = '<img id="capturedImage" src="'+data_uri+'"/>';
      }) 
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nVilmtuAW/model.json',modelLoaded);

function modelLoaded() {
    console.log('modelLoaded!');
}
prediction1 = "";
prediction2 = "";

function speak()
{
  var synth = window.speechSynthesis;
  speakData1 = "A primeita previsão é "+ prediction1;
  speakData2 = "A segunda previsão é "+ prediction2;
  var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
  synth.speak(utterThis);
 }

 function check()
 {
   img = document.getElementById('capturedImage');
   classifier.classify(img, gotResult);
 }

   function gotResult(error , results)
   {
      if (error) {
        console.error(error);
      } else {
        console.log(results);
        document.getElementById("nomeResultadoDoGesto").innerHTML = results[0].label;
        document.getElementById("nomeResultadoDoGesto2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "sim")
        {
          document.getElementById("updateGesto").innerHTML = "&#128077;";
        }
        if(results[0].label == "não")
        {
          document.getElementById("updateGesto").innerHTML = "&#128078;";
        }
        if(results[0].label == "paz e amor")
        {
          document.getElementById("updateGesto").innerHTML = "&#9996;";
        }
        if(results[0].label == "rock and holl")
        {
            document.getElementById("updateGesto").innerHTML = "&#129304;";
        }
        if(results[1].label == "sim")
        {
          document.getElementById("updateGesto2").innerHTML = "&#128077;";
        }
        if(results[1].label == "não")
        {
          document.getElementById("updateGesto2").innerHTML = "&#128078;";
        }
        if(results[1].label == "paz e amor")
        {
          document.getElementById("updateGesto2").innerHTML = "&#9996;";
        }
        if(results[1].label == "rock and holl")
        {
            document.getElementById("updateGesto2").innerHTML = "&#129304;";
        }
      }
   }