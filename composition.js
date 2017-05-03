"use strict"

class CookieFactory {
  static create(options) {
    var fs = require('fs');
    var cookiesList = fs.readFileSync(options,'utf8').split("\n");
    // handling whitespace
    cookiesList.pop();
    let batch_of_cookies = [];
    for (let i=0; i<cookiesList.length;i++){
      switch(cookiesList[i]) {
        case "peanut butter" : 
          let peanut_butter = new PeanutButter(cookiesList[i]);
          batch_of_cookies.push(peanut_butter);
        break;
        case "chocolate chip" :
          let chocolate_chip = new ChocolateChip(cookiesList[i]);
          batch_of_cookies.push(chocolate_chip);
        break;
        default:
          let other_cookies = new OtherCookies(cookiesList[i]);
          batch_of_cookies.push(other_cookies);
      }
    }
    return batch_of_cookies;
  }
}

class Cookie {
  constructor (name) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = [];
  }
  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

class OtherCookies extends Cookie {
  constructor(name) {
    super(name);
    this.other_count = 150;
  }
}

class Ingredients {
  constructor(file) {
    var fs = require ('fs')
    var ingredientList = fs.readFileSync(file,'utf8').split("\n");
    // handling whitespace
    ingredientList.pop();
    for (let i=0;i<ingredientList.length;i++){
      ingredientList[i] = ingredientList[i].split("=");
      ingredientList[i][1] = ingredientList[i][1].split(", ");
      console.log(ingredientList[i].includes('sugar'));
    }
    console.log(ingredientList);
  }
}
let batch_of_cookies = CookieFactory.create('cookies.txt');
console.log(batch_of_cookies);
let ingredientList = new Ingredients('ingredients.txt');
