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
        this.setValue(num)
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
    setValue (num: number | string) : void {
        let separator = typeof num === 'number' ? '.' : ','
        this.intNum = parseInt((num.toString().split(separator)[0]))
        this.fractNum = parseInt((num.toString().split(separator)[1]))
        this.digits = (num.toString().split(separator)[1]).length
    }
    getValue () : number {
        return Number(`${this.intNum}.${this.fractNum}`)
    }
    getBalance () : string {
        return `${this.intNum}.${this.fractNum} ${this.getCode()}`
    }
    getPercent (percent: number, setting: string = 'full' ) : number {
        switch (setting) {
            case 'full' : {
                return this.getValue() * percent / 100
            }
            case 'int' : {
                return this.getIntNum() * percent / 100
            }
            case 'fract': {
                let parsedFractNum = this.getValue() - this.getIntNum() // .999 -> 0.999
                return parsedFractNum * percent / 100
            }
        }
    }
    plusValue (value: number) : number {
        let oldValue = this.getValue()
        let newValue = oldValue + value
        this.setValue(newValue)
        return newValue
    }
    minusValue (value: number) : number {
        let oldValue = this.getValue()
        let newValue = oldValue - value
        this.setValue(newValue)
        return newValue
    }
    isMoreThen(value: number) : boolean {
        return this.getValue() > value
    }
    isLessThen(value: number) : boolean {
        return this.getValue() < value
    }
    isEqually (value: number) : boolean {
        return this.getValue() === value
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
console.log(tmp.getIntNum())
console.log(tmp.getFractNum())
console.log(tmp.getDigits())
console.log(tmp.getValue())
console.log(tmp.getBalance())
console.log(tmp.plusValue(44.27))
console.log(tmp.getBalance())
console.log(tmp.getPercent(10, 'fract'), '%')
