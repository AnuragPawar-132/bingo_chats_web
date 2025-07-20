import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chooseFriend } from '../slices/chatSlice';
import { Search } from 'lucide-react';

const ConversationList = () => {

  const myUser = useSelector((state: any) => state.auth.loggedUser);
  const dispatch = useDispatch();
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

  const selectFriend = (friend: any) => {
    dispatch(chooseFriend(friend));
  }

  useEffect(()=>{
    fetchUsers()
  }, [])
    
  return (
    <div className="w-80 h-screen bg-white border-r border-gray-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 flex items-center justify-between">
        <h1 className="text-lg font-semibold">BingoChats</h1>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {users.map((conv: any) => (
          <div
            key={conv.id}
            onClick={()=>selectFriend(conv)} 
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
          >
            <img
              src={conv.avatar_url}
              alt={conv.username}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-sm font-semibold">{conv.username}</h2>
              <p className="text-xs text-gray-500 truncate w-48">{conv.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversationList