"use strict"

class CookieFactory {
  static create(options) {
    var fs = require('fs');
    var cookiesList = fs.readFileSync(options,'utf8').split("\n");
    // handling whitespace
    cookiesList.pop();
    
    // batch of cookies
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
    console.log(batch_of_cookies);
    return batch_of_cookies;
  }
}

class Cookie {
  constructor (name) {
    this.name = name;
    this.status = 'mentah';
    this.amount = 0;
    this.has_sugar = true;
    this.ingredients = new Ingredients(this);
    this.has_sugar = this.ingredients.is_there_sugar();
    //console.log(this.ingredients.ingredient);
    //this.ingredients = this.ingredients.ingredient;
    this.ingredients = this.ingredients.obtainIngredients();
  }
  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name);
    this.amount = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name);
    this.amount = 200;
  }
}

class OtherCookies extends Cookie {
  constructor(name) {
    super(name);
    this.amount = 150;
  }
}

class Ingredients {
  constructor(options) {
    this.name = options['name'];
    this.ingredient = this.obtainIngredients();
  }

  obtainIngredients () {
    // read ingredient file
    var fs = require ('fs')
    var ingredientList = fs.readFileSync('ingredients.txt','utf8').split("\n");
    
    // handling whitespace
    ingredientList.pop();

    // check the location of ingredients for the cookie
    for (let i=0;i<ingredientList.length;i++) {
      ingredientList[i] = ingredientList[i].split("=");
      if (ingredientList[i][0] === this.name) var cookieIndex = i;
    }

    // move the ingredients to an object
    let ingredient = {};

    ingredientList[cookieIndex][1] = ingredientList[cookieIndex][1].split(", ");
    for (let j=0; j<ingredientList[cookieIndex][1].length; j++) {
      ingredientList[cookieIndex][1][j] = ingredientList[cookieIndex][1][j].split(": ");
      ingredient[ingredientList[cookieIndex][1][j][0]] = ingredientList[cookieIndex][1][j][1];
    }

    return ingredient;
  }

  is_there_sugar() {
    return (!this.ingredient['sugar']) ? false : true;
  }
}
  let batch_of_cookies = CookieFactory.create('cookies.txt');
