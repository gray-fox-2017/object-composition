let fs = require("fs");
let buf = fs.readFileSync("bahan.txt", 'utf-8');
let optionsArr = buf.split("\n");

nameCookieArr = [];
ingredientArr = [];
for (let i = 0; i < optionsArr.length - 1; i++) {
  nameCookieArr.push(optionsArr[i].split("=")[0]);
  ingredientArr.push(optionsArr[i].split("=")[1].trim())
}

for (let i = 0; i < ingredientArr.length; i++) {
  ingredientArr[i] = ingredientArr[i].split(",")
}


let amount = [];
let ingredientName = [];
for (let i = 0; i < ingredientArr.length; i++) {
  for (let j = 0; j < ingredientArr[i].length; j++) {
    amount.push(ingredientArr[i][j].split(":")[0].trim());
    ingredientName.push(ingredientArr[i][j].split(":")[1]);
  }
}


// console.log(amount);
console.log(nameCookieArr);
console.log(ingredientArr);
console.log(ingredientName);

// console.log(ingredientArr);
