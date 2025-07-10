import React from 'react'

const ConversationList = () => {
  return (
    <div className="h-screen bg-white border-r border-gray-300 overflow-y-auto">
      <div className="p-4 font-bold text-gray-700 border-b border-gray-200">
        Bingo Chat
      </div>

      {/* Example conversation items */}
      <div className="hover:bg-gray-100 cursor-pointer px-4 py-3 border-b border-gray-200">
        Alice
      </div>
      <div className="hover:bg-gray-100 cursor-pointer px-4 py-3 border-b border-gray-200">
        Bob
      </div>
      <div className="hover:bg-gray-100 cursor-pointer px-4 py-3 border-b border-gray-200">
        Charlie
      </div>
    </div>

  )
}

export default ConversationList