let a = new Date("Mon Jan 24 2022 17:55:15 GMT+0530").getTime();
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
let z = 16;
let f = 21;
// Compute years
// let news = a.getTime() + 60000;
// let nate = new Date(news);
console.log("1" + z + f);
let nam = {
  as: "12",
  sa: "32",
  fa: [1, 2, 3, 4],
};
let req = {
  as: "64",
};
nam = { ...nam, ...req };
console.log(nam.fa[2]);
let cun = {
  a: "c",
  a: "f",
};
delete cun.a;
console.log(cun);
