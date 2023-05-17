
import Menu from "./Menus/menu";
import Login from "./screens/Login";
import { useState } from "react";


function App() {
  const log = localStorage.getItem('tokens');
  const [logged,setLogged] = useState(log || false)
  return (
    <div className="App">
      {
      logged
      ?
      <Menu/>
      :
      <Login setLogged={setLogged}/>
  }
    </div>
    
  );
}

export default App;
