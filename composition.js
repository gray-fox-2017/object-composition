"use strict"

class Cookie {
  constructor(name, list){
    this.name = name
    this.status = "mentah"
    this.ingredients = Ingredients.recipe(name, list)
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class Ingredients {
  static recipe(name, list){
    for (let i =0; i<list.length-1; i++){
      let resep = list[i].split(' = ')
      if(resep[0] == name){
        return resep[1]
      } else {
        continue
      }
    }
  }
}

class PeanutButter extends Cookie {
  constructor(name, list) {
    super(name, list);
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name, list) {
    super(name, list);
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, list) {
    super(name, list);
    this.other_count= 150
  }
}

class CookieFactory {
  static create(options, listResep){
    let arr = []
    for (let i=0; i<options.length-1; i++){
      if(options[i] == 'peanut butter') {
        let peanutButter = new PeanutButter(options[i], listResep)
        arr.push(peanutButter)
      } else if (options[i] == 'chocolate chip') {
        let chocoChip = new ChocholateChip(options[i], listResep)
        arr.push(chocoChip)
      } else {
        let otherCookie = new OtherCookie(options[i], listResep)
        arr.push(otherCookie)
      }
    }
    return arr;
  }
}

const fs = require('fs')
let options = fs.readFileSync('cookies.txt', 'utf8').split('\n') // list of cookies
let recipes = fs.readFileSync('recipe.txt', 'utf8').split('\n') // list of recipe
// console.log(options)
// console.log(recipes)

let batch_of_cookies = CookieFactory.create(options, recipes)
console.log(batch_of_cookies)
