import React, { Component } from "react";
import Table  from "./table"
import Filter from "./filter"
import Store from "../store/taskStore"


import TaskAction from "../action/Action"
 
class Root extends Component {

  constructor(props){
    const info = getStateFromFlux();
    super(props)
    this.state={
      dogs: info.dogs,
    }
    this._onChange = this._onChange.bind(this);
    this.error = this.error.bind(this);
  }

  componentWillMount() {
    TaskAction.getDogs("")
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange, this.error);
    Store.emitChange();
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange, this.error);
  }
  _onChange() {
    this.setState(getStateFromFlux());
  }
  error() {
    let err = Store.getError();
    if (err && err.status === 401) {
      this.setState({ isOpenModal: true })
    }
  }

  handleGettingDogs(status){
   // TaskAction.getDogs(status);
  }

  render() {
    return (
        <div>
          <Filter 
            onFiltering={this.handleGettingDogs}
          />

          <Table  
            data={this.state.dogs}
          />
        </div>
    );
  }
}
 
function getStateFromFlux() {
  return {
      dogs: Store.getDogs(),
  };
}

export default Root;