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

    const sendMessage =() => {
        console.log("in sendMessage fun");
        let details = JSON.parse(localStorage.getItem('chat_users') || '{}');
        console.log("localStorage", details);
        ws.send(JSON.stringify({
            sender_id: details.sender_id,
            receiver_id: details.receiver_id,
            message: message
        }));
    }

    useEffect(()=>{
  
    }, [message])

    return (
        <div>
            <div>Chat</div>
            <textarea className="border-2 h-20 w-100" value={response.message} placeholder="Chat messages will appear here..."></textarea>
            <div className="flex flex-row border-2">
                <input className="border-2 h-20 w-100" type="text" onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." />
                <button className="bg-green round-lg" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ConversationView