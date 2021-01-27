var Cell = /** @class */ (function () {
    function Cell() {
        this.value = 0;
    }
    Cell.prototype.increment = function () {
        this.value = (this.value + 1) % 256;
    };
    Cell.prototype.decrement = function () {
        this.value -= 1;
        if (this.value < 0) {
            this.value = 255;
        }
    };
    Cell.prototype.putChar = function () {
        return String.fromCharCode(this.value);
    };
    Cell.prototype.setChar = function (char) {
        this.value = char.charCodeAt(0);
    };
    return Cell;
}());
var Pointer = /** @class */ (function () {
    function Pointer() {
        this.index = 0;
    }
    Pointer.prototype.right = function () {
        this.index += 1;
    };
    Pointer.prototype.left = function () {
        this.index -= 1;
    };
    return Pointer;
}());
// init
var memory_size = 100;
var memory = [];
for (var i = 0; i < memory_size; i++) {
    memory.push(new Cell());
}
var ptr = new Pointer();
// exec instructions
// 対応するカッコはスタックで探す
function exec(instructions) {
    console.log(instructions);
}
