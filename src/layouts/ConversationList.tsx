import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chooseFriend } from '../slices/chatSlice';
import { Search, MoreVertical } from 'lucide-react';
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { get } from '../services/api';

const ConversationList = () => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("bng_token");
  const [users, setUsers] = useState<any>([]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const fetchUsers = async () => {
    const api = "http://localhost:8080/api/users";
    let headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    let result = await get(api, headers)
    setUsers(result);
  }

  const selectFriend = (friend: any) => {
    dispatch(chooseFriend(friend));
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 flex items-center justify-between">
        <h1 className="text-lg font-semibold">BingoChats</h1>

        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${active ? "bg-gray-100" : ""
                    } w-full px-4 py-2 text-sm text-left`}
                >
                  Logout
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
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
            onClick={() => selectFriend(conv)}
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