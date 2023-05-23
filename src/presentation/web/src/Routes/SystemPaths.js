
import React from 'react'
import {Routes,Route} from 'react-router-dom';
import  Dashboard  from '../screens/Dashboard';
import  Teachers  from '../screens/Teachers';
import Classes from '../screens/Classes';
import ProfileEdit from '../screens/ProfileEdit';
import ProfileView from '../screens/ProfileView';


const SystemPaths = () => {
 
  return (
    <Routes>
       <Route path="/" element = {<Dashboard/>}></Route>
       <Route path="/teacher" element = {<Teachers/>}></Route>
       <Route path="/classes" element = {<Classes/>}></Route>
       <Route path="/profile_edit" element = {<ProfileEdit/>}></Route>
       <Route path="/profile_view" element = {<ProfileView/>}></Route>
      
    </Routes>                
  )
}

export default SystemPaths

