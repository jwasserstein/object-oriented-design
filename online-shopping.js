class ShoppingSystem {
    constructor(){
        this.products = [];
        this.users = [];
        this.sellers = [];
    }
}

class Account {
    constructor(userName){
        this.joinDate = Date.now();
        this.userId = Math.floor(Math.random()*10000);
        this.userName = userName;
    }
}

class UserAccount extends Account{
    constructor(...args){
        super(...args);
        this.cart = new Cart();
        this.orderHistory = [];
    }

    placeOrder(payment, shippingInfo){
        const products = this.cart.getProducts();
        this.orderHistory.push(new Order(products, shippingInfo, payment));
    }

    cancelOrder(orderId){
        const orderToCancel = this.orderHistory.find(order => order.orderId === orderId);
        if(!orderToCancel) return false; // invalid order id

        const shippingInfo = orderToCancel.getShippingInfo();
        if(shippingInfo.isShipped()) return false; // can't cancel already-shipped order

        this.orderHistory.filter(order => order.orderId !== orderId);
    }
}

class SellerAccount extends Account {
    constructor(...args){
        super(...args);
        this.products = [];
    }

    addProduct(product){
        this.productIds.push(product);
    }

    removeProduct(productId){
        const productToRemove = this.products.find(product => product.productId === productId);
        if(!productToRemove) return false; // invalid order id

        this.products.filter(product => product.productId !== productId);
    }
}

class GuestUser {
    constructor(){
        this.cart = new Cart();
    }

    getCart(){
        return this.cart;
    }
}

class Search {
    constructor(){
        this.searchResults = [];
    }
}

class SearchByName extends Search {
    constructor(nameSearchCriteria){
        super();
        this.nameSearchCriteria = nameSearchCriteria;
    }

    executeSearchCriteria(){
        console.log(`Couldn't find anything by name: ${this.nameSearchCriteria}`);
    }
}

class SearchByCategory extends Search {
    constructor(categorySearchCriteria){
        super();
        this.categorySearchCriteria = categorySearchCriteria;
    }

    executeSearchCriteria(){
        console.log(`Couldn't find anything by category: ${this.categorySearchCriteria}`);
    }
}

class Cart {
    constructor(){
        this.cart = [];
    }

    addProduct(product){
        this.cart.push(product);
    }

    removeProduct(productId){
        this.cart.filter(product => product.getProductId() !== productId);
    }

    getProducts(){
        return this.cart;
    }
}

class Notification {
    constructor(message){
        this.message = message;
        this.read = false;
    }

    isRead(){
        return this.read;
    }

    getMessage(){
        this.read = true;
        return this.message;
    }
}

class ShippingInfo {
    constructor(shippingAddress, shippingName){
        this.shippingAddress = shippingAddress;
        this.shippingName = shippingName;
        this.shipped = false;
        this.trackingNumber = Math.floor(Math.random()*10000000);
        this.notifications = [];
    }

    addNotification(message){
        this.notifications.push(new Notification(message));
    }

    isShipped(){
        return this.shipped;
    }

    ship(){
        this.shipped = true;
    }
}

class Order {
    constructor(products, shippingInfo, payment){
        this.products = products;
        this.shippingInfo = shippingInfo;
        this.payment = payment;
        this.orderId = Math.floor(Math.random()*100000);
    }

    getShippingInfo(){
        return this.shippingInfo;
    }
}

class Product {
    constructor(productId, description, photoLink){
        this.productId = productId;
        this.description = description;
        this.photoLink = photoLink;
        this.reviews = [];
        this.rating = [];
    }

    addReview(description){
        this.reviews.push(new Review(description));
    }

    addRating(rating){
        this.rating.push(new Rating(rating));
    }

    getProductId(){
        return this.productId;
    }
}

class Review {
    constructor(description){
        this.description = description;
    }

    getDescription(){
        return this.description;
    }
}

class Rating {
    constructor(rating){
        this.rating = rating;
    }

    getRating(){
        return this.rating;
    }
}

class Payment {
    constructor(billingAddress, billingName, subTotal, tax, shipping){
        this.billingAddress = billingAddress;
        this.billingName = billingName;
        this.subTotal = subTotal;
        this.tax = tax;
        this.shipping = shipping;
    }
}

class CreditPayment extends Payment {
    constructor(cardNumber, expDate, securityNumber, ...args){
        super(...args);
        this.cardNumber = cardNumber;
        this.expDate = expDate;
        this.securityNumber = securityNumber;
    }
}

class BankPayment extends Payment {
    constructor(accountNumber, routingNumber, ...args){
        super(...args);
        this.accountNumber = accountNumber;
        this.routingNumber = routingNumber;
    }
}