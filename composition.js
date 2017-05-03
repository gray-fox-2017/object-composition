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
    super()
    this.name = obj.name;
    this.ingredients = obj.ingredients;
    this.other_count = 150;

  }
}


class CookieFactory{
  static create(options){

    let batch = [];
    options.pop();

    //looping for cookies recept
    for (let i = 0 ; i < options.length ; i++) {
      let arrSplit = options[i].split(" = ")
      let cookieName = arrSplit[0]; //peanut butter and others
      let ingredients = arrSplit[1].split(', '); //1 cup : flour, 2 cups (gluten) : sugar, 2 cups : peanut butter, 1 cup : cinnamon, 2 tsp : butter and others
      let listIngredients = [];

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

  // let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesda", batch_of_cookies);
  // console.log("sugar free cakes are :");
  // for(let i=0; i < sugarFreeFoods.length; i++){
  //   console.log(sugarFreeFoods[i].name)
  // }
