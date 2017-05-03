'use strict'

const fs = require('fs');
let batch_of_cookies;
let bahan = [];

class Ingredients {
  constructor(name) {
    this._bahan = bahan[name.replace(/\scrumbled/gi,'')];
  }
  get bahan() {
    return this._bahan;
  }
}

class CookieFactory {
  static create(options) {
    let allC = [];
    options.forEach((x)=>{
      let c;
      switch(x) {
        case 'peanut butter' : c = new PeanutButter({ name : x, jenis : 'PeanutButter',crumbled:false}); break;
        case 'chocolate chip' : c = new ChocolateChip({ name : x, jenis : 'ChocolateChip',crumbled:false}); break;
        default : c = new OtherCookie({ name : x, jenis : 'OtherCookie',crumbled:false}); break;
      }
      allC.push(c);
    });
    return allC;
  }

  static cookieRecommendation(datename = 'tuesday', batch_of_cookies) {
    let res = [];
    let reco = [];
    let len_igd = 0;
    switch(datename) {
      case 'sunday' : case 'wednesday':
        //gluten free flour
        reco = batch_of_cookies.filter((x)=>
        {
          len_igd = x.ingredients.length;
          for (let i = 0 ; i < len_igd; i++)
            if (x.ingredients[i].nama === 'gluten free flour') return x;
        }).map((y)=>y.name);
        break;
      case 'monday' : case 'thursday': case 'friday':
        //cinnamon cake
        reco = batch_of_cookies.filter((x)=>
        {
          len_igd = x.ingredients.length;
          for (let i = 0 ; i < len_igd; i++)
            if (x.ingredients[i].nama === 'cinnamon') return x;
        }).map((y)=>y.name);
        break;
      case 'tuesday' :
      //sugar free
        let flag = true;
        reco = batch_of_cookies.filter((x)=>
        {
          flag = true;
          len_igd = x.ingredients.length;

          for (let i = 0 ; i < len_igd; i++)
            if (x.ingredients[i].nama === 'sugar') {
              flag = false;
              break;
            }

          if (flag === true) return x;

        }).map((y)=>y.name);
        break;
      case 'saturday' : case 'monday':
      //chippy cake
      reco = batch_of_cookies.filter((x)=>
      {
        len_igd = x.ingredients.length;
        for (let i = 0 ; i < len_igd; i++)
          if (x.ingredients[i].nama === 'chips') return x;
      }).map((y)=>y.name);
      break;
    }
    return reco;
  }


}

class Cookie {
  constructor(datas) {
    this.jenis = datas.jenis;
    this.name = datas.name;
    this.ingredients = new Ingredients(datas.name).bahan;
    this.status = 'mentah';
    this.crumbled = datas.crumbled;
  }
  bake() {
    this.status = 'selesai dimasak';
  }

}

class ChocolateChipCrumbled {
  constructor(datas) {
    this.name = 'chocolate chip crumbled';
    this.jenis = 'ChocolateChipCrumbled';
    this.crumbled = true;
    this.ingredients = new Ingredients(this.name.replace(/\scrumbled/gi,'')).bahan;
  }
}

class PeanutButterCrumbled {
  constructor() {
    this.name = 'peanut butter crumbled';
    this.jenis = 'PeanutButterCrumbled';
    this.crumbled = true;
    this.ingredients = new Ingredients(this.name.replace(/\scrumbled/gi,'')).bahan;
  }
}

class PeanutButter extends Cookie {
  constructor(args) {
    super(args);
    this.peanut_count = 100;
  }

}

class ChocolateChip extends Cookie {
  constructor(args) {
    super(args);
    this.chocochip_count = 200;
  }

}

class OtherCookie extends Cookie {
  constructor(args) {
    super(args);
    this.other_count = 150;
  }

}


const readFile = (filename) => {
  return fs.readFileSync(filename,'utf8').toString().split('\n');
}




let igds = readFile('bahan.txt');

igds.forEach((x)=> {
  let arr1 = x.split('=');
  let arr2 = arr1[1].split(',');

  let takaran;
  // bahan[arr1[0]] = [];
  bahan[arr1[0]] = [];
  arr2.forEach((y)=>{
    takaran = y.split(':');
    let bhn = {
      nama : takaran[1],
      jml : takaran[0]
    };
    bahan[arr1[0]].push(bhn);
  });
});

// console.log(bahan);
console.log('');

let options = readFile('cookies.txt');
batch_of_cookies = CookieFactory.create(options);
batch_of_cookies.push(new ChocolateChipCrumbled());
batch_of_cookies.push(new PeanutButterCrumbled());

console.log(batch_of_cookies);
console.log('');

let reco = [];
console.log('gluten free flour');
reco = CookieFactory.cookieRecommendation('sunday',batch_of_cookies);
reco.forEach((x)=> console.log(x));
console.log('');


console.log('cinnamon');
reco = CookieFactory.cookieRecommendation('monday',batch_of_cookies);
reco.forEach((x)=> console.log(x));
console.log('');

console.log('sugar free');
reco = CookieFactory.cookieRecommendation('tuesday',batch_of_cookies);
reco.forEach((x)=> console.log(x));
console.log('');

console.log('chips');
reco = CookieFactory.cookieRecommendation('saturday',batch_of_cookies);
reco.forEach((x)=> console.log(x));
console.log('');
