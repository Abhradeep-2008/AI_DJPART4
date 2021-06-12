music1 = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftwrist = 0;
scoreRightwrist= 0;
music1status = "";
music2status = "";


function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, ModelLoaded); 
    posenet.on('pose', gotResults);
}

function draw(){
    image(video,0,0,500,500);

    music1status = music1.isPlaying();
    music2status = music2.isPlaying();


     fill("red");
     stroke("red");

    if(scoreLeftwrist > 0.2){

        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(music1status == false){
            music1.play();
            document.getElementById("song_name").innerHTML = " Legends Never Die";
        }
    }

    if(scoreRightwrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        music1.stop();
        if(music2status == false){
            music2.play();
            document.getElementById("song_name").innerHTML = " Invisible";
        }
    }
}
function ModelLoaded(){
    console.log("Posenet is Initialized!");
}


function gotResults(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
    }
}


















