// Basic colors.
const CL_WHITE  = "#ffffff";
const CL_BLACK  = "#000000";
const CL_RED    = "#ff0000";
const CL_BLUE   = "#00ff00";
const CL_GREEN  = "#0000ff";

// Variables.
var ctx;
var errorCtxNotDefined = "Canvas context not defined, have you called 'initCanvasContext(element)'?";
var errorCtxFail = "Failed to get context.";
var backgroundColor = CL_BLACK;
var offsetX = 0;
var offsetY = 0;

// Initialize the canvas element.
var initCanvasContext = function(element) {
    var canvas = document.getElementById(element);
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    if(canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.font = "16px Arial";
        console.log("Canvas context initialized.");
        return ctx;
    }
    console.log(errorCtxFail);
}

// Draw on the screen center.
var center = function() {
    offsetX = innerWidth/2;
    offsetY = innerHeight/2;
}

// Draw a rectangle.
var rectangle = function(x,y,w,h) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.fillRect(x+offsetX,y+offsetY,w,h);
}

// Draw a circle.
var circle = function(x,y,r) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.beginPath();
    ctx.arc(x+offsetX,y+offsetY,r,2*Math.PI,false);
    ctx.fill();       
}

// Draw a line.
var line = function(x1,y1,x2,y2,thickness) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.beginPath();
    ctx.moveTo(x1+offsetX,y1+offsetY);
    ctx.lineTo(x2+offsetX,y2+offsetY);
    ctx.stroke();
}

// Set the fill color.
var fillColor = function(hex) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.fillStyle = hex;
}

// Set the stroke color.
var strokeColor = function(hex) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.strokeStyle = hex;
}

// Clear the canvas, defaults to 'backgroundColor'.
var clear = function() {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    fillStyle = ctx.fillStyle;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,innerWidth,innerHeight);
    ctx.fillStyle = fillStyle;
}

// Set the fill and stroke color.
var color = function(hex) {
    fillColor(hex);
    strokeColor(hex);
}

// Set a font.
var font = function(fontString) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.font = fontString;
}

// Draw a string without the offset.
var uitext = function(x,y,text) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.fillText(text,x,y);    
}

// Draw a string with offset.
var text = function(x,y,text) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.fillText(text,x+offsetX,y+offsetY);    
}