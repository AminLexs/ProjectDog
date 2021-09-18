import React, { Component } from "react";
import Table from "react-table-6";


class _Table extends Component {

    constructor(props){
        super(props);
        this.state = {
          headers : [{  
            Header: 'Заголовок',
            accessor: 'header'
            },{  
            Header: 'Картинка',
            accessor: 'image'
            },{  
             Header: 'Порода',
             accessor: 'breed',
            },
          ]
      }  
    }


    render() {
        return (
          <Table 
          data={this.props.data} 
          columns={this.state.headers}  
          defaultPageSize = {6}  
          pageSizeOptions = {[2,4, 6]}  
      /> 
    );
  }
}
export default _Table;
