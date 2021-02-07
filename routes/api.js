const { randomInt } = require('crypto');
var express = require('express');
var router = express.Router();

const fs = require('fs')

const CosmosClient = require("@azure/cosmos").CosmosClient;
const azureConfig = require("../config").azureConfig;
const { endpoint, key, databaseId, containerId } = azureConfig;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);


let fruits = ["la manzana", "el pimiento", "la calabacita", "la zanahoria", "la sandía", "el limón", "la naranja", "la aceituna", "la cereza", "la fresa", "la piña", "el durazno"];
let words = [{ english: "apple", spanish: "la manzana" },
{ english: "carrot", spanish: "la zanahoria" },
{ english: "water melon", spanish: "la sandía" },
{ english: "orange", spanish: "la naranja" },
{ english: "olive", spanish: "la aceituna" },
{ english: "cherry", spanish: "la cereza" },
{ english: "strawberry", spanish: "la fresa" },
{ english: "pineapple", spanish: "la piña" }
];

var previousIndex, newIndex;
var wordsToStudy = 20;

/* GET users listing. */
router.get('/', async function (req, res, next) {

  if(!vocabulary){
    vocabulary = await getItems(wordsToStudy);
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  

  res.send(JSON.stringify(vocabulary[newIndex]));
});

router.get('/vocabulary', async function (req, res, next) {
  let vocabulary = await getItems(wordsToStudy);

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  

  res.send(JSON.stringify(vocabulary));
});



router.get('/upload', async function (req, res, next) {

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(await upload());
});

router.get('/test', async function (req, res, next) {

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  let content = {
    id: 402902,
    english: "cherry",
    spanish: "la cereza",
    studied: 4,
    score: 3
  }
  result = await getData();
  res.send(result);
});



function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getItems(n) {
  const querySpec = {
    query: 'SELECT c.id, c.spanish, c.english from c OFFSET @offset LIMIT @n',
    parameters: [
      { name: "@offset", value: getRandomInt(4, 500) },
      { name: "@n", value: n },
    ]
  };
  const { resources: items } = await container.items.query(querySpec).fetchAll();
  return items;
}

async function getData() {
  console.log(`Querying CosmosDB`);

  // query to return all items
  const querySpec = {
    query: 'SELECT * from c OFFSET @offset LIMIT 10',
    parameters: [{ name: "@offset", value: getRandomInt(4, 500) },
    ]
  };

  // read all items in the Items container
  const { resources: items } = await container.items.query(querySpec).fetchAll();
  let resultString = "";

  items.forEach(item => {
    resultString = resultString + `${item.id} - ${item.spanish} \n`;
  });
  return resultString;
}

module.exports = router;



async function upload() {
  let startID = 4;
  var newItem;
  fs.readFile('public/other/words.txt', async function (err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    for (let i = 0; i < array.length; i = i + 2) {
      newItem = {
        id: pad(startID, 6),
        english: array[i + 1],
        spanish: array[i],
      }
      console.log(JSON.stringify(newItem));
      const { resource: createdItem } = await container.items.create(newItem);
      startID += 1;
    }
  });
}