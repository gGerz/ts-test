interface ICrypto {
    code: string;
    name: string;
}

class Cryptocurrency {
    private readonly code: string;
    private readonly name: string;

    constructor(crypto: ICrypto) {
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
    protected intNum: number;
    protected fractNum: number;
    protected digits: number;

    constructor(crypto: ICrypto, num: number | string, advNum?: number | string) {
        super(crypto);
        if (num && advNum) {
            this.setValue(`${num},${advNum}`)
        } else {
            this.setValue(num)
        }
    }
    getValue () : number {
        return Number(`${this.intNum}.${this.fractNum}`)
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
    getBalance () : string {
        return `${this.intNum}${this.fractNum ? '.' + this.fractNum: ''} ${this.getCode()}`
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
                return Number((parsedFractNum * percent / 100).toFixed(this.getDigits()))
            }
        }
    }
    setValue (num: number | string) : void {
        let separator = typeof num === 'number' ? '.' : ','
        this.intNum = parseInt((num.toString().split(separator)[0]))
        this.fractNum = (num.toString().split(separator)[1]) ? parseInt((num.toString().split(separator)[1])) : 0
        this.digits = (num.toString().split(separator)[1]) ? (num.toString().split(separator)[1]).length : 0
    }
    plusValue (value: number) : number {
        let oldValue = this.getValue()
        let newValue = oldValue + value
        this.setValue(newValue)
        return newValue
    }
    plusPercentValue (percent: number, setting: string = 'full') : number {
        switch (setting) {
            case 'full' : {
                this.plusValue(this.getPercent(percent))
                return this.getValue()
            }
            case 'int' : {
                this.plusValue(this.getPercent(percent, 'int'))
                return this.getValue()
            }
            case 'fract': {
                this.plusValue(this.getPercent(percent, 'fract'))
                return this.getValue()
            }
        }
    }
    minusPercentValue (percent: number, setting: string = 'full') : number {
        switch (setting) {
            case 'full' : {
                this.minusValue(this.getPercent(percent))
                return this.getValue()
            }
            case 'int' : {
                this.minusValue(this.getPercent(percent, 'int'))
                return this.getValue()
            }
            case 'fract': {
                this.minusValue(this.getPercent(percent, 'fract'))
                return this.getValue()
            }
        }
    }
    minusValue (value: number) : number {
        let oldValue = this.getValue()
        let newValue = oldValue - value
        this.setValue(newValue)
        return newValue
    }
    changeValue (value: number | string, advValue?: number | string) : number {
        if (value && advValue) {
            this.setValue(`${value},${advValue}`)
        } else {
            this.setValue(value)
        }
        return this.getValue()
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
}


let testCrypto = {
    name: 'PLAZMA',
    code: 'PLZM'
}

const tmp = new CCY(testCrypto, 150, 3)
console.log(tmp.getValue())

const tmp2 = new CCY(testCrypto, '155', 65)
console.log(tmp2.getValue())
tmp2.changeValue(5, 6)
console.log(tmp2.getValue())

// Вопрос:
// 1) Норм практика возвращать во всех методах 'this',
// чтобы можно было писать такие схемы как tmp.getValue().plusPercent(3).minusPercent(1)
// и тд ?

