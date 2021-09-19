import React, {Component} from "react";
import Table from "react-table-6";


class _Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: [{
                Header: 'Заголовок',
                accessor: 'header',
                Cell: row => {
                    return (<div style={{textAlign: "center"}}>{row.value}</div>)
                }
            }, {
                Header: 'Картинка',
                accessor: 'image',
                Cell: src => {
                    return (<figure><img src={src.value} alt={""}/></figure>)
                }
            }, {
                Header: 'Порода',
                accessor: 'breed',
                Cell: row => {
                    return (<div style={{textAlign: "center"}}>{row.value}</div>)
                }
            },
            ]
        }
    }


    render() {
        return (
            <Table
                data={this.props.data}
                columns={this.state.headers}
                defaultPageSize={6}
                pageSizeOptions={[2, 4, 6]}
            />
        );
    }
}

export default _Table;
