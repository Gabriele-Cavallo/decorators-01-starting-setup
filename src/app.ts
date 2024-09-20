// function Logger(constructor: Function) {
//    console.log('Logging...'); 
//    console.log('constructor' , constructor);
// }

// DECORATOR FACTORY 
function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    return function(constructor: Function){
        console.log(logString); 
        console.log('constructor' , constructor);
    }
}

function WithTemplate(template: string, hookId: string){
    console.log('TEMPLATE FACTORY');
    return function<T extends {new(...args: any[]): {name: string}} >(originalConstructor: T){
        return class extends originalConstructor{
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name
                }
            }
        }
    };
}


@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Max';

    constructor (){
        console.log('Creating person object...' , this.name);
    }
}

const person = new Person();

// -------------------

function Log(target: any, propertyName: string | Symbol){
    console.log('Property decorator!');
    console.log( target, propertyName );
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
    console.log('Accessor decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor); 

}

function Log4(target: any, name: string | Symbol, position: number){
    console.log('Parameter decorator');
    console.log(target);
    console.log(name);
    console.log(position); 
}

class Product {
    @Log
    @Log2
    set price(val: number){
        if(val > 0){
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!')
        }
    };

    constructor(protected title: string, protected _price: number){}

    @Log3
    getPriceWithTax(@Log4 tax: number){
        return this._price * ( 1 + tax);
    }
}


function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
           const boundFn = originalMethod.bind(this);
           return boundFn;
        },
    }
    return adjDescriptor;
}

class Printer {
    message = 'This works!'

    @Autobind
    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);