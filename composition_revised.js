const fs = require('fs');
let text = fs.readFileSync('cookies.txt').toString().split("\n")

class Ingredients {
  constructor(name,amount) {
    this.name = name;
    this.amount = amount;
  }
}

class Cookie {
  constructor() {
    this.status = "mentah"
    this.ingredients = []
    this.name = "";
    this.has_sugar = false;
  }
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
}

class OtherCookie extends Cookie {
  constructor() {
    super()
    this.other_count = 150
  }
}

class CookieFactory {
  constructor() {
  }

  static create(input){
    this.result = [];
    this.tmp = {};
    for (let i = 0; i < input.length - 1; i++){
      if (input[i].split("=")[0].trim() == 'peanut butter'){
        this.tmp = new PeanutButter();
        this.tmp.name = input[i].split("=")[0].trim();
        for (let j = 0; j < input[i].split("=")[1].split(",").length; j++){
          let tmp_an_ing = {};
          tmp_an_ing = new Ingredients(input[i].split("=")[1].split(",")[j].split(":")[1],input[i].split("=")[1].split(",")[j].split(":")[0])
          this.tmp.ingredients.push(JSON.stringify(tmp_an_ing));
        }
      } else if (input[i].split("=")[0].trim() == 'chocolate chip'){
        this.tmp = new ChocolateChip();
        this.tmp.name = input[i].split("=")[0].trim()
        for (let j = 0; j < input[i].split("=")[1].split(",").length; j++){
          let tmp_an_ing = {};
          tmp_an_ing = new Ingredients(input[i].split("=")[1].split(",")[j].split(":")[1],input[i].split("=")[1].split(",")[j].split(":")[0])
          this.tmp.ingredients.push(JSON.stringify(tmp_an_ing));
        }
      } else if (input[i].split("=")[0].trim() !== 'chocolate chip' && input[i].split("=")[0].trim() !== 'peanut butter'){
        this.tmp = new OtherCookie();
        this.tmp.name = input[i].split("=")[0].trim();
        for (let j = 0; j < input[i].split("=")[1].split(",").length; j++){
          let tmp_an_ing = {};
          tmp_an_ing = new Ingredients(input[i].split("=")[1].split(",")[j].split(":")[1],input[i].split("=")[1].split(",")[j].split(":")[0])
          this.tmp.ingredients.push(JSON.stringify(tmp_an_ing));
        }
      }
      this.result.push(this.tmp);
    }
    return this.result
  }

  static cookieRecomendation(day,batch){
    if (day == "tuesday"){
      for (let k = 0; k < batch.length; k++){
        for (let l = 0; l < batch[k].ingredients.length; l++){
          if (JSON.parse(batch[k].ingredients[l]).name.match(/sugar/g) ){
            batch[k].has_sugar = true;
          }
        }
      }
      for (let h = 0; h < batch.length; h++){
        if (batch[h].has_sugar == false){
          return batch[h].name;
        }
      }
    } else {
      return batch;
    }
  }
}

let batch_of_cookies = CookieFactory.create(text);
console.log(batch_of_cookies);
console.log("Sugar free cake are ");
console.log(CookieFactory.cookieRecomendation("tuesday",batch_of_cookies));
