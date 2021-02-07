"use strict";
const { randomInt } = require('crypto');

class Helper {
    static pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
      }
      
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
}
