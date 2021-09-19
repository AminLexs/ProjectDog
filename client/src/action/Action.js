import Dispatcher from "../dispatcher/dispatcher";
import actionTypes from "./types";
const axios = require('axios');
const config = require('./../config');
const PORT = config.port|| 5000

const TaskActions = {

    getDogs() { //send request to a server
        axios.get(`http://localhost:${PORT}/`)
            .then(data => {
                    Dispatcher.dispatch({
                        type: actionTypes.REQUEST_SUCCESS,
                        dogs: data.data
                    })
                }
            )
            .catch(err =>
                Dispatcher.dispatch({
                    type: actionTypes.ERROR,
                    error: err.response
                })
            );
    },
}
export default TaskActions;