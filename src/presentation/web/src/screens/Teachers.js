import React from 'react'
import '../Styles/teacher.css'
import PaginationTable from '../components/PaginationTable'
import DropDown from '../components/MultipleSelect'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Teachers = () => {

    let [data, setData] = useState()
        data = data ? data : []
        const token = JSON.parse(localStorage.getItem('tokens'))
        console.log(token.access.token)
        const config = {
            headers: {Authorization: `Bearer ${token.access.token}`}
        }

        // fetch all teacher data
        useEffect(()=>{
            axios.get('http://localhost:4000/users', config)
            .then((result)=>{
                setData(result.data)
            })
            .catch(error=>{
                console.log(error)
            })
        },[])
        
        console.log(data)
  return (
    <div className='full-screen-teacher'>
        <div className='header-teacher'>
            <h2>Teachers</h2>
        </div>
        <div className='search-section-teacher' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '30%', marginLeft: '5%'}}>
                <label style={{marginLeft: '2%  '}}>Who do you want to look for ?</label>
                <DropDown/>
            </div>
        </div>

        <div className='table-section-teacher'>
            <div className='table-section-header-teacher'>

            </div>
            <div className='table-section-body-teacher'>
                <PaginationTable data = {data} setData = {setData}/>
            </div>
        </div>
    </div>
  )
}


export default Teachers
