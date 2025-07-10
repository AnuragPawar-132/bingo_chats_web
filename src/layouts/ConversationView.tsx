import { useEffect, useState } from "react";

const ConversationView = () => {

    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState<any>("");

    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'register', user_id: 1 }));
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        setResponse(msg);
        console.log('New message:', msg);
    };

    const sendMessage = () => {
        console.log("in sendMessage fun");
        let details = JSON.parse(localStorage.getItem('chat_users') || '{}');
        console.log("localStorage", details);
        ws.send(JSON.stringify({
            sender_id: details.sender_id,
            receiver_id: details.receiver_id,
            message: message
        }));
    }

    useEffect(() => {

    }, [message])

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4">
                <textarea
                    className="w-full h-full resize-none bg-white p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={response.message}
                    placeholder="Chat messages will appear here..."
                    readOnly
                ></textarea>
            </div>

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

    )
}

export default ConversationView