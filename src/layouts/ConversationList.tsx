import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ConversationList = () => {

  const myUser = useSelector((state: any) => state.loggedUser);
  const token = localStorage.getItem("bng_token");
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    try{
      const response = await fetch("http://localhost:8080/api/users", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
                console.log("HTTP Error:", response.status);
                return;
      }
       const result = await response.json();
      setUsers(result);
    }catch(err){
      console.log('error in fetching users', err);
    }
  } 

  useEffect(()=>{
    fetchUsers()
  }, [])
    
  return (
    <div className="h-screen bg-white border-r border-gray-300 overflow-y-auto">
      <div className="p-4 font-bold text-gray-700 border-b border-gray-200">
        {myUser?.username}
      </div>

      {/* Example conversation items */}
      {users.map((ele:any, index:number)=>{
        return <div key={index} className="hover:bg-gray-100 cursor-pointer px-4 py-3 border-b border-gray-200">
        {ele.username}
      </div>
      })}
    </div>

  )
}

export default ConversationList