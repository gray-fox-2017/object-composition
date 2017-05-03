"use strict";

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = new Ingredients(name);
    ;
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class Ingredients {
  constructor(name) {
    if (name === 'peanut butter') {
      this.Flour = 1;
      this.Sugar = 2;
      this.Cinnamon = 1;
      this.Butter = 0.05;
      this.PeanutButter = 2;
    } else if (name === 'chocolate chip') {
      this.Sugar = 1;
      this.Butter = 0.05;
      this.ChocoChips= 1;
    } else if (name === 'chocolate cheese') {
      this.Flour = 1;
      this.Sugar = 2;
      this.Cinnamon = 2;
      this.Butter = 0.06;
    } else if (name === 'chocolate butter') {
      this.Butter = 0.05;
      this.GlutenFreeFlour = 1;
      this.FlavorAdder = 1;
    } else if (name === 'chocolate chips crumbled') {
      this.Flour = 1;
      this.Butter = 0.05;
      this.ChocoChips = 1;
      this.Sugar = 1;
    } else if (name === 'peanut butter crumbled') {
      this.Flour = 1;
      this.Butter = 0.05;
      this.PeanutButter = 2;
      this.Sugar = 2;
    }
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie {
  constructor(name) {
    super(name)
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    this.other_count = 150;
  }
}

class ChocholateChipCrumble extends Cookie {
  constructor(name) {
    super(name);
    this.chocolateChipCrumble_count = 300;
  }
}

class PeanutButterCrumble extends Cookie {
  constructor(name) {
    super(name);
    this.butterCrumble_count = 300;
  }
}

class CookieFactory {
  static create(options) {
    let cookie = null;
    if (options === 'peanut butter') {
      return new PeanutButter(options);
    } else if (options === 'chocolate chip') {
      return new ChocholateChip(options);
    } else if (options === 'chocolate chips crumbled') {
      return new ChocholateChipCrumble(options);
    } else if (options === 'peanut butter crumbled') {
      return new PeanutButterCrumble(options);
    } else {
      return new OtherCookie(options);
    }
  }

  static cookieRecommendation(hari, kue) {
    let list = [];
    for (let i=0; i<kue.length; i++) {
      if (kue[i].ingredients.Sugar === undefined) {
        list.push(kue[i].name);
      }
    }
    return `kue tanpa gula untuk hari ${hari}, adalah: ${list.join(', ')}`
  }
}

let file = 'cookies.txt';
var fs = require('fs');
let text = fs.readFileSync(file,'utf-8');
let options = text.split('\n');

let batch_of_cookies = options.map(x=> CookieFactory.create(x));

console.log(batch_of_cookies);
let sugarFreeCookie = CookieFactory.cookieRecommendation('Selasa', batch_of_cookies);
console.log(sugarFreeCookie);
