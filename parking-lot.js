class ParkingLot {
    /**
     * 
     * @param {Number} numFloors 
     * @param {Array<String>} entries 
     * @param {Array<String>} exits 
     */
    constructor(numFloors, entries, exits){
        const spotsPerFloor = Math.floor(Math.random()*40+10);
        this.floors = new Floor(numFloors).fill(undefined).map(new Floor(spotsPerFloor));
        this.entries = entries.map(sideOfBuilding => new Entry(sideOfBuilding));
        this.exits = exits.map(sideOfBuilding => new Exit(sideOfBuilding));
    }
}

class Floor {
    constructor(numSpots){
        this.spots = new Array(numSpots).fill(undefined).map(new Spot('LARGE'));
        this.display = new DisplayBoard();
        this.terminal = new Terminal();
    }

    setDisplay(message){
        this.display.setMessage(message);
    }

    getDisplay(){
        return this.display.getMessage();
    }

    generateTicket(){
        return this.terminal.generateTicket();
    }
}

class Spot {
    static spotTypes = new Set(['COMPACT', 'LARGE', 'EV']);
    static allowableCarTypes = {
        'COMPACT': new Set(['MOTORCYCLE', 'EV', 'CAR']),
        'LARGE': new Set(['MOTORCYCLE', 'EV', 'CAR', 'TRUCK']),
        'EV': new Set(['EV'])
    };

    constructor(type){
        this.vehicle = null;

        if(!spotTypes.has(type)) return false;
        this.type = type;
    }

    parkVehicle(vehicle){
        if(!this.checkVehicleType(vehicle)) return false;

        this.vehicle = vehicle;
        return true;
    }

    removeVehicle(vehicle){
        if(!this.vehicle) return false;

        this.vehicle = null;
        return true;
    }

    checkVehicleType(vehicle){
        return allowableCarTypes[this.type].has(vehicle.type);
    }
}

class Vehicle {
    constructor(type, licensePlate){
        this.type = type;
        this.licensePlate = licensePlate;
        this.ticket = null;
    }

    storeTicket(ticket){
        this.ticket = ticket;
    }
}

class Opening {
    constructor(sideOfBuilding){
        this.sideOfBuilding = sideOfBuilding;
    }
}

class Entry extends Opening {
    constructor(...args){
        super(...args);
        this.display = new DisplayBoard();
        this.gateOpen = true;
    }

    openGate(){
        this.gateOpen = true;
    }

    closeGate(){
        this.gateOpen = false;
    }

    checkGate(){
        return this.gateOpen;
    }

    setDisplay(message){
        this.display.setMessage(message);
    }

    getDisplay(){
        return this.display.getMessage();
    }
}

class Exit extends Opening {
    constructor(...args){
        super(...args);
        this.terminal = new Terminal();
    }

    generateTicket(){
        return this.terminal.generateTicket();
    }
}

class DisplayBoard {
    constructor(message){
        this.message = message;
    }

    setMessage(message){
        this.message = message;
    }

    getMessage(){
        return this.message;
    }
}

class Ticket {
    constructor(){
        this.startTime = Date.now();
    }

    getStartTime(){
        return this.startTime;
    }
}

class Terminal extends FeeCalculator {
    generateTicket(){
        return new Ticket();
    }
}

class Attendant extends FeeCalculator {}

class FeeCalculator {
    calculateFee(ticket){
        const elapsedTime = (Date.now() - ticket.getStartTime()) / 1000 / 60 / 60;

        if(elapsedTime === 0) return 0;

        let fee = 0;
        // Calculate first hour $4/hr
        if(elapsedTime < 1){
            fee += 4 * elapsedTime;
            elapsedTime = 0;
        } else {
            fee += 4;
            elapsedTime -= 1;
        }

        // Calculate second hour $3.50/hr
        if(elapsedTime < 1){
            fee += 3.5 * elapsedTime;
            elapsedTime = 0;
        } else {
            fee += 3.5;
            elapsedTime -= 1;
        }

        // Calculate remaining hour $2.50/hr
        fee += 2.5 * elapsedTime;

        return fee;
    }
}
