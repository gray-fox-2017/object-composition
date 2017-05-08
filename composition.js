"use strict"

class Cookie {
  constructor(name, options){
    this.name = name
    this.status = "mentah"
    this.ingredients = this.parsingIngredients(options, name)
    this.has_sugar = this.hasSugar(this.ingredients)
  }

  parsingIngredients(options, name){
    let arr = []
    for (let i=0; i<options.length-1; i++){
      let nameCake = options[i].split(' = ') // split name of recipe with content
      if(nameCake[0] == name){
        let recipe = nameCake[1].split(', ') // split every ingredient
        for (let j=0; j<recipe.length; j++){
          console.log('------------', options);
          let ing = new Ingredient() // make new object from class Ingredient
          ing.name=recipe[j].split(': ')[1] // ingredient name
          ing.amount=recipe[j].split(': ')[0] // ingredient amount
          if(/sugar/.test(recipe[j].split(': ')[1])){
            ing.has_sugar = true
          } else {
            ing.has_sugar = false
          }
          // arr.push(JSON.stringify(ing)) // show in stringify
          arr.push(ing)
        }
      }
    }
    return arr;
  }

  hasSugar(ingredients){
    let has_sugar_arr = []
    for (let i=0; i<ingredients.length; i++){
      if(ingredients[i].has_sugar){
        has_sugar_arr.push('1')
      }
    }
    return has_sugar_arr.length > 0
  }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(name, options) {
    super(name, options);
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name, options) {
    super(name, options);
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, options) {
    super(name, options);
    this.other_count= 150
  }
}


class Ingredient {
  constructor() {
    this.name = null
    this.amount = null
    this.has_sugar = null
  }
}

class CookieFactory {
  static create(options){
    let arr = []
    for (let i=0; i<options.length-1; i++){
      let nameCake = options[i].split(' = ')
      if(nameCake[0] == 'peanut butter') {
        let peanutButter = new PeanutButter(nameCake[0], options)
        arr.push(peanutButter)
      } else if (nameCake[0] == 'chocolate chip') {
        let chocoChip = new ChocholateChip(nameCake[0], options)
        arr.push(chocoChip)
      } else {
        let otherCookie = new OtherCookie(nameCake[0], options)
        arr.push(otherCookie)
      }
    }
    return arr;
  }

  static cookieRecommendation(nameOfDay, cookies){
    let arr = []
    for (let i=0; i<cookies.length; i++){
      if(!cookies[i].has_sugar){
        let obj = {}
        obj['day'] = nameOfDay
        obj['name'] = cookies[i].name
        arr.push(obj)
      }
    }
    return arr
  }
}

const fs = require('fs')
let options = fs.readFileSync('cookies.txt', 'utf8').split('\n') // list of cookies

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
console.log('sugar free cakes are: ')
for(let i=0; i<sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name)
}
