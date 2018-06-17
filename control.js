var bindKeydown = function(func) {
    window.addEventListener('keydown', func, false);
}
var bindKeyup = function(func) {
    window.addEventListener('keyup', func, false);
}
var bindPointer = function(func) {
    window.addEventListener('mousemove', func, false);
}