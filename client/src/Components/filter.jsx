import React, { Component } from "react";

class GetParams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task_status: ""
        };
        this.radioButtonChange=this.radioButtonChange.bind(this)
    }

    radioButtonChange(event){
        this.props.onFiltering(event.target.value)
    }

    render() {
        return (
        <div class="from-group filter" onChange={this.radioButtonChange}> 
            <label class="radio-inline mr-3">
                <input type="radio" name="task_status" value='inProgress'/> Progress
            </label>    
            <label class="radio-inline mr-3">
                <input type="radio" name="task_status" value='terminated'/> Terminated
            </label> 
            <label class="radio-inline mr-3">
                <input type="radio" name="task_status" value='suspended'/> Suspended
            </label> 
            <label class="radio-inline mr-3">
                <input type="radio" name="task_status" value=''/> All
            </label>     
            
        </div>
    );
  }
}
export default GetParams;

/* 
<input class="form-control" type="radio" name="task_status" id="in-progress" value="inProgress"/>
            <label htmlFor="in-progress"  class="mr-5"> In Progress</label>
            <input class="form-control" type="radio" name="task_status" id="terminated" value="terminated"/>
            <label htmlFor="terminated" class="mr-5">Terminated</label>
            <input class="form-control" type="radio" name="task_status" id="suspended" value="suspended"/>
            <label htmlFor="suspended" class="mr-5"> Suspended</label>
            <input class="form-control" type="radio" name="task_status" id="all" value=""/>
            <label htmlFor="all">All</label>
 */