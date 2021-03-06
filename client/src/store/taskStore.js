import {EventEmitter} from "events";
import Dispatcher from "../dispatcher/dispatcher";
import actionTypes from "../action/types";

const CHANGE_EVENT = "change";
const ERROR_EVENT = "error";
let _dogs = [];
let errorStatus = 0;
let errorText = '';


function formatDog(dog) {
    return {
        header: dog.title,
        image: `https://images.dog.ceo//breeds//${dog.breed}//${dog.title}.jpg`,
        breed: dog.breed,

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
        if (!event)
            this.emit(CHANGE_EVENT);
        else
            this.emit(event);
    }

    getDogs() {
        return _dogs;
    }

    getError() {
        return {
            status: errorStatus,
            text: errorText
        }
    }
}

Dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.REQUEST_SUCCESS:
            _dogs = action.dogs.map(formatDog);
            store.emitChange(CHANGE_EVENT);
            break;
        case actionTypes.ERROR:
             errorStatus = action?.error?.status||503;
             errorText = action?.error?.data||'Service Unavailable';
            store.emitChange(ERROR_EVENT);
            break;
        default:
            console.log("no action")
    }
})

const store = new Store();

export default store;