 
 song = "";
 leftWristX = 0;
 leftWristY = 0;
 rightWristX = 0;
 rightWristY = 0;


 function setup() {

    canvas = createCanvas(600,500);
    canvas.position(375,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose", gotPoses);
 }

 function gotPoses(results) {
   if(results.length > 0) {
       console.log(results);
       scoreLeftWrist = results[0].pose.keypoints[9].score;
       scoreRightWrist = results[0].pose.keypoints[10].score;
       console.log("Score Left Wrist = " + scoreLeftWrist + "Score Right Wrist = " + scoreRightWrist);

       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       console.log("Left Wrist X = " + leftWristX + "Left Wrsit Y =" + leftWristY);

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log("Right Wrist X =" + rightWristX + "Right Wrist Y =" + rightWristY);
   }
 }

 function modelLoaded() {
     console.log("Pose Net has been intialized");
 }

 function draw() {

    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#000000");
 
     if(scoreRightWrist > 0.2) {

        circle(rightWristX,rightWristY,20);

        if(rightWristY >0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Song Rate = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY >100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Song Rate = 1x";
            song.rate(1);
    
        }
        else if(rightWristY >200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Song Rate = 1.5x";
            song.rate(1.5);
    
        }
        else if(rightWristY >300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Song Rate = 2x";
            song.rate(2);
        }
        else if(rightWristY >400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Song Rate = 2x";
            song.rate(2);
        }
     }
     if(scoreLeftWrist > 0.2) {

    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);
     }
 }

 function preload() {

    song = loadSound("Harry Potter - Main Theme.mp3");
 }

 function play() {
     song.play();
     song.setVolume(1);
     song.rate(1);
 }


