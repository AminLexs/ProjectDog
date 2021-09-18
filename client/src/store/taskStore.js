import { EventEmitter } from "events";
import Dispatcher from "../dispatcher/dispatcher";
import actionTypes from "../action/types";
//const config = require('config')
var axios = require('axios');
const CHANGE_EVENT = "change";
const ERROR_EVENT = "error";
let _dogs = [];
let editingTask = null;
let errorStatus = 0;
let errorText = '';


function formatDog(dog) {
    return {
        header: dog.title,
        image: dog.title,
        breed: dog.breedid,

    }
}

class Store extends EventEmitter {
    addChangeListener(taskRerender, errorCallback) {
        this.on(CHANGE_EVENT, taskRerender);
        this.on(ERROR_EVENT, errorCallback);
    }

    removeChangeListener(taskRerender, errorCallback) {
        this.removeListener(CHANGE_EVENT, taskRerender);
        this.removeListener(ERROR_EVENT, errorCallback);
    }

    emitChange(event) {
        if(!event)
            this.emit(CHANGE_EVENT);
        else
            this.emit(event);
    }
    getDogs(status) {
        return _dogs;
    }
    getError(){
        return {
            status : errorStatus,
            text : errorText
        }
    }
}

Dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.REQUEST_SUCCESS:
            _dogs = action.dogs.map(formatDog);
            store.emitChange(CHANGE_EVENT);
            break;
        default:
            console.log("no action")
    }
})

const store = new Store();

export default store;