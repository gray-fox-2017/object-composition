"use strict"

class Cookie {
  constructor() {
    this.name = '';
    this.status = "mentah"
    this.ingredients = [];
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor() {
    super();
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor() {
    super();
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor() {
    super();
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    let cookiesMade;
    switch (options) {
      case "chocolate chip":
        cookiesMade = new ChocolateChip();
        break;
      case "peanut butter":
        cookiesMade = new PeanutButter();
        break;
      default:
        cookiesMade = new OtherCookie();
        break;
    }
    return cookiesMade;
  }
}

let fs = require("fs");

let orders = fs.readFileSync("cookies.txt", "utf-8");
orders = orders.split('\n')

let batch_of_cookies = [];
for(let i = 0; i < orders.length - 1; i++) {
  batch_of_cookies.push(CookieFactory.create(orders[i]))
  batch_of_cookies[i].name = orders[i];
}

console.log(batch_of_cookies)
