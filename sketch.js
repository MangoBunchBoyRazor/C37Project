var database, reference, drawingData, saveBtn;
var drawArr = [], strokeArr = [], toDraw = false;
var canvas, form;
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

    form = new Form();
    form.getData();
}
function draw(){
    background(250);

    if(mouseX < 0 && mouseY < 454 && mouseY > 52)
        canvas.style.marginLeft = 100;
    else if(mouseX > 102)
        canvas.style.marginLeft = 50;
    if(toDraw)
        strokeArr.points.push({x: mouseX, y: mouseY});

    push();
    noFill();
    for(i = 0; i < drawArr.length; i++){
        if(drawArr[i] !== null || drawArr[i] !== undefined){
            beginShape();
            for(j = 0; j < drawArr[i].points.length; j++){
                let point = drawArr[i].points[j];
                stroke(drawArr[i].color);
                strokeWeight(drawArr[i].strokeWeight);
                vertex(point.x, point.y);
            }
            endShape();
        }
    }
    pop();
}
function saveDrawing(){
    database.ref('drawings')
}
function mousePressed(){
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    toDraw = true;
    strokeArr = {
        color: form.strokeColor.elt.value,
        strokeWeight: form.strokeWeight.value(),
        points: []
    };
    drawArr.push(strokeArr);
}
}
function mouseReleased(){
    if(toDraw)
        toDraw = false;
}

function errData(err){
    console.log(err);
}