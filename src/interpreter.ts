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


// init
let memory_size: number = 100;
let memory = [];
for (let i = 0; i < memory_size; i++) {
    memory.push(new Cell());
}
let ptr = new Pointer();

// exec instructions
// 対応するカッコはスタックで探す
function exec(instructions: string):void {
    console.log(instructions);
}
