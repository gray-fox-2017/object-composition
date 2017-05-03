"use strict";

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = [];
  }

  bake() {
    this.status = "selesai dimasak"
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

// class DaftarCookies {
//   constructor(file) {
//     this._file = file;
//     var fs = require('fs');
//     this._text = fs.readFileSync(this._file,'utf-8');
//     this.options = this._text.split('\n');
//   }
// }
//
// let daftarCookies = new DaftarCookies('cookies.txt');

class CookieFactory {
  static create(options) {
    let cookie = null;
    if (options === 'peanut butter') {
      return new PeanutButter(options);
    } else if (options === 'chocolate chip') {
      return new ChocholateChip(options);
    } else {
      return new OtherCookie(options);
    }
  }
}

let file = 'cookies.txt';
var fs = require('fs');
let text = fs.readFileSync(file,'utf-8');
let options = text.split('\n');

//console.log(daftarCookies.options);

// let batch_of_cookies = []
// for (let i=0; i<options.length-1;i++) {
//let kue = CookieFactory.create(options[0]);
//   batch_of_cookies.push(kue.cookie);
// }
let batch_of_cookies = options.map(x=> CookieFactory.create(x));
//console.log(kue)
// console.log(batch_of_cookies);
console.log(batch_of_cookies);
