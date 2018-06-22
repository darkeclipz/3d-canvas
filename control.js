// Most used keys
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const KEY_RIGHT = 39;
const KEY_Q = 81;
const KEY_E = 69;
const KEY_Z = 90;
const KEY_X = 88;
const KEY_C = 67;
const KEY_V = 86;
const KEY_R = 82;
const KEY_F = 70;
const KEY_SPACE = 32;
const KEY_L = 76;
const KEY_U = 85;
const KEY_K = 75;
const KEY_J = 74;
const KEY_P = 80;
const KEY_B = 66;
const KEY_O = 79;

// Keep track of which key has been pressed.
var keysDown = [], keysToggled = [];
for(var i=0; i<255; i++) { keysDown.push(false); keysToggled.push(false); }

// Handles the movement with the keyboard.
var keydownCallback = function(e) {
    if(e.keyCode >= 255) return;
    if(!keysDown[e.keyCode]) {
        if(verbose) console.log("registered key: " + e.keyCode);
        keysDown[e.keyCode] = true;
        keysToggled[e.keyCode] = !keysToggled[e.keyCode];
        return; 
    }
}

var keyupCallback = function(e) {
    if(verbose) console.log("deregistered key: " + e.keyCode);
    keysDown[e.keyCode] = false;
}

var bindKeydown = function(func) {
    document.addEventListener('keydown', func, false);
}
var bindKeyup = function(func) {
    document.addEventListener('keyup', func, false);
}
var bindMouse = function(func) {
    document.addEventListener('pointerlockchange', func, false);
    document.addEventListener('mozpointerlockchange', func, false);
    document.addEventListener('webkitpointerlockchange', func, false);  
}
var bindClick = function(func) {
    document.addEventListener('click', func, false);
}
var pointerLockCallback = function pointerLock() {
    var check_pointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

    if(check_pointerLock){
        if(verbose) console.log("Pointer lock exists");

        canvas.requestPointerLock = canvas.requestPointerLock ||
            canvas.mozRequestPointerLock ||
            canvas.webkitRequestPointerLock;
            
        canvas.requestPointerLock();

        document.addEventListener('pointerlockerror', errorCallback, false);
        document.addEventListener('mozpointerlockerror', errorCallback, false);
        document.addEventListener('webkitpointerlockerror', errorCallback, false);

        if (!!document.pointerLockElement) {
            if(verbose) console.log("locked");
        } 
        else {
            if(verbose) console.log("not locked");
        }
    }
    function errorCallback() {
        console.log("There was an error");

    }
}
var registerMouse = function() {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas ||
        document.webkitPointerLockElement === canvas) {
        document.addEventListener("mousemove", mouseCallback, false);
        return true;
    } else {
        document.removeEventListener("mousemove", mouseCallback, false);
        return false;
    }
}