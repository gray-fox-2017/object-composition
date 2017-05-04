"use strict"

class Cookie {
  constructor(bahan) {
    this.name = null
    this.status = 'mentah'
    this.bahan = this.parsing(bahan)
    //this.Ingredient = par
  }

  parsing(data) {
    let data2 = []
    for (var i = 0; i < data.length; i++) {
        data2.push(new Ingredient(data[i].split(':')))
    }
    //console.log(data[0].split(':'));
    return JSON.stringify(data2)
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, bahan) {
    super(bahan)
    this.name = name
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name, bahan) {
    super(bahan)
    this.name = name
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, bahan) {
    super(bahan)
    this.name = name
    this.other_count = 150

  }
}


class CookieFactory {
  static create(option) {
    let tamp = []
    for (let i = 0; i < option.length; i++) {
      if(option[i] === 'peanut butter' ) {
        let peanut = new PeanutButter(option[i], bahan_akhir[i])
        tamp.push(peanut)
      } else if(option[i] === 'chocolate chip') {
        let cokelat = new ChocholateChip(option[i], bahan_akhir[i])
        tamp.push(cokelat)
      } else {
        let other = new OtherCookie(option[i], bahan_akhir[i])
        tamp.push(other)
      }
    }

    return tamp
  }
}


class Ingredient {
  constructor(opsi) {
    this.name = opsi[1]
    this.banyak = opsi[0]
    //console.log(opsi);
  }
}

const fs = require('fs')
let txtCookies = fs.readFileSync('cookies.txt', 'utf8').split('\n');
let txtBahan = fs.readFileSync('bahan.txt', 'utf8').split('\n');

let bahan_awal = []
let bahan_akhir = []
let bahan_terbaru = []
function updateData() {

    for (let i=0; i<txtBahan.length; i++) {
      bahan_awal.push(txtBahan[i].split(' = '));
    }
    for (let j=0; j<bahan_awal.length; j++) {
      bahan_akhir.push(bahan_awal[j][1].split(','));
    }
    for (let k=0; k<bahan_akhir.length; k++) {
      let coba = []
      for (let l = 0; l<bahan_akhir[k].length; l++) {
        coba.push(bahan_akhir[k][l].split(':'));
      }
      //console.log(coba);
      bahan_terbaru.push(coba)

    }
    //console.log(bahan_terbaru[0][4]); ini data pertama [0][0]
    //console.log(bahan_akhir[0])//.split(':'));

}
updateData()

//test.parsing()

//console.log(options);
let batch_of_cookies = CookieFactory.create(txtCookies)
console.log(batch_of_cookies);
