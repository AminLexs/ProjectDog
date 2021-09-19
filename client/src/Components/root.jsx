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
    const [isRefresh, setRefresh] = useState(true)
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };
    const _onChange = () => {
        let dogs = Store.getDogs()
        setDogs(dogs)
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

    function unique(arr) { //create array which consist of unique elements
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
        async function fetchMyAPI() {
            if (isRefresh) { //break infinite loop
                document.getElementById("progressbar").style.visibility = 'visible'
                await TaskAction.getDogs("")
                Store.addChangeListener(_onChange, error);
                Store.emitChange();
                document.getElementById("progressbar").style.visibility  = 'hidden'
                setRefresh(false)
                setTimeout(() => setRefresh(true), 30000) //refresh every 30 sec
            }
        }

        fetchMyAPI()

        let filters = []
        filters.push({value: 'default', label: 'Выберите породу'})
        Array.prototype.push.apply(filters, unique(dogs.map(dog => dog.breed))) //add breeds to options
        setOptionsFilter(filters)

        let result = dogs.filter((item) =>
            item.header.includes(search))
        if (currentOption !== 'default')//when something chose
            result = result.filter((item) => item.breed === currentOption ? true : false)
        setSearchResult(result)

        return () => {
            Store.removeChangeListener(_onChange, error);
        }

    }, [isRefresh, search, currentOption]);


    return (
        <div>
            <div className={"filter"}>
                <label htmlFor="search">
                    Поиск по заголовку:
                    <input id="search" type="text" onChange={handleSearch}/>
                </label>
                <Select options={optionsFilter} defaultValue={optionsFilter[0]} onChange={handleFilter}/>
            </div>
            <div id='progressbar' className="progress">
                <div className="indeterminate"></div>
            </div>
            <Table
                data={searchResult}
            />
        </div>
    );
}


export default Root;