import React, { useState } from 'react'
import '../Styles/teacher.css'
import DataTable from '../components/DataTable'
import DropDown from '../components/MultipleSelect'
import { RxMagnifyingGlass } from "react-icons/rx";
import BasicModal, { Modal } from '../components/BasicModal'
import {useEffect} from 'react';
import axios from 'axios'

const Teachers = () => {
    const [state, setState] = useState(false)


    // retrive table data
  let [data, setData] = useState([])
  const token = JSON.parse(localStorage.getItem('tokens'))
  const config = {
    headers: {Authorization: `Bearer ${token.access.token}`}
  }

  useEffect(()=>{
      axios.get('http://localhost:4000/users', config)
      .then((result)=>{
          setData(result.data)
      })
      .catch(error=>{
          console.log(error)
      })
  }, [state])


    // search dynamically over data
    const [filteredData, setFilteredData] = useState(data);
    console.log(filteredData)
    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredData(filtered);
    };
  

    
  return (
    <div className='full-screen-teacher'>
        <div className='header-teacher'>
            <h2>Teachers</h2>
        </div>
        <div className='search-section-teacher' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '30%', marginLeft: '5%', height: '70%'}}>
                <label style={{marginLeft: '2%  '}}>Who do you want to look for ?</label>
                <span className={'search-field'}>
                        <RxMagnifyingGlass className='search-logo'/>
                        <input className='input-text' type={'text'}  onChange={handleInputChange}  placeholder = 'Search ...'></input>
                    </span>
            </div>
            <div style={{width: 200}}>
                <BasicModal state = {state} setState = {setState}/>
            </div>
        </div>

        <div className='table-section-teacher'>
            <div className='table-section-header-teacher'>

            </div>
            <div className='table-section-body-teacher'>
                <DataTable state = {state} data = {data} filteredData = {filteredData}/>
            </div>
        </div>
    </div>
  )
}


export default Teachers
