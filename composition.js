"use strict"

class Ingredients {
    constructor(obj){
      this.name = obj.name;//identify name dari obj
      this.amount = obj.amount;//identify name dari amount
      this.has_sugar = this.isSugar();// return true or false
    }

    isSugar() {
      if (this.name === 'sugar'){
        return true;
      } else {
        return false;
      }
    }
}


class Cookie {
  constructor(ingredients, name) {
    this.name = name;
    this.ingredients = ingredients;
    this.status = "mentah"
  }
}

class PeanutButter extends Cookie {
  constructor(status , ingredients, name) {
    super(status , ingredients, name);
    this.name = 'Peanut Butter'
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(status , ingredients, name) {
    super(status , ingredients, name);
    this.name = 'Chocolate Chip'
    this.peanut_count = 200;
  }
}

class OtherCookies extends Cookie {
  constructor(status , ingredients, name) {
    super(status , ingredients, name);
    this.peanut_count = 300;
  }
}

class CookieFactories {
  static create() {
    const fs = require('fs');
    let arrayCookie = fs.readFileSync('cookies.txt', 'utf8').split('\n');
    arrayCookie.pop()

    let cookieProduct = [], cookieNames = [],cookieIngradients = [],ingredientsList = [], objIngredients = [], listCookies = [];

    for (let i = 0; i < arrayCookie.length; i++) {
      cookieProduct.push(arrayCookie[i].split(' = '));
      // console.log(i +'|||||'+ cookieProduct);
      cookieNames.push(cookieProduct[i][0])
      // console.log(i +'+++++'+ cookieNames);
      cookieIngradients.push(cookieProduct[i][1])
      // console.log(i +'----'+ cookieIngradients);
    }

    for (let i = 0; i < cookieIngradients.length; i++) {
      cookieIngradients[i] = cookieIngradients[i].split(', ');
      objIngredients[i]= [];
      // console.log(objIngredients);
      for (var j = 0; j < cookieIngradients[i].length ; j++) {
        cookieIngradients[i][j] = cookieIngradients[i][j].split(' : ')
        // console.log(cookieIngradients);
        objIngredients[i][j] = new Ingredients({'amount' : cookieIngradients[i][j][0], 'name' : cookieIngradients[i][j][1]})
      }
      // console.log(objIngredients);
    }
    for (var i = 0; i < cookieNames.length; i++) {
      if(cookieNames[i] === 'peanut butter') {
        listCookies.push(new PeanutButter(objIngredients[i]));
      } else if (cookieNames[i] === 'chocolate chip'){
        listCookies.push(new ChocolateChip(objIngredients[i]));
      } else if (cookieNames[i] === 'chocolate cheese'){
        listCookies.push(new OtherCookies(objIngredients[i], 'chocolate cheese'));
      } else if (cookieNames[i] === 'chocolate butter'){
        listCookies.push(new OtherCookies(objIngredients[i], 'chocolate butter'));
      }
    }
  return listCookies;
  }

  static cookieRecomendation(day, batch) {
    let noSugarBatch = [];

    for (var i = 0; i < batch.length; i++) {
      let countSugar = 0;

      for (var j = 0; j < batch[i].length; j++) {

        if(batch[i].ingredients[j].has_sugar == true) {
        countSugar++
        console.log(countSugar);
        }
      }
      if (countSugar === 0) {
      noSugarBatch.push(`${batch[i].name}`)
      }
    }
    return `cookies free Sugar for ${day} :\n ${noSugarBatch.join(', ')}`;
  }

}

// let fs = require('fs')
// let options = fs.readFileSync('cookies.txt').toString().split('\n')

var batch_of_cookies = CookieFactories.create();
console.log(JSON.stringify(batch_of_cookies, null, 2));
// console.log(options);
console.log(CookieFactories.cookieRecomendation('Sunday Evening', batch_of_cookies));

// let sugarFreeFood = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies);
//
// console.log("sugar free cakes are :");
// for (var i = 0; i < sugarFreeFood.length; i++) {
//   console.log(sugarFreeFood[i].name);
// }
