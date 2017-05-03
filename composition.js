class CookieFactory {
  static create(options) {
    let fs = require("fs");
    let buf = fs.readFileSync(options, 'utf-8');
    let optionsArr = buf.split("\n");

    let tampArr = []
    for (let i = 0; i < optionsArr.length - 1 ; i++) {
      if (optionsArr[i] == "peanut butter") {
        tampArr.push(new PeanutButter("peanut butter"))
      } else if (optionsArr[i] == "chocolate chip") {
        tampArr.push(new ChocolateChip("chocolate chip"))
      } else {
        tampArr.push(new OtherCookies())
      }
    }
    return tampArr;
  }
  // define other methods as needed
}

class Cookie {
  constructor() {
    this.status = "mentah"
    this.ingredient = []
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super();
    this.name = name
    this.peanut_butter = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super();
    this.name = name
    this.peanut_count = 100

  }
}

class ChocolateButter extends Cookie{
  constructor (name) {
    super();
    this.name = name
    this.choc_butter = 200
  }
}

class OtherCookies extends Cookie{
  constructor (name) {
    super();
    this.name = name
    this.other_count = 200
  }
}




console.log(CookieFactory.create("cookies.txt"));
