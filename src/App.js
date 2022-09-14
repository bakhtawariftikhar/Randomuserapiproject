import React, { useState, useEffect } from 'react'

import "./App.css";
export default function App () {
  const [data, setData] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  }
 


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://randomuser.me/api?results=20');
      const {results} = await res.json();
      setData(results);
      
    };
    fetchData();
  }, []);
  const deleteItem = (index) => () =>
  setData((data) => data.filter((_, i) => i !== index));

  
  return <>
  <h2> Random Users:</h2>
     {(data.map((item,index)=>{
      //  const [gender, name] = item;
       return(
         <>
         <div className="card" key={index}>
        <form>
        <div>
      <button type="button" onClick={handleClick}>
        <dl>
        <dd><img src={item.picture.large}  alt=""/></dd>
            <dd><h3>{item.name.title} {item.name.first} {item.name.last}</h3></dd>
            </dl></button><br></br>
        
      
      {isShown && (
        <div>
             <dl>
   <dd><p><strong>Gender :</strong>{item.gender} </p> </dd>
            <dd><p><strong>Age : </strong>{item.dob.age} </p> </dd>
            <dd><p><strong>City :</strong>{item.location.city} </p> </dd>
            <dd><p><strong>State :</strong> {item.location.state} </p></dd>
            <dd><p><strong>Country :</strong>{item.location.country}</p></dd>
            <dd><p>&#9993; {item.email}</p></dd>
            <dd><p>&#128222; {item.phone} | {item.cell}</p></dd>
           </dl>
           </div>
      )}
      </div>
<button type="button" onClick={deleteItem(index)}>Delete
  </button>
      </form>
        </div>
    
         </>
       )
     }))}
     
    
  </>
}


