"use strict"

const fs = require('fs');
let option = fs.readFileSync("cookies.txt", 'utf-8').split("\n");

class Ingredients {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = [];
    this.cookieIngredients();
  }

  bake(){
    this.status = "selesai dimasak";
  }

cookieIngredients(){
  let ingredients = fs.readFileSync('ingredients.txt', 'utf8').split('\n');
  for(let i=0; i<ingredients.length-1; i++){

    ingredients[i] = ingredients[i].split(' = ');
    ingredients[i][1] = ingredients[i][1].split(',');
    let tampung = [];

    for(let j=0; j<ingredients[i][1].length; j++){
      ingredients[i][1][j] = ingredients[i][1][j].split(" : ");
      tampung.push(new Ingredients(ingredients[i][1][j][1].trim(), ingredients[i][1][j][0].trim()));
    }
    if(this.name === ingredients[i][0]){
      this.ingredients = tampung;
    }
  }
}

}

class PeanutButter extends Cookie{
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 150;
  }
}


class CookieFactory {

  static create(newCookie){
    let objCookie = [];
    for (var i = 0; i < newCookie.length-1; i++) {
      if(newCookie[i] === 'peanut butter'){
        objCookie.push(new PeanutButter(newCookie[i]))
      }else if( newCookie[i] ===  'chocolate chip'){
        objCookie.push(new ChocholateChip(newCookie[i]));
      }else {
        objCookie.push(new OtherCookie(newCookie[i]));
      }
    } return objCookie;
  }

 static cookieSuggest(day, arr){
    let sugarFree = arr;
    if(day === 'tuesday'){

      for(let i=sugarFree.length-1; i>= 0; i--){
        for(let j=0; j<sugarFree[i].ingredients.length; j++){
          if(sugarFree[i].ingredients[j].name === 'sugar'){
            sugarFree.splice(i,1);
            break;
          }
        }
      }
    }
    return sugarFree;
  }

}

let batch_of_cookies = CookieFactory.create(option);
// console.log(batch_of_cookies);
// console.log(batch_of_cookies[0]);
console.log(batch_of_cookies[0].ingredients[1]);

let sugarFreeFoods = CookieFactory.cookieSuggest("tuesday", batch_of_cookies);
console.log("-------------------------------------");
console.log("sugar free cakes are :");

for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name)
}
