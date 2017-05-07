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
    for(let i = 0; i < this.ingredients.length; i++) {
      if(this.ingredients[i]["name"] == "sugar") {
        return true;
      }
    }
    return false;
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
    if(konten == undefined) {
      return "no recipe found"
    }
    let judulDanIsi = konten.split('=');

    let arr = [];

    let properties = judulDanIsi[1].split(',');

    for(let i = 0; i < properties.length; i++) {
      arr[i] = {};
      let nameAndAmount = properties[i].split(':');
      arr[i]["name"] = nameAndAmount[1].trim();
      arr[i]["amount"] = nameAndAmount[0].trim();
    }
    return arr
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
      cookiesMade[i].fillIngredients();
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
    cookiesMade.fillIngredients();
    cookiesMade.bake();
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

let batch_of_cookies = CookieFactory.create(orders);

batch_of_cookies.push(CookieFactory.create("chocolate cheese"))
console.log(batch_of_cookies)
let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies)
console.log("sugar free cakes are: ")
for(let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name)
}


console.log(batch_of_cookies[0].ingredients)