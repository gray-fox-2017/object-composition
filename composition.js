"use strict"
//Super Class
class Cookie {
    constructor(name,option) {
        this.name = name;
        this.status = "mentah";
        this.ingredients = this.parsingIngredients(option, name);
        this.has_sugar = this.has_sugar(this.ingredients);
    }

    bake() {
        this.status = "Selesai dimasak";
    }

    parsingIngredients(option, name){
        let arr = []
        for (let i=0; i<option.length-1; i++){
            let Cake = option[i].split(' = ');;
            if(Cake[0] == name){
                let recipe = Cake[1].split(', '); // split untuk coma nya
                for (let j=0; j<recipe.length; j++){
                    let resep = new Ingredient(option);
                    resep.name=recipe[j].split(': ')[1];
                    resep.amount=recipe[j].split(': ')[0];
                    if(/sugar/.test(recipe[j].split(': ')[1])){
                        resep.has_sugar = true
                    } else {
                        resep.has_sugar = false
                    }
                    arr.push(resep);
                }
            }
        }
        return arr;
    }

    has_sugar(ingredients){
        let has_sugar_arr = []
        for (let i=0; i<ingredients.length; i++){
            if(ingredients[i].has_sugar){
                has_sugar_arr.push('1')
            }
        }
        return has_sugar_arr.length > 0
    }

}


//Child Class
class PenautButter extends Cookie{
    constructor(name,option){
        super(name,option);
        this.Penaut_butter = 100;
    }
}
//Child Class
class ChocholateChip extends Cookie{
    constructor(name,option){
        super(name,option);
        this.choc_chip_count = 200;
    }
}
//Child Class
class OtherCookie extends Cookie{
    constructor(name,option){
        super(name,option);
        this.Other_Cookies = 150;
    }

}

class CookieFactory {
    static create(option) {
        let Hasil = [];
        for (let i = 0; i < option.length - 1; i++) {
            let Cake = option[i].split(' = ');
            if (Cake[0] == 'peanut butter') {
                let peanutButter = new PenautButter(Cake[0], option)
                Hasil.push(peanutButter)
            } else if (Cake[0] == 'chocolate chip') {
                let chocoChip = new ChocholateChip(Cake[0], option)
                Hasil.push(chocoChip)
            } else {
                let otherCookie = new OtherCookie(Cake[0], option)
                Hasil.push(otherCookie)
            }
        }
        return Hasil;
    }

    static cookie_Recommendation(Day, Cookies) {
        let arrcheck = [];
        for (let i = 0; i < Cookies.length; i++) {
            if (!Cookies[i].has_sugar) {
                let obj = {}
                obj['day'] = Day
                obj['name'] = Cookies[i].name
                arrcheck.push(obj)
            }
        }
        return arrcheck
    }
}

class Ingredient{
    constructor(option){
        this.name = option["name"];
        this.amount = option["amount"];
        this.has_sugar = option["has_sugar"];
    }
}

let fs = require("fs");
var tmp = fs.readFileSync("cookies.txt","utf-8").split("\n");

let batch_of_cookies = CookieFactory.create(tmp);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookie_Recommendation('tuesday', batch_of_cookies)
console.log('sugar free cakes are: ')
for(let i=0; i<sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}