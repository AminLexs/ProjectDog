import Dispatcher from "../dispatcher/dispatcher";
import actionTypes from "./types";
var axios = require('axios');
const PORT = 5000

const TaskActions = {

    getDogs(status) {
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