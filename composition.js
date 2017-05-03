"use strict";

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = new Ingredients(name);
    ;
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class Ingredients {
  constructor(name) {
    if (name === 'peanut butter') {
      this.flour = 1;
      this.sugar = 2;
      this.cinnamon = 1;
      this.butter =0.05;
      this.peanutButter = 2;
    } else if (name === 'chocolate chip') {
      this.sugar = 1;
      this.butter =0.05;
      this.chocoChips= 1;
    } else if (name === 'chocolate cheese') {
      this.flour = 1;
      this.sugar = 2;
      this.cinnamon = 2;
      this.butter =0.06;
    } else if (name === 'chocolate butter') {
      this.butter = 0.05;
      this.glutenFreeFlour= 1;
      this.flavorAdder = 1;
    }
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie {
  constructor(name) {
    super(name)
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    let cookie = null;
    if (options === 'peanut butter') {
      return new PeanutButter(options);
    } else if (options === 'chocolate chip') {
      return new ChocholateChip(options);
    } else {
      return new OtherCookie(options);
    }
  }

  static cookieRecommendation(hari, kue) {
    let list = [];
    for (let i=0; i<kue.length; i++) {
      if (kue[i].ingredients.sugar>0) {
        list.push(kue[i].name);
      }
    }
    return `kue tanpa gula untuk hari ${hari}, adalah: ${list.join(', ')}`
  }
}

let file = 'cookies.txt';
var fs = require('fs');
let text = fs.readFileSync(file,'utf-8');
let options = text.split('\n');

let batch_of_cookies = options.map(x=> CookieFactory.create(x));

console.log(batch_of_cookies);
let sugarFreeCookie = CookieFactory.cookieRecommendation('Selasa', batch_of_cookies);
console.log(sugarFreeCookie);
