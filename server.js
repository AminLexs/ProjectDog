const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')
const Dog = require('./models/schemaDog')
const Breed = require('./models/schemaBreed')
const Router = require('./api/routes')
var cors = require('cors')
const PORT = config.get('port') || 3000
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5001',
    credentials: true
}))
app.use(Router)
function getInfoFromUrl(url=config.get('site')) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else {
                let arrayOfStrings = JSON.parse(xhr.responseText).message.split('/');

                //console.log(arrayOfStrings[4])
                //console.log(arrayOfStrings[5].split('.')[0]) // response -- это ответ сервера
                resolve({breed:arrayOfStrings[4],jpg:arrayOfStrings[5].split('.')[0]});
            }
        }

        xhr.onerror = function(){
            reject();
        }

        xhr.send();
    });
}
let gettingInfo = []
for (let i =0;i<100;i++){
    gettingInfo.push(getInfoFromUrl())
}

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://amin:wsx123321xsw@cluster0.0yitc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
              //  useFindAndModify: false
            }
        )
        Promise.all(gettingInfo).then(values => {
            values.forEach(value => {
                let idBreed = new mongoose.Types.ObjectId();
                let breed = new Breed({_id:  idBreed, title: value.breed});
                breed.save(function (err) {
                    if (err) return console.log(err);
                })
                let dog = new Dog({breedid: idBreed, title:value.jpg})
                dog.save(function (err) {
                    if (err) return console.log(err);
                })
            })

        })

        app.listen(PORT, () => {

            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}

start()