class CookieFactory {
  static create(file) {
    // let file = "bahan.txt"
    let cookieNames = parseCookieName(file);
    let ingredientNames = parseIngredient(file);

    let arrObjCookies = []
    for (let i = 0; i < cookieNames.length; i++) {
      if (cookieNames[i] == "peanut butter") {
        arrObjCookies.push(new PeanutButter(cookieNames[i], ingredientNames[i]));
      } else if (cookieNames[i] == "chocolate chip") {
        arrObjCookies.push(new ChocolateChip(cookieNames[i], ingredientNames[i]));
      } else {
        arrObjCookies.push(new OtherCookies(cookieNames[i], ingredientNames[i]));
      }
    }
    return arrObjCookies;
  }

  static cookieRecommendation(dayName, cookieObj) {

  }
  // define other methods as needed
}

class Cookie {
  constructor(ingredient) {
    this.status = "mentah"
    if (ingredient != undefined) {
      this.ingredient = ingredient;
    } else {
      return false;
    }

  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(ingredient);
    this.name = name
    this.peanut_butter = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredient) {
    super(ingredient);
    this.name = name
    this.choc_chip_count = 100

  }
}

class OtherCookies extends Cookie{
  constructor (name, ingredient) {
    super(ingredient);
    this.name = name
    this.other_count = 200
  }
}

function parseCookieName(fileName) {
  let fs = require("fs");
  let buf = fs.readFileSync(fileName, 'utf-8');
  let optionsArr = buf.split("\n");

  nameCookieArr = [];
  for (let i = 0; i < optionsArr.length - 1; i++) {
    nameCookieArr.push(optionsArr[i].split("=")[0].trim());
  }
  return nameCookieArr;
}

function parseIngredient(fileName) {
  let fs = require("fs");
  let buf = fs.readFileSync(fileName, 'utf-8');
  let optionsArr = buf.split("\n");

  let ingredientArr = [];
  for (let i = 0; i < optionsArr.length - 1; i++) {
    ingredientArr.push(optionsArr[i].split("=")[1].trim())
  }

  for (let i = 0; i < ingredientArr.length; i++) {
    ingredientArr[i] = ingredientArr[i].split(",");
  }

  for (let i = 0; i < ingredientArr.length; i++) {
    for (let j = 0; j < ingredientArr[i].length; j++) {
      ingredientArr[i][j] = ingredientArr[i][j].trim();
    }
  }
  return ingredientArr;

  // let amount = [];
  // let ingredientName = [];
  // for (let i = 0; i < ingredientArr.length; i++) {
  //   for (let j = 0; j < ingredientArr[i].length; j++) {
  //     amount.push(ingredientArr[i][j].split(":")[0].trim());
  //     ingredientName.push(ingredientArr[i][j].split(":")[1]);
  //   }
  // }
}

function parseIngredientAmount(fileName) {
  let fs = require("fs");
  let buf = fs.readFileSync("bahan.txt", 'utf-8');
  let optionsArr = buf.split("\n");

  nameCookieArr = [];
  ingredientArr = [];
  for (let i = 0; i < optionsArr.length - 1; i++) {
    nameCookieArr.push(optionsArr[i].split("=")[0]);
    ingredientArr.push(optionsArr[i].split("=")[1].trim())
  }

  for (let i = 0; i < ingredientArr.length; i++) {
    ingredientArr[i] = ingredientArr[i].split(",")
  }


  let amount = [];
  let ingredientName = [];
  for (let i = 0; i < ingredientArr.length; i++) {
    for (let j = 0; j < ingredientArr[i].length; j++) {
      amount.push(ingredientArr[i][j].split(":")[0].trim());
      ingredientName.push(ingredientArr[i][j].split(":")[1]);
    }
  }
}

let file = "bahan.txt";
// console.log(parseIngredient(file)[0]);

let batchCookies = CookieFactory.create("bahan.txt")
console.log(batchCookies);

// let ingredients = parseIngredient(file);
//
// let file = "bahan.txt"
// let cookieNames = parseCookieName(file);
// let arrObjCookies = []
// for (let i = 0; i < cookieNames.length; i++) {
//   if (cookieNames[i] == "peanut butter") {
//     arrObjCookies.push(new PeanutButter(cookieNames[i]));
//   } else if (cookieNames[i] == "chocolate chip") {
//     arrObjCookies.push(new ChocolateChip(cookieNames[i]));
//   } else {
//     arrObjCookies.push(new OtherCookies(cookieNames[i]));
//   }
// }

// console.log(arrObjCookies);

// console.log(CookieFactory.create(new PeanutButter()));
