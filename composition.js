"use strict"
const fs = require('fs');
let text = fs.readFileSync('cookies.txt').toString().split("\n")

class Cookie {
  constructor() {
    this.status = "mentah"
  }
  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor() {
    super()
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor() {
    super()
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor() {
    super()
    this.other_count = 150
  }
}

class CookieFactory {
  constructor() {
  }
  static create(options){
    let result = [];
    let tmp = {}
    for (let i = 0; i < options.length; i++){
      if (options[i] == 'peanut butter'){
        tmp = new PeanutButter();
      } else if (options[i] == 'chocolate chip'){
        tmp = new ChocolateChip();
      } else if (options[i] !== 'chocolate chip' && options[i] !== 'peanut butter'){
        tmp = new OtherCookie();
      }
      //push to result;
      result.push(tmp);
    }
    return result;
  }
}


let batch_of_cookies = CookieFactory.create(text);
console.log(batch_of_cookies);

// console.log(text[1]);
