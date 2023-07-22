import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
//COMPONENTS
import SingleUser from './SingleUser.jsx'

const UserList = () => {

    const[userSize, setUserSize] = useState(1); 

  const [users,setUsers] = useState([])

  const fetchUsers = async() =>{
        const size = parseInt(userSize, 10);
        console.log("size:",size);
        if (!isNaN(size) && size > 99) {
            alert('ABARTMA AQ');
        } 
        else if(!isNaN(size) && size > 0){
            setUserSize(size);

            const response = await axios.get("https://randomuser.me/api/?results="+userSize)
            setUsers(response.data.results)
        }
        else {
            alert('Lütfen geçerli bir pozitif tamsayı girin.');
        }
        
    }

    useEffect(()=>{
        fetchUsers()
    },[])

    const handleChange = (event) => {
        const inputNumber = parseInt(event.target.value, 10);
        setUserSize(isNaN(inputNumber) ? 0 : inputNumber);
    };

 
  return (
    <div className='user-list'>
        <div className="user-input">
            <input type="text" defaultValue={userSize} onChange={handleChange}/>
            <button onClick={fetchUsers}>Get Users</button>
        </div>
        <ul>
            {users.map((user,idx)=>(
                <li> <SingleUser user={user} key={idx}/> </li>
            ))}
        </ul>
    </div>
  )
}

export default UserList
