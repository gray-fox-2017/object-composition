"use strict"

class Cookie {
  constructor() {
    this.status = "mentah";
    this.crumbled = false;
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class Ingredients {
  constructor(options) {
    let object = this.objectifyIngredients(options)
    this.name = object.name;
    this.amount = object.amount;
    this.has_sugar = object.has_sugar;
  }

  objectifyIngredients(options) {
    let lineYangTepat;
    for(let i = 0; i < ingredients.length; i++) {
      if(ingredients[i].includes(options)) {
        lineYangTepat = ingredients[i];
      }
    }
    let judulDanIsi = lineYangTepat.split('=');
    let isi = judulDanIsi[1].split(',')

    let object = {};
    object.name = [];
    object.amount = [];
    for(let i = 0; i < isi.length; i++) {
      let nameAndAmount = isi[i].split(':')
      object.name.push(nameAndAmount[1].trim())
      object.amount.push(nameAndAmount[0].trim())
    }

    object.has_sugar = true;
    if(!object.name.includes("sugar")) object.has_sugar = false;
    return object;
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
    if(typeof options == "string") {
      return CookieFactory.addSingle(options);
    }
    let cookiesMade = [];
    for(let i = 0; i < options.length; i++) {
      switch (options[i]) {
        case "chocolate chip":
          cookiesMade[i] = new ChocolateChip();
          break;
        case "chocolate chip crumbled":
          cookiesMade[i] = new ChocolateChipCrumbled();
          break;
        case "peanut butter":
          cookiesMade[i] = new PeanutButter();
          break;
        default:
          cookiesMade[i] = new OtherCookie();
          break;
      }
      cookiesMade[i].name = options[i];
      cookiesMade[i].ingredients = new Ingredients(cookiesMade[i].name)
      cookiesMade[i].bake();
    }
    return cookiesMade;
  }

  static addSingle(options) {
    let cookiesMade = ''
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
    cookiesMade.ingredients = new Ingredients(cookiesMade.name)
    cookiesMade.bake();
    return cookiesMade;
  }
  static cookieRecomendation(day, arrayOfCookies) {
    let recommendationResult = [];
    switch (day) {
      case "tuesday":
        for(let i = 0; i < arrayOfCookies.length; i++) {
          if(!arrayOfCookies[i].ingredients.has_sugar) recommendationResult.push(arrayOfCookies[i])
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

let batch_of_cookies = CookieFactory.create(orders);

batch_of_cookies.push(CookieFactory.create("chocolate chip crumbled"))
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies)
console.log("sugar free cakes are: ")
for(let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name)
}

console.log(batch_of_cookies[1].ingredients)

// console.log(batch_of_cookies[0].objectifyIngredients("chocolate butter"))