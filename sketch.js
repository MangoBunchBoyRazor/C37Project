var database, reference, drawingData;
var drawArr = [], strokeArr = [], toDraw = false;
var canvas;
function preload(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDLFicrn2DRce1yXWLLQSIG4KdoF9UDffU",
        authDomain: "c34-class-8a482.firebaseapp.com",
        databaseURL: "https://c34-class-8a482.firebaseio.com",
        projectId: "c34-class-8a482",
        storageBucket: "c34-class-8a482.appspot.com",
        messagingSenderId: "573200906170",
        appId: "1:573200906170:web:7d6409bc351367bc1e0f83"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}
function setup(){
    database = firebase.database();
    reference = database.ref("Drawings");
    reference.on('value',getData,errData);

    canvas = createCanvas(600,400);
    canvas.class('canvas');
}
function draw(){
    background(250);

    textAlign(CENTER);
    textSize(30);
    text("Let's Paint together!",width/2,50);

    if(toDraw)
        strokeArr.points.push({x: mouseX, y: mouseY, color: '000000', strokeWeight: 1});

    push();
    noFill();
    for(i = 0; i < drawArr.length; i++){
        if(drawArr[i] !== null || drawArr[i] !== undefined){
            beginShape();
            for(j = 0; j < drawArr[i].points.length; j++){
                let point = drawArr[i].points[j];
                vertex(point.x, point.y);
            }
            endShape();
        }
    }
    pop();
}
function mousePressed(){
    toDraw = true;
    strokeArr = {
        color: '000000',
        strokeWeight: 1,
        points: []
    };
    drawArr.push(strokeArr);
    canvas.class('canvasD');
}
function mouseReleased(){
    if(toDraw)
        toDraw = false;
    if(canvas.class() == 'canvasD')
        canvas.class('canvas');
}
function getData(data){
    drawingData = data;
}
function errData(err){
    console.log(err);
}