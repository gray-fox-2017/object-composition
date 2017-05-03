class Ingredient {
  constructor(options){
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar=options['has_sugar']
  }
}

class Cookie {
  constructor(){
    this.status = "mentah";
  }

  bake(){
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor(obj){
    super()
    this.name = obj.name;
    this.ingredients = obj.ingredients;
    this.peanut_count = 100;

  }
}

class ChocolateChip extends Cookie {
  constructor(obj){
    super()
    this.name = obj.name;
    this.ingredients = obj.ingredients;
    this.choc_chip_count = 200;

  }
}

class OtherCookie extends Cookie {
  constructor(obj){
    super();
    this.name = obj.name;
    this.ingredients = obj.ingredients;
    this.other_count = 150;

  }
}


class CookieFactory{
  static create(options){

    let batch = [];
    let n =[];
    let ing=[];
    let cookieName,ingredients;

    options.pop();

    for(let i=0; i< options.length; i++){
      n.push(options[i].match(/(\w+\s\w+)/))
      ing.push(options[i].match(/(\d\s\w+ ?\D+ : +\w+ ?\w+ ?\w+)/g))
      cookieName=n[i][0];
      ingredients=ing.join("").split(",");
      let listIngredients=[];

      //looping for ingredients
      for (let j = 0 ; j < ingredients.length ; j++) {
        let arrSplit = ingredients[j].split(' : '); //split 1cup:flour and others
        let name = arrSplit[1]; //1cup,2cup and others
        let amount = arrSplit[0]; //sugar,butter and others
        let has_sugar = (name === 'sugar') ? true : false;
        let objIngredients = new Ingredient({name: name, amount: amount, has_sugar: has_sugar})
        listIngredients.push(objIngredients);
      }

      //making obj of cookie
      if(cookieName == "chocolate chip") {
        let cookie = new ChocolateChip({name: cookieName, ingredients: listIngredients});
        batch.push(cookie);
      } else if (cookieName == "peanut butter") {
        let cookie = new PeanutButter({name: cookieName, ingredients: listIngredients});
        batch.push(cookie);
      } else if (cookieName.length > 0 ) {
        let cookie = new OtherCookie({name: cookieName, ingredients: listIngredients});
        batch.push(cookie);
      }
  }


  return batch;
}

}

let fs = require('fs')
let options = fs.readFileSync('cookies.txt','utf8').toString().split('\n')

var batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

// let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
// console.log('\n')
// console.log("sugar free cakes are :");
// for(let i=0; i < sugarFreeFoods.length; i++){
//   console.log(sugarFreeFoods[i].name)
// }
