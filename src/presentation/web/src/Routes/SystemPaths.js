
import React from 'react'
import {Routes,Route} from 'react-router-dom';
import  Dashboard  from '../screens/Dashboard';
import  Teachers  from '../screens/Teachers';
import Classes from '../screens/Classes';
import Profile from '../screens/Profile';
import ViewProfile from '../screens/ViewProfile';
import EditProfile from '../screens/EditProfile';

const SystemPaths = () => {
 
  return (
    <Routes>
       <Route path="/" element = {<Dashboard/>}></Route>
       <Route path="/teacher" element = {<Teachers/>}></Route>
       <Route path="/classes" element = {<Classes/>}></Route>
       <Route path="/profile" element = {<Profile/>}></Route>
       <Route path="/view_profile" element = {<ViewProfile/>}></Route>
       <Route path="/edit_profile" element = {<EditProfile/>}></Route>
      
    </Routes>                
  )
}

export default SystemPaths

