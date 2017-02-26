function Animal(name) {
    if(!(this instanceof Animal)) {
        return new Animal(name);
    }
    this.name = name;
}
var animal = Animal("wangwang");
console.log(animal);//Animal
console.log(Animal.prototype.constructor === Animal); // true
