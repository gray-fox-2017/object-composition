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
}


class Ingredient {
  constructor(opt) {
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
// for (let k = 0; k < bahanBahan.length; k++) {
//   for (let l = 0; l < bahanBahan[k].length; l++) {
//     bahanBahan[k][l] = bahanBahan[k][l].split(':');
//   }
// }
let asd = CookieFactory.create(options);
console.log(asd);
// console.log(inOptions);
// console.log(arrIngredients);
// console.log(ingredients);