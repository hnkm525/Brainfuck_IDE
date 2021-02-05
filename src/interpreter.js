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
var Instruction = /** @class */ (function () {
    function Instruction(inc_v, dec_v, inc_p, dec_p, output, input, jump_f, jump_b) {
        if (inc_v === void 0) { inc_v = '+'; }
        if (dec_v === void 0) { dec_v = '-'; }
        if (inc_p === void 0) { inc_p = '>'; }
        if (dec_p === void 0) { dec_p = '<'; }
        if (output === void 0) { output = '.'; }
        if (input === void 0) { input = ','; }
        if (jump_f === void 0) { jump_f = '['; }
        if (jump_b === void 0) { jump_b = ']'; }
        this.inc_v = inc_v;
        this.dec_v = dec_v;
        this.inc_p = inc_p;
        this.dec_p = dec_p;
        this.output = output;
        this.input = input;
        this.jump_f = jump_f;
        this.jump_b = jump_b;
    }
    return Instruction;
}());
function memory_init(mem_size) {
    if (mem_size === void 0) { mem_size = 1000; }
    var memory = [];
    for (var i = 0; i < mem_size; i++) {
        memory.push(new Cell());
    }
    return memory;
}
function interpreter(instructions, input, memory, ptr) {
    var out = "";
    if (input.length > 0) {
        var crt_input = input[0];
    }
    else {
        var crt_input = '';
    }
    for (var i = 0; i < instructions.length; i++) {
        switch (instructions[i]) {
            case '+':
                memory[ptr.index].increment();
                break;
            case '-':
                memory[ptr.index].decrement();
                break;
            case '>':
                ptr.right();
                break;
            case '<':
                ptr.left();
                break;
            case '.':
                out += memory[ptr.index].putChar();
                break;
            case ',':
                memory[ptr.index].setChar(crt_input);
                input = input.slice(1);
                break;
            case '[':
                if (memory[ptr.index].value == 0) {
                    var open_bracket_num = 0;
                    var idx = i + 1;
                    while (1) {
                        if (instructions[idx] == '[') {
                            open_bracket_num++;
                        }
                        else if (instructions[idx] == ']' && open_bracket_num == 0) {
                            i = idx + 1;
                            break;
                        }
                        else if (instructions[idx] == ']' && open_bracket_num > 0) {
                            open_bracket_num--;
                        }
                        idx++;
                    }
                }
                break;
            case ']':
                if (memory[ptr.index].value != 0) {
                    var close_bracket_num = 0;
                    var idx = i - 1;
                    while (1) {
                        if (instructions[idx] == ']') {
                            close_bracket_num++;
                        }
                        else if (instructions[idx] == '[' && close_bracket_num == 0) {
                            i = idx;
                            break;
                        }
                        else if (instructions[idx] == '[' && close_bracket_num > 0) {
                            close_bracket_num--;
                        }
                        idx--;
                    }
                }
                break;
            default:
                break;
        }
    }
    return out;
}
var ptr = new Pointer();
var input = "";
// exec instructions
// 対応するカッコはスタックで探す
function exec(instructions, input, memory, ptr) {
    return interpreter(instructions, input, memory, ptr);
}
