import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react"; 
import { useSelector } from "react-redux";

const ConversationView = () => {

    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState<any>("");
    const [userId, setUserId] = useState<any>("");
    const friend = useSelector((state: any)=> state.chat.selectedFriend);

    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'register', user_id: userId }));
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        setResponse(msg);
        console.log('New message:', msg);
    };

    const sendMessage = () => {
        console.log("in sendMessage fun");
        ws.send(JSON.stringify({
            sender_id: userId,
            receiver_id: friend.id,
            message: message
        }));
    }

    const setLoggedUser = () => {
        let user = localStorage.getItem('bng_user');
        let user_id: number | undefined;
        if(user){
            user_id = JSON.parse(user)?.id;
        }
        setUserId(user_id)
    }

    useEffect(() => {
        setLoggedUser()
    }, [message])

     return (
        <div className="flex flex-col h-screen w-full bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow">
                <div className="flex items-center space-x-3">
                    <img
                        src={friend.profile_image || "alt"}
                        alt={friend.username}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{friend.username}</h2>
                        <p className="text-sm text-gray-500">Online</p>
                    </div>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                    <MoreVertical className="w-6 h-6" />
                </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <textarea
                    className="w-full h-full resize-none bg-white p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={response.message}
                    placeholder="Chat messages will appear here..."
                    readOnly
                ></textarea>
            </div>

            {/* Input Box */}
            <div className="flex items-center p-3 bg-white border-t border-gray-300">
                <input
                    className="flex-grow h-12 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button
                    className="ml-3 flex-shrink-0 h-12 px-6 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ConversationView