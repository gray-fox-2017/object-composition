"use strict"

class Cookie {
  constructor() {
    this.name = '';
    this.status = "mentah";
    this.ingredients = this.fillIngredients();
    this.has_sugar = true;
    this.crumbled = false;
  }

  bake() {
    this.status = "selesai dimasak"
  }

  fillIngredients() {
    this.ingredients = new Ingredients(this.name)
    this.ingredients = this.ingredients.component;

    this.has_sugar = this.sugarContent();
  }

  sugarContent() {
    if(this.ingredients["sugar"] !== undefined) {
      return true;
    } else return false;
  }
}

class Ingredients {
  constructor(typeOfCookie) {
    this.name = typeOfCookie;
    this.component = this.ingredientObject();
  }

  correctContent() {
    let lineYangTepat;
    for(let i = 0; i < ingredients.length; i++) {
      if(ingredients[i].includes(this.name)) {
        lineYangTepat = ingredients[i];
      }
    }
    return lineYangTepat;
  }

  ingredientObject() {
    let konten = this.correctContent();
    let judulDanIsi = konten.split('=');

    let obj = {};
    let properties = judulDanIsi[1].split(',');
    properties.forEach(function(property) {
      var tup = property.split(':');
      obj[tup[1].trim()] = tup[0].trim();
    });
    return obj
  }
}

class PeanutButter extends Cookie {
  constructor() {
    super();
    this.peanut_count = 100;
  }
}

class PeanutButterCrumbled extends PeanutButter {
  constructor() {
    super();
    this.crumbled = true;
  }
}

class ChocolateChip extends Cookie {
  constructor() {
    super();
    this.choc_chip_count = 200;
  }
}

class ChocolateChipCrumbled extends PeanutButter {
  constructor() {
    super();
    this.crumbled = true;
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
      case "chocolate chip crumbled":
        cookiesMade = new ChocolateChipCrumbled();
        break;
      case "peanut butter":
        cookiesMade = new PeanutButter();
        break;
      default:
        cookiesMade = new OtherCookie();
        break;
    }
    cookiesMade.name = options;
    cookiesMade.fillIngredients();
    return cookiesMade;
  }

  static cookieRecomendation(day, arrayOfCookies) {
    let recommendationResult = [];
    switch (day) {
      case "tuesday":
        for(let i = 0; i < arrayOfCookies.length; i++) {
          if(!arrayOfCookies[i].has_sugar) recommendationResult.push(arrayOfCookies[i])
        }
        break;
      default:
    }
    return recommendationResult;
  }
}

let fs = require("fs");

let orders = fs.readFileSync("cookies.txt", "utf-8");
let ingredients = fs.readFileSync("ingredients.txt", "utf-8");
orders = orders.split('\n');
ingredients = ingredients.split('\n');

let batch_of_cookies = [];
for(let i = 0; i < orders.length; i++) {
  batch_of_cookies.push(CookieFactory.create(orders[i]))
}

batch_of_cookies.push(CookieFactory.create("chocolate chip crumbled"))
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies)
console.log("sugar free cakes are: ")
for(let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name)
}