import { Component } from '@angular/core';
import { flyIn } from 'animations/fly-in';

interface Person {
  name: string;
  speak(): void;
}

class Student {
  name: string;
  gender: boolean;
  speak() {
    console.log('I\'m a student');
  }
}

class Teacher {
  name: string;
  age: number;
  speak() {
    console.log('I\'m a teacher');
  }
}

@Component({
  templateUrl: './interface-vs-class.component.html',
  animations: [
    flyIn
  ]
})
export class InterfaceVsClassComponent {

  sayHello(one: Person) {
    one.speak()
  }

  doSomething() {
    var s = new Student();
    this.sayHello(s);
  }

}