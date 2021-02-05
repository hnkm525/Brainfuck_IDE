
class Cell {
    value: number;

    constructor() {
        this.value = 0;
    }

    increment(): void {
        this.value = (this.value+1)%256;
    }

    decrement(): void {
        this.value -= 1;
        if (this.value < 0) {
            this.value = 255;
        } 
    }

    putChar(): string {
        return String.fromCharCode(this.value);
    }

    setChar(char: string): void {
        this.value = char.charCodeAt(0);
    }
}

class Pointer {
    index: number;

    constructor() {
        this.index = 0;
    }

    right(): void {
        this.index += 1;
    }


    left(): void {
        this.index -= 1;
    }
}

class Instruction {
    inc_v: string;
    dec_v: string;
    inc_p: string;
    dec_p: string;
    output: string;
    input: string;
    jump_f: string;
    jump_b: string;

    constructor(inc_v:string = '+', dec_v: string = '-', inc_p: string = '>', dec_p: string = '<', output: string = '.', input: string = ',', jump_f: string = '[', jump_b: string = ']'){
        this.inc_v = inc_v;
        this.dec_v = dec_v;
        this.inc_p = inc_p; 
        this.dec_p = dec_p; 
        this.output = output; 
        this.input = input; 
        this.jump_f = jump_f;  
        this.jump_b = jump_b;
    }
}

function memory_init(mem_size: number = 1000){
    let memory = [];
    for (let i = 0; i < mem_size; i++) {
        memory.push(new Cell());
    }
    return memory;
}

function interpreter(instructions: string, input: string, memory: Cell[], ptr: Pointer):string {
    var out = "";
    if (input.length > 0) {
        var crt_input = input[0];
    } else {
        var crt_input = '';
    }

    for(let i = 0; i < instructions.length; i++) {
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
                    let open_bracket_num: number = 0;
                    let idx: number = i + 1;
                    while (1) {
                        if ( instructions[idx] == '[' ) {
                            open_bracket_num++;
                        } else if ( instructions[idx] == ']' && open_bracket_num == 0 ) {
                            i = idx+1;
                            break;
                        } else if ( instructions[idx] == ']' && open_bracket_num > 0 ) {
                            open_bracket_num--;
                        }
                        idx++;
                    } 
                }
                break;
            case ']':
                if (memory[ptr.index].value != 0) {
                    let close_bracket_num: number = 0;
                    let idx: number = i - 1;
                    while (1) {
                        if ( instructions[idx] == ']' ) {
                            close_bracket_num++;
                        } else if ( instructions[idx] == '[' && close_bracket_num == 0) {
                            i = idx;
                            break;
                        } else if ( instructions[idx] == '[' && close_bracket_num > 0 ){
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
function exec(instructions: string, input: string, memory: Cell[], ptr: Pointer):string {
    return interpreter(instructions, input, memory, ptr);
}
