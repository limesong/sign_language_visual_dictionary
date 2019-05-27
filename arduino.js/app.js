let video;
let yolo;
let status;
let objects = [];
let objectGifs = [];

var apikey = '9D7llCItEIxhD7xJ0eFSh2ryp1cIbrD8';
var query = '';
var gif;

var elementPerson;
var elementPhone;
var elementBanana;

var random;

var personDictionary = [ "https://media.giphy.com/media/7JBrHYQAyTBX2vUw4p/giphy.gif", //simpson6
                         "https://media.giphy.com/media/2WithLZs98qLmfx1I4/giphy.gif", //polarbear8
                         "https://media.giphy.com/media/l4FGnFjMRlw02d7Us/source.gif" //pug2
                      ];
var homer;
var marge;
var lisa;


function setup() {
  var cnv = createCanvas(800, 560);
  cnv.parent('webcam');
  var x = (windowWidth - 800) /2 ;
  var y = (windowHeight - 560) /2;
  cnv.position(x,y);
  video = createCapture(VIDEO);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');

  elementPerson = makeGifElement(personDictionary[0]);
  elementPerson.hide();

  homer = loadSound('simpson/Homer.mp3');
  marge = loadSound('simpson/Marge.mp3');
  lisa = loadSound('simpson/Lisa.mp3');
}



function simpsonClicked () {
    document.getElementById("sign_drawing").src = "simpson/mom_sign.png";
    toggle();
    marge.play();
}

function simpsonClicked2 () {
  document.getElementById("sign_drawing").src = "simpson/sister_sign.png";
  toggle();
  lisa.play();
}

function simpsonClicked3 () {
  document.getElementById("sign_drawing").src = "simpson/dad_sign.png";
  toggle();
  homer.play();
}

function bearClicked() {
    document.getElementById("sign_drawing").src = "bears/happy_sign.png";
    toggle();
}
function bearClicked2() {
    document.getElementById("sign_drawing").src = "bears/surprised_sign.png";
    toggle();
}
function bearClicked3() {
    document.getElementById("sign_drawing").src = "bears/sad_sign.png";
    toggle();
}

function pugSleepClicked() {
    document.getElementById("sign_drawing").src = "pug/sleep_sign.png";
    toggle();
}
function pugWalkClicked() {
    document.getElementById("sign_drawing").src = "pug/walk_sign.png";
    toggle();
}
function pugEatClicked() {
    document.getElementById("sign_drawing").src = "pug/eat_sign.png";
    toggle();
}


document.onkeydown = function (e) {
    var keyCode = e.keyCode;
    if(keyCode == 37) {  //left
          if( random == 0) {
            simpsonClicked();
          } else if ( random == 1) {
             bearClicked();
          } else if ( random ==2 ) {
             pugSleepClicked();
          }

    } else if(keyCode == 40) { //2 DOWN40
          if( random == 0) {
            simpsonClicked2();
          } else if ( random == 1) {
             bearClicked2();
          } else if ( random ==2 ) {
             pugWalkClicked();
          }

    } else if(keyCode == 39) { //3 right
        if( random == 0) {
            simpsonClicked3();
        } else if ( random == 1) {
             bearClicked3();
        } else if ( random == 2) {
             pugEatClicked();
        }
    }
};



function toggle() {

  var x = document.getElementById("sign_drawing");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
}

function keyPressed() {
  if(keyCode === UP_ARROW) {

   random = Math.floor(Math.random()*3) ;

    elementPerson.hide();
    elementPerson = makeGifElement(personDictionary[random]);
    elementPerson.show();

    if(random == 0 ) {
      //simpson
      document.body.style.backgroundImage = "url('https://media.giphy.com/media/RJSrDl3tgfKUmSfybz/giphy.gif')";

      document.getElementById("sign1").style.backgroundImage = "url('./simpson/marge.png')";
      document.getElementById("sign2").style.backgroundImage = "url('./simpson/lisa.png')";
      document.getElementById("sign3").style.backgroundImage = "url('./simpson/homer.png')";

      document.getElementById("sign1").innerHTML = "mother";
      document.getElementById("sign2").innerHTML = "sister";
      document.getElementById("sign3").innerHTML = "father";

      document.getElementById("head").innerHTML = "FAMILY";
    }

    if(random == 1  ) {
      //polarbear
      document.body.style.backgroundImage = "url('https://media.giphy.com/media/12l9ZH0oGg2Ve8/giphy.gif')";

      document.getElementById("sign1").style.backgroundImage = "url('./bears/pandahappy.png')";
      document.getElementById("sign2").style.backgroundImage = "url('./bears/sadbear.png')";
      document.getElementById("sign3").style.backgroundImage = "url('./bears/surprising.png')";

      document.getElementById("sign1").innerHTML = "happy";
      document.getElementById("sign2").innerHTML = "sad";
      document.getElementById("sign3").innerHTML = "surprised";

            document.getElementById("head").innerHTML = "EXPRESSIONS";

   }

   if(random == 2 ){
     //pug
     document.body.style.backgroundImage = "url('https://media.giphy.com/media/ePsV4lBfsrPmo/giphy.gif')";

     document.getElementById("sign1").style.backgroundImage = "url('./pug/sleep.png')";
     document.getElementById("sign2").style.backgroundImage = "url('./pug/walk.png')";
     document.getElementById("sign3").style.backgroundImage = "url('./pug/eat.png')";

     document.getElementById("sign1").innerHTML = "sleep";
     document.getElementById("sign2").innerHTML = "walk";
     document.getElementById("sign3").innerHTML = "eat";

           document.getElementById("head").innerHTML = "ACTIVITIES";
   }
}
}




