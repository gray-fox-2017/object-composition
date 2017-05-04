"use strict"
const fs = require("fs");

class Cookie {
  constructor(ingredients) {
    this.name = null;
    this.status = "mentah";
    this.ingredients = this.ingredientsParsing(ingredients);
    this.has_sugar = this.hasSugar();
    // console.log(this.ingredients[1].name);
  }

  bake() {
    this.status = "selesai dimasak"
  }

  ingredientsParsing(resep) {
    let ingArr = [];
    for(let i = 0; i<resep.length; i++) {
      ingArr.push(new Ingredient(resep[i].split(':')));
    }
    // console.log(resep);
    return ingArr;
  }

  hasSugar() {
    if(this.ingredients[1].name === ' sugar') {
      return true;
    } else {
      return false;
    }
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(ingredients);
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(ingredients);
    this.name = name;
    this.choc_chip_count = 200;
  }
}
class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(ingredients);
    this.name = name;
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    let arr = []
    for (let i = 0; i < options.length; i++) {
      if (options[i] === "peanut butter" && arrIngredients[i][0] === 'peanut butter' ) {
        let peanutBut = new PeanutButter(options[i], bahanBahan[i]);
        arr.push(peanutBut)
      } else if (options[i] === "chocolate chip") {
        let chocolateCh = new ChocolateChip(options[i], bahanBahan[i]);
        arr.push(chocolateCh);
      } else {
        let otherCookies = new OtherCookie(options[i], bahanBahan[i]);
        arr.push(otherCookies);
      }
    }
    return arr;
  }

  static cookieRecommendation(day, cookie) {
    let noSugar = []
    for (let i = 0; i < cookie.length; i++) {
      if (cookie[i].has_sugar == false) {
        noSugar.push(cookie[i]);
      }
    }
    return noSugar;
  }
}


class Ingredient {
  constructor(opt) {
    // console.log(opt);
    this.name = opt[1];
    this.amount = opt[0];
  }

  hasSugar() {
    if (this.name === ' sugar') {
      return true;
    }
    else {
      return false;
    }
  }
}


let options = fs.readFileSync("./cookies.txt", 'utf-8').split('\n');
let arrIngredients = [];
let bahanBahan = [];
let inOptions = fs.readFileSync("./ingredients.txt", 'utf-8').split('\n');
for (let i = 0; i < inOptions.length; i++) {
  arrIngredients.push(inOptions[i].split('='));
}
for (let j = 0; j < arrIngredients.length; j++) {
  bahanBahan.push(arrIngredients[j][1].split(','))
}
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies)
console.log('sugar free cakes are :');
for (let m = 0; m < sugarFreeFoods.length; m++) {
  console.log(sugarFreeFoods[m].name);
}
// console.log(JSON.stringify(batch_of_cookies,null,2));
