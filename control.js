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
var registerMouseCallback = function() {
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