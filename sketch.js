var brush = [];
var paint;
var database, position;
var r, g, b, strokeWeightVal,xval, yval;
var brushPosition;

function setup() {
    database = firebase.database();
    brushPosition = database.ref('brush/position');

    brushPosition.on("value", readPosition, showError);

    createCanvas(1500, 900);
}

function draw() {
    if(position !== undefined) {
        background("white");
        mousePressed();
    }
}

function mousePressed() {         
        if(mouseIsPressed) {
            xval = mouseX;
            yval = mouseY;        
            r = random(0, 255);
            g = random(0, 255);
            b = random(0, 255);
            strokeWeightVal = random(10, 20);  
            writePosition(xval, yval, r, g, b, strokeWeightVal);           
        }
                                
        for(var i = 0; i < brush.length; i++) {  
            stroke(brush[i][2], brush[i][3], brush[i][4]);
            strokeWeight(brush[i][5]);
            point(brush[i][0], brush[i][1]);            
        }                   
}

function mouseReleased() { 
    //brushPosition.on("value", readPosition, showError);
}

function readPosition(data) {
    position = data.val();
    xval = position.x;
    yval = position.y;
    strokeWeightVal = position.strokeWeight;
    r = position.r;
    g = position.g;
    b = position.b; 
      
    paint = [xval, yval, r, g, b, strokeWeightVal];
    brush.push(paint);               
}

function writePosition(xval, yval, r, g, b, strokeWeightVal) {
    database.ref('brush/position').set({
         'x' : xval, 
         'y' : yval,
         'r' : r,
         'g' : g,            
         'b' : b,              
         'strokeWeight' : strokeWeightVal    
        })
}

function showError() {
    text("ERROR", 200, 200);
}