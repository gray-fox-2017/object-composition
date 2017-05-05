"use strict";

class Cookie {
  constructor(arr) {
    this.name = arr[0];
    this.status = "mentah";
    this.ingredients = arr[1].split(',').map(x => x.split(':')).map(x => new Ingredients(x));
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class Ingredients {
  constructor(arr) {
    this.nama = arr[1];
    this.jumlah = arr[0];
  }
}

class PeanutButter extends Cookie {
  constructor(arr) {
    super(arr)
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie {
  constructor(arr) {
    super(arr)
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(arr) {
    super(arr)
    this.other_count = 150;
  }
}

class ChocholateChipCrumble extends Cookie {
  constructor(arr) {
    super(arr);
    this.chocolateChipCrumble_count = 300;
  }
}

class PeanutButterCrumble extends Cookie {
  constructor(arr) {
    super(arr);
    this.butterCrumble_count = 300;
  }
}

class CookieFactory {
  static create(arr) {
    let cookie = null;
    if (arr[0] === 'Peanut Butter') {
      return new PeanutButter(arr);
    } else if (arr[0] === 'Chocolate Chip') {
      return new ChocholateChip(arr);
    } else if (arr[0] === 'Chocolate Chips Crumbled') {
      return new ChocholateChipCrumble(arr);
    } else if (arr[0] === 'Peanut Butter Crumbled') {
      return new PeanutButterCrumble(arr);
    } else {
      return new OtherCookie(arr);
    }
  }

  static cookieRecommendation(hari, kue) {
    let list = [];
    for (let i=0; i<kue.length; i++) {
      let count = 0
      for (let a=0; a<kue[i].ingredients.length; a++) {
        if (kue[i].ingredients[a].nama === 'Sugar') {
          count++
        }
      }
      if (count === 0) {
        list.push(kue[i].name);
      }
    }
    return `kue tanpa gula untuk hari ${hari}, adalah: ${list.join(', ')}`
  }
}

let file = 'cookies.txt';
var fs = require('fs');
let text = fs.readFileSync(file,'utf-8');
let perbaris = text.split('\n');
let options = perbaris.map(x => x.split('='))

let batch_of_cookies = options.map(x=> CookieFactory.create(x));

console.log(batch_of_cookies);
let sugarFreeCookie = CookieFactory.cookieRecommendation('Selasa', batch_of_cookies);
console.log(sugarFreeCookie);

