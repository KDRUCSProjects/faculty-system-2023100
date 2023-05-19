
import React from 'react'
import {Routes,Route} from 'react-router-dom';
import  Dashboard  from '../screens/Dashboard';
import  Teachers  from '../screens/Teachers';
import Classes from '../screens/Classes';
import Login from '../screens/Login';

const SystemPaths = () => {
 
  return (
    <Routes>
       <Route path="/" element = {<Dashboard/>}></Route>
       <Route path="/teacher" element = {<Teachers/>}></Route>
       <Route path="/classes" element = {<Classes/>}></Route>
       {/* <Route path="/login" element = {<Login/>}></Route> */}

    </Routes>    
               
  )
}

export default SystemPaths

