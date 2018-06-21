// Basic colors.
const CL_WHITE  = "#ffffff";
const CL_BLACK  = "#000000";
const CL_RED    = "#ff0000";
const CL_BLUE   = "#0000ff";
const CL_GREEN  = "#00ff00";
const CL_GRAY   = "#888888";

// Variables.
var canvas;
var ctx;
var errorCtxNotDefined = "Canvas context not defined, have you called 'initCanvasContext(element)'?";
var errorCtxFail = "Failed to get context.";
var backgroundColor = CL_BLACK;
var offsetX = 0;
var offsetY = 0;
var fill = true;
var stroke = true;

var setPolygonFill = function() { fill = true; stroke = false; }
var setPolygonStroke = function() { fill = false; stroke = true; }
var setPolygonFillAndStroke = function() { fill = true; stroke = true; }
var setTextAlignCenter = function() { ctx.textAlign = "center"; }
var setTextAlignLeft = function() { ctx.textAlign = "left"; }

// Initialize the canvas element.
var createGlobalCanvas = function(element) {
    canvas = document.getElementById(element);
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    if(!canvas.getContext) {
        console.log(errorCtxFail);
        return;
    }
    ctx = canvas.getContext("2d");
    ctx.font = "16px Arial";
    console.log("Canvas context initialized on element '" + element + "'.");}

// Draw on the screen center.
var setCenterScreenOffset = function() {
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
    var lineWidth = ctx.lineWidth;
    if(thickness != null) {
        ctx.lineWidth = thickness;
    }
    ctx.beginPath();
    ctx.moveTo(x1+offsetX,y1+offsetY);
    ctx.lineTo(x2+offsetX,y2+offsetY);
    ctx.stroke();
    ctx.lineWidth = lineWidth;
}

// Draw a polygon.
var polygon = function(points) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.beginPath();
    for(var i=0; i<points.length; i++){
        ctx.lineTo(points[i].x + offsetX, points[i].y + offsetY);
    }
    ctx.lineTo(points[0].x + offsetX, points[0].y + offsetY);
    if(fill) ctx.fill();
    if(stroke) ctx.stroke();
}

// Set the fill color.
var fillColor = function(c) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.fillStyle = c;
}

// Set the stroke color.
var strokeColor = function(c) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.strokeStyle = c;
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
var color = function(c) {
    fillColor(c);
    strokeColor(c);
}

// Set a font.
var font = function(f) {
    if(ctx == null) {
        console.log(errorCtxNotDefined);
        return;
    }
    ctx.font = f;
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