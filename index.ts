class Cryptocurrency {
    code: string;
    name: string;

    // todo: убрать 'any'
    constructor(crypto: any) {
        this.code = crypto.code
        this.name = crypto.name
    }
    getCode () : string {
        return this.code
    }
    getName () : string {
        return this.name
    }
}

class CCY extends Cryptocurrency {
    intNum: number;
    fractNum: number;
    digits: number;

    constructor(crypto: object, intNum: number, fractNum: number, digits: number = 8) {
        super(crypto);
        this.intNum = intNum
        this.fractNum = fractNum
        this.digits = digits
    }

    getIntNum () : number {
        return this.intNum
    }
    getFractNum () : number {
        return this.fractNum
    }
    getDigits () : number {
        return this.digits
    }
    // todo: get full value
    getValue () : number {
        return this.intNum
    }
    plusValue (value: number) : number {
        this.intNum += value
        return this.intNum
    }
    minusValue (value: number) : number {
        this.intNum -= value
        return this.intNum
    }
    isMoreThen(value: number) : boolean {
        return this.intNum > value
    }
    isLessThen(value: number) : boolean {
        return this.intNum < value
    }
    isEqually (value: number) : boolean {
        return this.intNum === value
    }
    // todo ChangeValues
    changeValues (from: number, to: number ): void {
        console.log(from, to)
    }


}


let testCrypto = {
    name: 'PLAZMA',
    code: 'PLZM'
}

const tmp = new CCY(testCrypto, 150, 99, 3) // 150.990

console.log(tmp.getIntNum())
console.log(tmp.plusValue(1))
console.log(tmp.getIntNum())
