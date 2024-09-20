// function Logger(constructor: Function) {
//    console.log('Logging...'); 
//    console.log('constructor' , constructor);
// }

// DECORATOR FACTORY 
function Logger(logString: string) {
    return function(constructor: Function){
        console.log(logString); 
        console.log('constructor' , constructor);
    }
}


@Logger('LOGGING - PERSON')
class Person {
    name = 'Max';

    constructor (){
        console.log('Creating person object...' , this.name);
    }
}

const person = new Person();