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
      batch_of_cookies[i].bake();
    }
    return batch_of_cookies;
  }
  
  static cookieRecommendation (day, batch_of_cookies) {
    let sugarFreeFoods = [];
    debugger
    if (day.toLowerCase() === "tuesday") {
      for (let i=0; i<batch_of_cookies.length;i++) {
        if (batch_of_cookies[i].ingredients.has_sugar === false) {
          sugarFreeFoods.push(batch_of_cookies[i].name);
        }
      }
    }
    return sugarFreeFoods;
  }
}


class Cookie {
  constructor (name) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = new Ingredients(this);
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
  constructor(options) {
    this.name = options['name'];
    this.amount = options['amount'];
    this.obtainIngredients();
    this.has_sugar = this.is_there_sugar();
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
    this.name = [];
    this.amount = [];

    ingredientList[cookieIndex][1] = ingredientList[cookieIndex][1].split(", ");
    
    for (let j=0; j<ingredientList[cookieIndex][1].length; j++) {
      ingredientList[cookieIndex][1][j] = ingredientList[cookieIndex][1][j].split(": ");
      ingredient[ingredientList[cookieIndex][1][j][0]] = ingredientList[cookieIndex][1][j][1];
    }

    for (let key in ingredient) {
      this.name.push(key);
      this.amount.push(ingredient[key]);
    }
  }

  is_there_sugar() {
    return (this.name.includes('sugar')) ? true : false;
  }
}


let batch_of_cookies = CookieFactory.create('cookies.txt');
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are: ");
for (let i=0; i<sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i]);
}
