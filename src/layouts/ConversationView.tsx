import { useEffect, useState, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";

const ConversationView = () => {

    const ws = useRef<WebSocket | null>(null);
    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState<any>("");
    const user = useSelector((state: any) => state.auth.loggedUser);
    const friend = useSelector((state: any) => state.chat.selectedFriend);
    const [history, setHistory] = useState<any>([]);
    const [sendMsgFlag, setSendMsgFlag] = useState<Boolean>(true);



    const getMessageHistory = async () => {
        const token = localStorage.getItem("bng_token");
        try {
            const response = await fetch(`http://localhost:8080/cn/convs?senderId=${user.id}&receiverId=${friend.id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const history = await response.json();
            if (history.success) {
                setHistory(history?.messages);
            }
        }
        catch (err) {
            console.log("err", err)
        }
    }

    useEffect(() => {
        getMessageHistory();
    }, [friend.id, response, sendMsgFlag])

    // Setup WebSocket connection
    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080');

        ws.current.onopen = () => {
            ws.current?.send(JSON.stringify({ type: 'register', user_id: user.id }));
        };

        ws.current.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            setResponse(msg);
        };

        ws.current.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        ws.current.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => {
            console.log("websocket cleanup")
            ws.current?.close(); // Cleanup
        };
    }, [user.id]);

    const sendMessage = () => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                sender_id: user.id,
                receiver_id: friend.id,
                message: message,
            }));
            setSendMsgFlag(!sendMsgFlag);
            setMessage("");
        } else {
            console.warn('WebSocket not connected');
        }
    };

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
            <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-2">
                {[...history].reverse().map((item: any, index: number) => {
                    const isMe = item.senderId === user.id;

                    return (
                        <div
                            key={index}
                            className={`max-w-[60%] px-3 py-2 rounded-lg shadow-sm border text-sm ${isMe
                                ? 'self-end bg-green-100 text-right'
                                : 'self-start bg-white text-left'
                                }`}
                        >
                            <p className="text-gray-800">{item.message}</p>
                            <p className="text-gray-400 text-xs mt-1">
                                {item.timestamp}
                            </p>
                        </div>
                    );
                })}
            </div>


            {/* Input Box */}
            <div className="flex items-center p-3 bg-white border-t border-gray-300">
                <input
                    className="flex-grow h-12 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="text"
                    value={message}
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