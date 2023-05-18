import React from 'react'
import '../Styles/teacher.css'
import PaginationTable from '../components/PaginationTable'
import DropDown from '../components/MultipleSelect'

const Teachers = () => {
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
                <PaginationTable/>
            </div>
        </div>
    </div>
  )
}


export default Teachers
