song="";
leftWrist_x=0;
rightWrist_x=0;
leftWrist_y=0;
rightWrist_y=0;
score_leftwrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotposes);

}

function modelLoaded(){
    console.log("poseNet model is initialized");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        
        score_leftwrist=results[0].pose.keypoints[9].score;
        console.log("score_leftwrist= "+score_leftwrist);

        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        console.log("rightWrist_x= "+rightWrist_x+" ,rightWrist_y= "+rightWrist_y);

        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        console.log("leftWrist_x= "+leftWrist_x+" ,leftWrist_y= "+leftWrist_y);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(score_leftwrist>0.2){
    circle(leftWrist_x,leftWrist_y,20);
    no_leftwristY= Number(leftWrist_y);
    remove_decimal_y= floor(no_leftwristY);
    volume= remove_decimal_y/500;
    document.getElementById("volume").innerHTML="volume= "+volume;
    song.setVolume(volume);
}
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}