class NutritionFacts {
  private calories: number;
  private servings: number;
  private sugar: number;
  // potentially other info like fat, protein, etc.

  constructor(calories: number, servings: number, sugar: number) {
    this.calories = calories;
    this.servings = servings;
    this.sugar = sugar;
  }

  toString(): string {
    return `Calories: ${this.calories}, Servings: ${this.servings}, Sugar: ${this.sugar}`;
  }
}

class Product {
  private name: string;
  private price: number;
  private inventory: number;
  private nutritionFacts: NutritionFacts;
  private volume: number;
  private identifier: string;

  constructor(name: string, price: number, inventory: number, nutritionFacts: NutritionFacts, volume: number, identifier: string) {
    this.name = name;
    this.price = price;
    this.inventory = inventory;
    this.nutritionFacts = nutritionFacts;
    this.volume = volume;
    this.identifier = identifier;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  isInStock(): boolean {
    return this.inventory > 0;
  }

  decrementStock(amount: number): void {
    if (amount > this.inventory) {
      throw new Error('There is insufficient inventory');
    }
    this.inventory -= amount;
  }

  getNutritionFacts(): NutritionFacts {
    return this.nutritionFacts;
  }

  getVolume(): number {
    return this.volume;
  }

  getIdentifier(): string {
    return this.identifier;
  }

  toString(): string {
    return `${this.name}\n\
Identifier: ${this.identifier}\n\
Price: ${this.price}\n\
In Stock: ${this.isInStock()}\n\
Nutrition Facts: ${this.getNutritionFacts().toString()}\n\
Volume: ${this.volume}\n`;
  }
}

class Payment {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

class PaymentProcessor {
  processPayment(payment: Payment, price: number): void {
    if (payment.getValue() !== price) {
      throw new Error('Payment isn\'t for correct price');
    }
    // process the payment here
  }
}

class VendingMachine {
  private products: Product[];
  private paymentProcessor: PaymentProcessor;

  constructor() {
    this.products = [
      new Product('Coke', 2.50, 10, new NutritionFacts(150, 1, 40), 100, 'A15'),
      new Product('Diet Coke', 2.50, 10, new NutritionFacts(0, 1, 0), 100, 'A16'),
      new Product('Snickers', 3.50, 10, new NutritionFacts(250, 1, 20), 200, 'B8'),
      new Product('M&Ms', 3.00, 10, new NutritionFacts(275, 1, 30), 150, 'B9'),
    ];
    this.paymentProcessor = new PaymentProcessor();
  }

  printProducts(): void {
    for (let i = 0; i < this.products.length; i++) {
      console.log(this.products[i].toString());
    }
  }

  buyProduct(identifier: string, payment: Payment): void {
    const product = this.products.find(product => product.getIdentifier() === identifier);
    if (!product) {
      throw new Error('That product doesn\'t exist');
    }
    if (!product.isInStock()) {
      throw new Error('Product not in stock!');
    }
    this.paymentProcessor.processPayment(payment, product.getPrice());
    product.decrementStock(1);
  }
}

const vendingMachine = new VendingMachine();
vendingMachine.printProducts();
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.buyProduct('B9', new Payment(3));
vendingMachine.printProducts();