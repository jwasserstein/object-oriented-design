/*

Design a call-center
What levels of employees are in the call center?
- Operator, supervisor, director
Can we assume operators always get the initial calls?
- Yes
If there is no available operators or the operator can't handle the call, does the call go to the supervisors?
- Yes
If there is no available supervisors or the supervisor can't handle the call, does the call go to the directors?
- Yes
Can we assume the directors can handle all calls?
- Yes
What happens if nobody can answer the call?
- It gets queued
Do we need to handle 'VIP' calls where we put someone to the front of the line?
- No
Can we assume inputs are valid or do we have to validate them?
- Assume they're valid 

Entities
- Operator, supervisor, director (maybe extend some common parent class)
- Call center

Employee
  - Operator extends Employee
  - Supervisor extends Employee
  - Director extends Employee
  - has property available

Call Center
  - has Queue
  - has Employees
  - track which operators are available

*/

class CallCenter {
  constructor() {
    this.operators = [];
    this.supervisors = [];
    this.directors = [];
    this.queue = [];
  }

  hireEmployee(employee) {
    switch(employee.type) {
      case 'operator':
        this.operators.push(employee);
        break;
      case 'supervisor':
        this.supervisors.push(employee);
        break;
      case 'director':
        this.directors.push(employee);
        break;
    }
  }

  fireEmployee(employee) {
    switch(employee.type) {
      case 'operator': {
        const idx = this.operators.indexOf(employee);
        this.operators.splice(idx, 1);
        break;
      }
      case 'supervisor': {
        const idx = this.operators.indexOf(employee);
        this.supervisors.splice(idx, 1);
        break;
      }
      case 'director': {
        const idx = this.operators.indexOf(employee);
        this.directors.splice(idx, 1);
        break;
      }
    }
  }

  receiveCall(call) {
    const availableOperator = this.operators.find(operator => operator.available);
    if (availableOperator) {
      availableOperator.handleCall(call);
      return;
    }

    const availableSupervisor = this.supervisors.find(supervisor => supervisor.available);
    if (availableSupervisor) {
      availableSupervisor.handleCall(call);
      return;
    }

    const availableDirector = this.directors.find(director => director.available);
    if (availableDirector) {
      availableDirector.handleCall(call);
      return;
    }

    this.queue.push(call);
  }
}

class Employee {
  constructor(name) {
    this.available = true;
    this.name = name;
  }

  handleCall() {
    this.available = false;
    const self = this;
    setTimeout(() => self.available = true, 5000);
  }
}

class Operator extends Employee {
  constructor(...args) {
    super(...args);
    this.type = 'operator';
  }
}

class Supervisor extends Employee {
  constructor(...args) {
    super(...args);
    this.type = 'supervisor';
  }
}

class Director extends Employee {
  constructor(...args) {
    super(...args);
    this.type = 'director';
  }
}

class PhoneCall {
  constructor(incomingPhoneNumber) {
    this.incomingPhoneNumber = incomingPhoneNumber;
  }
}

const callCenter = new CallCenter();
callCenter.hireEmployee(new Director('Bob'));
callCenter.hireEmployee(new Supervisor('Alice'));
callCenter.hireEmployee(new Operator('Sarah'));
callCenter.hireEmployee(new Operator('Joe'));
callCenter.hireEmployee(new Operator('Jose'));
callCenter.receiveCall(new PhoneCall('(555) 123-4567'));
callCenter.receiveCall(new PhoneCall('(555) 123-4567'));
callCenter.receiveCall(new PhoneCall('(555) 123-4567'));
callCenter.receiveCall(new PhoneCall('(555) 123-4567'));
callCenter.receiveCall(new PhoneCall('(555) 123-4567'));
callCenter.receiveCall(new PhoneCall('(555) 123-4567'));
console.log(callCenter.operators);
console.log(callCenter.supervisors);
console.log(callCenter.directors);
console.log(callCenter.queue);
