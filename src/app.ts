function Logger(constructor: Function) {
   console.log('Logging...'); 
   console.log('constructor' , constructor);
}

@Logger
class Person {
    name = 'Max';

    constructor (){
        console.log('Creating person object...' , this.name);
    }
}

const person = new Person();