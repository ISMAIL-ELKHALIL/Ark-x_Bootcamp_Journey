/* function Animal(greed, size,) {
    this.greed = greed;
    this.size = size;
}


let Tiger = new Animal('Cats', 'Big');
let Tiger1 = new Animal('Cats', 'Big');
Tiger3 = {
    greed: 'Cats', size: 'Big'
}

console.log(Tiger === Tiger1); */

let spaceship = {
    crew: {
        captain: {
            name: 'Lily',
            degree: 'Computer Engineering',
            cheerTeam() { console.log('You got this!') }
        },
        'chief officer': {
            name: 'Dan',
            degree: 'Aerospace Engineering',
            agree() { console.log('I agree, captain!') }
        },
        medic: {
            name: 'Clementine',
            degree: 'Physics',
            announce() { console.log(`Jets on!`) }
        },
        translator: {
            name: 'Shauna',
            degree: 'Conservation Science',
            powerFuel() { console.log('The tank is full!') }
        }
    }
};
console.log(spaceship.crew['captain'].name);

console.log(spaceship.crew.captain.name);

// for...in
for (let crewMember in spaceship.crew) {
    console.log(`${crewMember}: ${spaceship.crew[crewMember]}`);
}
