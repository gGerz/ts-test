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

    constructor(crypto: object, num: number | string) {
        super(crypto);
        let separator = typeof num === 'number' ? '.' : ','
        this.intNum = parseInt((num.toString().split(separator)[0]))
        this.fractNum = parseInt((num.toString().split(separator)[1]))
        this.digits = (num.toString().split(separator)[1]).length
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
    getValue () : number {
        return Number(`${this.intNum}.${this.fractNum}`)
    }
    getBalance () : string {
        return `${this.intNum}.${this.fractNum} ${this.getCode()}`
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

const tmp = new CCY(testCrypto, 150.346)
const tmp2 = new CCY(testCrypto, '150,346')

console.log('number')
console.log(tmp.getIntNum())
console.log(tmp.getFractNum())
console.log(tmp.getDigits())
console.log(tmp.getValue())
console.log(tmp.getBalance())
console.log('string')
console.log(tmp2.getIntNum())
console.log(tmp2.getFractNum())
console.log(tmp2.getValue())
console.log(tmp2.getBalance())
