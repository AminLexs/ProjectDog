import React, {useState, useEffect} from "react";
import Table from "./table"
import Store from "../store/taskStore"
import Select from 'react-select'
import M from 'materialize-css'

import TaskAction from "../action/Action"


function Root() {
    const [dogs, setDogs] = useState([]);
    const [search, setSearch] = React.useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [optionsFilter, setOptionsFilter] = useState([{value: 'default', label: 'Выберите породу'}])
    const [currentOption, setOption] = useState('default')
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    const _onChange = () => {
        setDogs(Store.getDogs())
    }
    const error = () => {
        let err = Store.getError();
        if (err) {

            M.toast({html: err.text, classes: 'rounded'})
        }
    }

    const handleFilter = (e) => {
        setOption(e.value)
    }

    function unique(arr) {
        let result = [];

        for (let str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            }
        }

        return result.map(elem => {
            return {value: elem, label: elem}
        });
    }

    useEffect(() => {
        TaskAction.getDogs("")
        Store.addChangeListener(_onChange, error);
        Store.emitChange();
        let filters = []
        filters.push({value: 'default', label: 'Выберите породу'})
        Array.prototype.push.apply(filters, unique(dogs.map(dog => dog.breed)))
        setOptionsFilter(filters)

        let result = dogs.filter((item) =>
            item.header.includes(search))
        if (currentOption !== 'default')
            result = result.filter((item) => item.breed === currentOption ? true : false)

        setSearchResult(result)

        return () => {
            Store.removeChangeListener(_onChange, error);
        }
    }, [dogs, search, currentOption]);


    return (
        <div>
            <div className={"filter"}>
                <label htmlFor="search">
                    Поиск по заголовку:
                    <input id="search" type="text" onChange={handleSearch}/>
                </label>
                <Select options={optionsFilter} defaultValue={optionsFilter[0]} onChange={handleFilter}/>
            </div>
            <Table
                data={searchResult}
            />
        </div>
    );
}


export default Root;