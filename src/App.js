import logo from './logo.svg'
import { useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import {Link,Outlet} from "react-router-dom";

function UserDet({name, location, avatar}){
  return(
    <div>
      <h3>{name}</h3>
      <h5>{location}</h5>
      <img src={avatar} height='150'/>
    </div>
  )
}

export function Email(){
  return(
    <div>
      <h1>
        Email
      </h1>
    </div>
  )
}

export function About(){
  return(
    <div>
      <Link to="History">History</Link>
      <h1>
        About Us
      </h1>
      <Outlet/>
    </div>
  )
}

export function Contact(){
  return(
    <div>
      <h1>
        Contact Us
      </h1>
      <Outlet/>
    </div>
  )
}

export function History(){
  return(
    <div>
      <h1>
        History
      </h1>
    </div>
  )
}

function App({element}) {
  
  const [Randvar,setRandvar]=useState("Initial value on loading page");
  const refname1=useRef();
  const refname2=useRef();
  const [data,setData]=useState(null)
  const [checked,setChecked]=useReducer(checked=>!checked,false)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)


  useEffect(()=>{
    fetch(`https://api.github.com/users/ChhaviDixit`)
      .then(response=>response.json())
      .then(setData)//calls data when randvar is changed
      .then(()=>setLoading(false))
      .catch(setError)
    console.log(`${Randvar} is set`)
  },[Randvar])

  const submit=(e)=>{
    e.preventDefault();
    console.log(refname1.current.value)
  }
  if(loading)return(<h1>Loading...</h1>)
  if(error)return(<pre>{JSON.stringify(error)}</pre>)
  if(data && Randvar=="Value after button click")
    return(
    <UserDet
      name={data.name}
      location={data.location}
      avatar={data.avatar_url}
    />)
  

  return (
    <div className="App">
      <Link to="About">About Us</Link>
      <header className="App-header">

        <form onSubmit={submit}>
          <input type="text" ref={refname1}/>
          <input type="number" ref={refname2}/>
          <input type="submit"/>
        </form>
        <h2>
          The imported element is {element}
        </h2>
        <h1>
          {Randvar}
          </h1>
          <button onClick={()=>{setRandvar("Value after button click")}}>Button to Check useState </button>
      <input type="checkbox"
        value={checked}
        onChange={()=>setChecked()}>
      </input>
      <label>{checked?"Checked":"Not checked"}</label>
      </header>
    </div>
  );
}

export default App;
