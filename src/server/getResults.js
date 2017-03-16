const mongodb = require('mongodb');
const Promise = require('promise');

const MongoClient = mongodb.MongoClient;

const getResults = (mongoUrl, limit, queries) => {

  // fake json data generated from http://www.json-generator.com/#
  return [{
    collection: 'collection1',
    data: [{
      "_id": "58caec79d1aa737c5ae3720c",
      "index": 0,
      "guid": "9630aab6-af81-4473-a8f5-097a029938d9",
      "isActive": false,
      "balance": "$2,683.40",
      "picture": "http://placehold.it/32x32",
      "age": 38,
      "eyeColor": "brown",
      "name": "Cross Dixon",
      "gender": "male",
      "company": "DAISU",
      "email": "crossdixon@daisu.com",
      "phone": "+1 (925) 479-3655",
      "address": "355 Tillary Street, Matheny, Nevada, 3050",
      "about": "Qui labore laboris magna occaecat id nisi in. Nostrud sit excepteur deserunt in occaecat incididunt. Dolore sunt laboris adipisicing quis cupidatat dolore aliquip fugiat et veniam amet. Ex officia deserunt ullamco officia duis deserunt.\r\n",
      "registered": "2016-03-23T02:40:03 +05:00",
      "latitude": -49.334864,
      "longitude": -160.497572,
      "tags": ["duis", "aliqua", "dolore", "dolor", "esse", "est", "nulla"],
      "friends": [{"id": 0, "name": "Natasha Nash"}, {"id": 1, "name": "Sykes Mayer"}, {
        "id": 2,
        "name": "Waller Atkins"
      }],
      "greeting": "Hello, Cross Dixon! You have 1 unread messages.",
      "favoriteFruit": "strawberry"
    }, {
      "_id": "58caec7941468f9d4398bae1",
      "index": 1,
      "guid": "5fb86330-8eba-4dbe-a81e-03d0a15e00df",
      "isActive": true,
      "balance": "$3,162.53",
      "picture": "http://placehold.it/32x32",
      "age": 31,
      "eyeColor": "blue",
      "name": "Waters Dillon",
      "gender": "male",
      "company": "NAMEBOX",
      "email": "watersdillon@namebox.com",
      "phone": "+1 (932) 503-2288",
      "address": "326 Johnson Avenue, Summertown, Indiana, 9647",
      "about": "Ea velit sunt sit minim exercitation pariatur officia quis eiusmod Lorem adipisicing id. Enim nisi sunt cupidatat elit excepteur mollit voluptate tempor occaecat. Ullamco aliqua officia eu sint occaecat minim qui. Dolor est deserunt voluptate enim. Est ullamco cillum consectetur ipsum proident reprehenderit elit commodo occaecat est excepteur elit labore tempor.\r\n",
      "registered": "2016-12-11T04:09:26 +06:00",
      "latitude": -51.232567,
      "longitude": -5.149415,
      "tags": ["consequat", "tempor", "quis", "do", "proident", "consequat", "est"],
      "friends": [{"id": 0, "name": "Nash Rutledge"}, {"id": 1, "name": "Denise Davidson"}, {
        "id": 2,
        "name": "Cora Underwood"
      }],
      "greeting": "Hello, Waters Dillon! You have 7 unread messages.",
      "favoriteFruit": "apple"
    }, {
      "_id": "58caec79d059a6bf70f5e3ba",
      "index": 2,
      "guid": "d010a423-9171-4f3e-a58a-b4acda46fb9b",
      "isActive": true,
      "balance": "$2,576.06",
      "picture": "http://placehold.it/32x32",
      "age": 34,
      "eyeColor": "brown",
      "name": "Tammy Hansen",
      "gender": "female",
      "company": "QUIZKA",
      "email": "tammyhansen@quizka.com",
      "phone": "+1 (943) 501-3571",
      "address": "636 Belvidere Street, Delwood, Alabama, 4727",
      "about": "Labore labore pariatur culpa sit fugiat ex aliquip ad ad cupidatat. Eu commodo mollit aliquip elit magna ipsum pariatur. Ullamco quis qui eiusmod duis culpa laboris commodo irure est voluptate officia dolor. Anim ex deserunt cillum duis culpa id ut aute laboris eiusmod nisi.\r\n",
      "registered": "2014-12-20T02:10:33 +06:00",
      "latitude": -48.229683,
      "longitude": 94.926795,
      "tags": ["cillum", "dolor", "velit", "fugiat", "proident", "ea", "duis"],
      "friends": [{"id": 0, "name": "Deana Pierce"}, {"id": 1, "name": "Yvonne Williamson"}, {
        "id": 2,
        "name": "Graham Randall"
      }],
      "greeting": "Hello, Tammy Hansen! You have 10 unread messages.",
      "favoriteFruit": "apple"
    }]
  },
    {
      collection: 'collection2',
      data: [
        {
          "_id": "58caec797d0bbb01c8357528",
          "index": 3,
          "guid": "bb0570ad-76dc-4ce3-9578-e5c825a045b3",
          "isActive": true,
          "balance": "$2,980.08",
          "picture": "http://placehold.it/32x32",
          "age": 20,
          "eyeColor": "brown",
          "name": "Chaney Conrad",
          "gender": "male",
          "company": "QUORDATE",
          "email": "chaneyconrad@quordate.com",
          "phone": "+1 (953) 444-3847",
          "address": "597 Conover Street, Bentley, Rhode Island, 9026",
          "about": "Minim amet id dolor nisi proident pariatur deserunt. Sunt nostrud sint commodo ullamco qui ipsum do eu minim. Ipsum tempor id nulla qui aute sunt sint anim do. Quis ullamco excepteur laborum esse aliqua duis adipisicing labore culpa in irure cillum nostrud aliqua. Eu nulla sunt tempor voluptate velit occaecat est Lorem deserunt magna ipsum amet aute. Deserunt irure amet cillum irure fugiat elit amet labore sunt.\r\n",
          "registered": "2014-08-19T05:20:19 +05:00",
          "latitude": -33.888167,
          "longitude": 104.580143,
          "tags": ["minim", "quis", "labore", "consequat", "consectetur", "cupidatat", "enim"],
          "friends": [{"id": 0, "name": "Lara Dunn"}, {"id": 1, "name": "Haney Kramer"}, {
            "id": 2,
            "name": "Rene Bender"
          }],
          "greeting": "Hello, Chaney Conrad! You have 6 unread messages.",
          "favoriteFruit": "strawberry"
        }, {
          "_id": "58caec794120b37756e890e4",
          "index": 4,
          "guid": "a645cb5f-d72e-420f-beae-a55fa7741c83",
          "isActive": false,
          "balance": "$3,018.27",
          "picture": "http://placehold.it/32x32",
          "age": 35,
          "eyeColor": "brown",
          "name": "Ochoa Dillard",
          "gender": "male",
          "company": "QABOOS",
          "email": "ochoadillard@qaboos.com",
          "phone": "+1 (853) 402-2189",
          "address": "674 Landis Court, Bluffview, Oregon, 7324",
          "about": "Labore reprehenderit amet aliquip ex ipsum nostrud ullamco magna nulla non incididunt ex consectetur ullamco. Ad enim ex velit occaecat culpa. Nulla labore duis reprehenderit proident excepteur. Ad laborum fugiat deserunt ipsum cillum Lorem.\r\n",
          "registered": "2014-03-16T04:12:22 +05:00",
          "latitude": -3.501676,
          "longitude": -68.002834,
          "tags": ["aliqua", "ea", "incididunt", "pariatur", "elit", "cillum", "laboris"],
          "friends": [{"id": 0, "name": "Jenna Richmond"}, {"id": 1, "name": "Desiree Guthrie"}, {
            "id": 2,
            "name": "Holly Pate"
          }],
          "greeting": "Hello, Ochoa Dillard! You have 8 unread messages.",
          "favoriteFruit": "apple"
        }, {
          "_id": "58caec7995051501e99275b5",
          "index": 5,
          "guid": "a9c1c2cc-96da-4216-a7ad-ddff712cc900",
          "isActive": false,
          "balance": "$2,686.27",
          "picture": "http://placehold.it/32x32",
          "age": 40,
          "eyeColor": "green",
          "name": "Mckee Berg",
          "gender": "male",
          "company": "TERSANKI",
          "email": "mckeeberg@tersanki.com",
          "phone": "+1 (870) 520-2800",
          "address": "578 Anchorage Place, Toftrees, Maine, 1183",
          "about": "Sint ut excepteur ad irure voluptate exercitation in culpa veniam id velit excepteur non duis. Dolore consequat ex est irure ullamco et commodo labore commodo ad esse deserunt dolore. Quis est nostrud pariatur nostrud veniam nulla magna do nisi sint.\r\n",
          "registered": "2017-01-14T04:34:10 +06:00",
          "latitude": -31.330095,
          "longitude": -115.612186,
          "tags": ["mollit", "pariatur", "ullamco", "sint", "occaecat", "aliqua", "sunt"],
          "friends": [{"id": 0, "name": "Torres Page"}, {"id": 1, "name": "Berry Tran"}, {
            "id": 2,
            "name": "Georgina Hodges"
          }],
          "greeting": "Hello, Mckee Berg! You have 2 unread messages.",
          "favoriteFruit": "strawberry"
        }],
    }];
};

module.exports = getResults;
