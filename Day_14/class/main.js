// Define a basic Person class
class Person {
  // Constructor to initialize object properties
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method to introduce the person
  introduce() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

// Create instances of the Person class
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

// Call the introduce method on each instance
person1.introduce(); // Output: Hi, I'm Alice and I'm 30 years old.
person2.introduce(); // Output: Hi, I'm Bob and I'm 25 years old.

// Define a subclass (Student) that extends the Person class
class Student extends Person {
  constructor(name, age, grade) {
    // Call the constructor of the parent class (Person)
    super(name, age);
    this.grade = grade;
  }

  // Override the introduce method from the parent class
  introduce() {
    console.log(`Hi, I'm ${this.name}, a student. I'm ${this.age} years old, and my grade is ${this.grade}.`);
  }

  // Additional method specific to Student
  study() {
    console.log(`${this.name} is studying hard.`);
  }
}

// Create instances of the Student class
const student1 = new Student("Eve", 22, "A");
const student2 = new Student("Dave", 19, "B");

// Call methods on Student instances
student1.introduce(); // Output: Hi, I'm Eve, a student. I'm 22 years old, and my grade is A.
student1.study();    // Output: Eve is studying hard.

student2.introduce(); // Output: Hi, I'm Dave, a student. I'm 19 years old, and my grade is B.
student2.study();    // Output: Dave is studying hard.

