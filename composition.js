'use strict'

const fs = require('fs')

class Ingredients {
  constructor(option){
    debugger
    this.name = option.name.trim()
    this.ammount = option.ammount.trim()
    this.sugar = this.sugarcheck()
  }
  
  sugarcheck(){
    debugger
    if(this.name === 'sugar'){
      return true
    }
    else{
      return false
    }
  }
}

class Cookie{
    constructor(name,ingredients){
      this.status = 'mentah'
      this.name = name
      this.Ingredients = ingredients
    }
}

class PeanutButter extends Cookie {
  constructor(name,ingredients){
    super(name,ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name,ingredients){
    super(name,ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(name, ingredients){
    super(name,ingredients)
    this.other_count = 150
  }
}

class ChocolateChipCrumbled{
  constructor(name,ingredients){
    
  }
}

class PeanutButterCrumbled{
  constructor(){}
}

class CookieFactory{
  static create(options){
    let splitIngre, splitTitle, cookie,resultCookie = []
    options.pop()
    for (let i = 0; i < options.length; i++){
      splitTitle = options[i].split(' = ')
    //  console.log(splitTitle)
      splitIngre = splitTitle[1].split(', ') 
      
      let ing = []
      for (let j = 0; j < splitIngre.length; j++){
        ing.push(splitIngre[j].split(':'))
      //  console.log(ing)
      }
      
      let objIng = []
      for(let k = 0; k < ing.length; k++){
        debugger
        let newIng = new Ingredients({
          'name': ing[k][1],
          'ammount': ing[k][0],
          'sugar': this.sugar
        })
        objIng.push(newIng)
        // console.log(ing)
        // console.log(newIng)
      }
      if(splitTitle[0] === 'peanut butter'){
        cookie = new PeanutButter('peanut butter', objIng)
      }
      else if(splitTitle[0] === 'chocolate chip'){
        cookie = new ChocolateChip('chocolate chip', objIng)
      }
      else {
        cookie = new OtherCookie('other cookie', objIng)
      }
      resultCookie.push(cookie)
    }
    return resultCookie
  }
  
  static cookieRecomendation(day,cookies){
    let noSugar = []
  
    for(let i = 0; i < cookies.length; i++){
      let containsugar = 0
      for(let j = 0; j < cookies[j].Ingredients.length; j++){
        if(cookies[i].Ingredients[j].sugar === true){
            containsugar ++
            //break;
          }
        }
        if(containsugar === 0){
          noSugar.push(cookies[i])
        }
      }
      return noSugar
   }
}

let options = fs.readFileSync('cookies.txt').toString().split('\n')
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies)
//CookieFactory.cookieRecomendation('selasa',batch_of_cookies)
let sugarFreeFoods = CookieFactory.cookieRecomendation('Tuesday',batch_of_cookies)
console.log('sugar free cakes are :')
for (let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name)
}