function draw() {
  //elementPerson.hide();
  image(video, 0, 0, 800, 560);

  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
  //  text(objects[i].className, objects[i].x*width, objects[i].y*height - 5);
    noFill();
    strokeWeight(4);
    stroke(0,255, 0);
    //rect(objects[i].x*width, objects[i].y*height, objects[i].w*width, objects[i].h*height);
    //if object is person, get the person gif and make it postion on the object's.

    if( objects[i].className == "person" ) {
      elementPerson.show();
      elementPerson.position(objects[i].x*width+objects[i].w*width/2+130, objects[i].y*height+objects[i].h*height/2 - 100);
      elementPerson.size(objects[i].w*width/2, objects[i].h*height/2)




    }
  }
}


function startDetecting() {
  status.html('MODEL LOADED!');
  detect();
}

function detect() {
  yolo.detect(function(err, results){
    objects = results;
    detect();
  });
}

function makeGifElement(src){
  //https://media2.giphy.com/media/hdra3g4bm6fAY/200w.gif
  var gifElement = createImg(src);
  gifElement.style('position', 'absolute','visibility');
  return gifElement;
}





/*var personDictionary = ["https://media.giphy.com/media/3ohhwn5mYTXDEHUYg0/giphy.gif", //alien 0
                      "https://media.giphy.com/media/LThD8JVDd19hm/giphy.gif", //adventuretime 1
                      "https://media.giphy.com/media/l4FGnFjMRlw02d7Us/source.gif", //pug2
                      "https://media.giphy.com/media/xUOwGjpt4fCO16ahX2/giphy.gif", //asian3
                      "https://media.giphy.com/media/1BhV7R3gUUeprZbeKg/giphy.gif", //lion4
                      "https://media.giphy.com/media/d7kYE3Bxjt843WNGre/giphy.gif", //teeth5
                      "https://media.giphy.com/media/7JBrHYQAyTBX2vUw4p/giphy.gif", //simpson6
                      "https://media.giphy.com/media/3o7aCSbJ3Ihtbr8KPu/giphy.gif", //hamburger7
                      "https://media.giphy.com/media/2WithLZs98qLmfx1I4/giphy.gif", //polarbear8
                      "https://media.giphy.com/media/3o7btMrTIWNciJTIJi/giphy.gif", //minion9
                      "https://media.giphy.com/media/65WIdpGMjAYFoDrvi2/giphy.gif", //kfc10
                      "https://media.giphy.com/media/55d9QZLjwD93BCIu1t/giphy.gif" //zombie11
                    ];*/


                  /*  if(random == 0 ) {}
                      document.body.style.backgroundImage = "url('https://media1.giphy.com/media/aRZ4vTsHnyW6A/giphy.gif')";
                      //alien
                    }

                    if(random == 1  ) {
                      //adventuretime
                      document.body.style.backgroundImage = "url('https://media.giphy.com/media/JZqRvQY7AZxgA/giphy.gif')";

                   }
                   if(random == 2 ){
                     //pug
                     document.body.style.backgroundImage = "url('https://media.giphy.com/media/ePsV4lBfsrPmo/giphy.gif')";
                   }

                   if(random == 3 ){
                     //asian
                     document.body.style.backgroundImage = "url('https://media.giphy.com/media/IzU4wcD554uGc/giphy.gif')";
                   }

                   if(random == 4 ){
                     //lion
                     document.body.style.backgroundImage = "url('https://media.giphy.com/media/26uf8G6LNWUdlvNPG/giphy.gif')";
                   }

                   if(random == 5 ){
                     //teeth
                     document.body.style.backgroundImage = "url('https://media.giphy.com/media/8zSLvwlVtPzWg/giphy.gif')";
                   }

                   if(random == 6 ){
                     //simpson
                     document.body.style.backgroundImage = "url('https://media.giphy.com/media/RJSrDl3tgfKUmSfybz/giphy.gif')";
                   }

                   if(random == 7 ){
                     //hamburger
                     document.body.style.backgroundImage = "url('https://media.giphy.com/media/3ohs7VoVQt3vOUE4Qo/giphy.gif')";
                   }

                   if(random == 8 ){
                     //polarbear

                     document.body.style.backgroundImage = "url('https://media.giphy.com/media/12l9ZH0oGg2Ve8/giphy.gif')";

                     document.getElementById("sign1").style.backgroundImage = "url('./bears/pandahappy.png')";
                     document.getElementById("sign2").style.backgroundImage = "url('./bears/sadbear.png')";
                     document.getElementById("sign3").style.backgroundImage = "url('./bears/surprising.png')";

                     document.getElementById("sign1").innerHTML = "happy";
                     document.getElementById("sign2").innerHTML = "surprised";
                     document.getElementById("sign3").innerHTML = "sad";
                   }

                  if(random == 9 ){
                    //minion
                    document.body.style.backgroundImage = "url('https://media.giphy.com/media/mPOGx4hJtOWSA/giphy.gif')";
                  }

                  if(random == 10 ){
                    //kfc
                    document.body.style.backgroundImage = "url('https://media.giphy.com/media/or3YvoqY4adAA/giphy.gif')";
                  }

                  if(random == 11 ){
                    //zombie
                    document.body.style.backgroundImage = "url('https://media.giphy.com/media/MT7JpJ4ytSFkA/giphy.gif')";
                  } */
