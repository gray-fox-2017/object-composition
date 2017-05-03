const fs = require('fs');
let parsed,cookieIngredients = [],orderList = []
let readFile = () =>{
  parsed = fs.readFileSync('cookies.txt','utf8').split('\n')
  for (let i = 0; i < parsed.length; i++) {
    let temp = parsed[i].split('=')
    orderList.push(temp[0].trim())
    cookieIngredients.push(temp[1].split(','))
  }
}

class Cookie{
  constructor(ingredients){
    this.status = 'mentah';
    this.hasSugar = true;
    this.ingredients = JSON.stringify(ingredients)
  }
  bake(){
    this.status = 'matang'
  }
}

class PeanutButter extends Cookie {
  constructor(ingredients){
    super(ingredients);
    this.name = 'peanut butter';
    this.peanutCount = 50
  }
}

class ChocolateChip extends Cookie {
  constructor(ingredients){
    super(ingredients);
    this.name = 'chocolate chip';
    this.chocochipCount = 100
  }
}

class ChocolateCheese extends Cookie {
  constructor(ingredients){
    super(ingredients);
    this.name = 'chocolate cheese';
    this.cheeseCount = 150
  }
}

class ChocolateButter extends Cookie {
  constructor(ingredients){
    super(ingredients);
    this.name = 'chocolate butter';
    this.butterCount = 200
    this.hasSugar = false
  }
}

class CookieFactory {
  static create(options,ingredients){
    let cookieJar = [],ingredientsArray=[],cookie;
    function prep (options, num=options.length){
      for(let i=0;i<num;i++){
        if(options[i] === 'peanut butter'){
          cookie = new PeanutButter(ingredientsArray[i])
          console.log('Yummy! Peanut butter segera disiapkan');
          cookieJar.push(cookie)
        } else if (options[i] === 'chocolate chip') {
          cookie = new ChocolateChip(ingredientsArray[i])
          console.log('Yummy! Choco chip segera disiapkan');
          cookieJar.push(cookie)
        } else if (options[i] === 'chocolate cheese') {
          cookie = new ChocolateCheese(ingredientsArray[i])
          console.log('Yummy! Choco cheese segera disiapkan');
          cookieJar.push(cookie)
        } else if (options[i] === 'chocolate butter') {
          cookie = new ChocolateButter(ingredientsArray[i])
          console.log('Yummy! Choco butter segera disiapkan');
          cookieJar.push(cookie)
        } else {
          console.log(`Pesanan nomer ${i+1} (${options[i]}) tidak ada di daftar menu`);
        }
      }
    }
    for (let i = 0; i < ingredients.length; i++) {
      let arr = []
      for (let j = 0; j < ingredients[i].length; j++) {
        let temp = ingredients[i][j].split(':');
        let bahan = new Ingredients({content:temp[1],amount:temp[0]})
        arr.push(bahan);
      }
      ingredientsArray.push(arr)
    }
    //console.log(ingredientsArray);
    if (typeof options === 'string'){
      console.log(`Anda memesan: ${options}`);
      options = [options]
      prep(options,1)
    } else {
      console.log(`Anda memesan:`)
      for(let i=0;i<options.length;i++){
        console.log(`${i+1}. ${options[i]}`)
      }
      prep(options)
    }
    return cookieJar
  }

  static cookieRecommendation(day,array){
    let cookieJar=[]
    if(day=='selasa'){
      for(let i=0;i<array.length;i++){
        if(array[i].hasSugar===false){
          cookieJar.push(array[i])
        }
      }
    } else {
      for(let i=0;i<array.length;i++){
        cookieJar.push(array[i])
      }
    }
    return cookieJar
  }
}

class Ingredients {
  constructor(obj){
    this.content=obj.content;
    this.amount=obj.amount
  }
}
//=============================================DRIVER CODE=======================================
readFile()
let batch_of_cookies = CookieFactory.create(orderList,cookieIngredients);
console.log(batch_of_cookies);
console.log('kemudian cookie pertama di-bake sehingga jadi matang');
batch_of_cookies[0].bake();
console.log(batch_of_cookies);
console.log('\n');
let sugarFreeFood = CookieFactory.cookieRecommendation('selasa',batch_of_cookies);
console.log(sugarFreeFood);
