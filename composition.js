const fs = require('fs');
let text = fs.readFileSync('cookies.txt').toString().split("\n")

class Ingredients {
  constructor(){
  }
}

class Cookie {
  constructor() {
    this.status = "mentah"
    this.ingredients = []
    this.name = "";
    this.has_sugar = false;

    // this.show_ingredients = this.ingredients.show_ingredients();
  }
  // checkSugar(){
  //   for (let h = 0; h < this.ingredients.length ; h++){
  //     if (this.ingredients[h] == ){
  //       this.has_sugar = true;
  //       return this
  //     }
  //   }
  // }

  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor() {
    super()
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor() {
    super()
    this.choc_chip_count = 200
  }
  checkSugar(){
    super.checkSugar();
  }
}

class OtherCookie extends Cookie {
  constructor() {
    super()
    this.other_count = 150
  }
  checkSugar(){
    super.checkSugar();
  }
}

class CookieFactory {
  constructor() {
  }
  static create(options){
    let result = [];
    let tmp = {}
    //Split name and ingredients
    for (let i = 0; i < options.length; i++){
      let takeCokiieType = options[i].split("=");
      let takeIngredients = takeCokiieType.splice(-1,1);
      // console.log(takeIngredients[0].split(",").length);
      if (options[i].split("=")[0].trim() == 'peanut butter'){
        tmp = new PeanutButter();
        for (let z = 0; z < takeIngredients[0].split(",").length; z++){
          let tmp_an_ing = new Ingredients()
          tmp_an_ing[takeIngredients[0].split(",")[z].split(":")[0]] = takeIngredients[0].split(",")[z].split(":")[1];
          tmp.ingredients.push(JSON.stringify(tmp_an_ing).trim());
          tmp.name = options[i].split("=")[0].trim()
        }
      } else if (options[i].split("=")[0].trim() == 'chocolate chip'){
        tmp = new ChocolateChip();
        for (let z = 0; z < takeIngredients[0].split(",").length; z++){
          let tmp_an_ing = new Ingredients()
          tmp_an_ing[takeIngredients[0].split(",")[z].split(":")[0]] = takeIngredients[0].split(",")[z].split(":")[1];
          tmp.ingredients.push(JSON.stringify(tmp_an_ing).trim());
          tmp.name = options[i].split("=")[0].trim()
        }
      } else if (options[i].split("=")[0].trim() !== 'chocolate chip' && options[i].split("=")[0].trim() !== 'peanut butter'){
        tmp = new OtherCookie();
        for (let z = 0; z < takeIngredients[0].split(",").length; z++){
          let tmp_an_ing = new Ingredients()
          tmp_an_ing[takeIngredients[0].split(",")[z].split(":")[0]] = takeIngredients[0].split(",")[z].split(":")[1];
          tmp.ingredients.push(JSON.stringify(tmp_an_ing).trim());
          tmp.name = options[i].split("=")[0].trim()
        }
      }
      //push to result;
      result.push(tmp);
    }
    return result;
  }

  static cookieRecomendation(day,batch){
    }

}


let batch_of_cookies = CookieFactory.create(text);
console.log(batch_of_cookies);

// let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies);
// console.log("sugar free cakes are");
// for (let k = 0 ; k < sugarFreeFoods.length; k++){
//   console.log(sugarFreeFoods[i].name);
// }

// console.log(text[0].split(","));
