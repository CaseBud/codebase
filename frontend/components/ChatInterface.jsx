import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import {
    GiScales,
    GiPublicSpeaker,
    GiHandcuffs,
    GiHouse
} from 'react-icons/gi';
import Sidebar from './Sidebar';

const ChatInterface = () => {
    const [message, setMessage] = useState('');
    const [isResponseScreen, setisResponseScreen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(Date.now().toString()); // Generate initial conversation ID
    const [user, setUser] = useState({
        fullName: 'John Doe',
        email: 'john.doe@example.com'
    });

    const generateResponse = async (msg) => {
        if (!msg) return;

        try {
            const response = await fetch('YOUR_API_ENDPOINT_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    conversationId: conversationId,
                    query: msg
                })
            });

            const data = await response.json();

            const newMessages = [
                ...messages,
                { type: 'userMsg', text: msg },
                { type: 'responseMsg', text: data.response } // Adjust based on your API response structure
            ];

            setMessages(newMessages);
            setisResponseScreen(true);
            setMessage('');
        } catch (error) {
            console.error('Error generating response:', error);
            // Handle error appropriately
        }
    };

    const hitRequest = () => {
        if (message) {
            generateResponse(message);
        } else {
            alert('You must write something...!');
        }
    };

    const newChat = () => {
        setisResponseScreen(false);
        setMessages([]);
        setConversationId(Date.now().toString()); // Generate new conversation ID for new chat
    };

    const handleSelectPrompt = (prompt) => {
        setMessage(prompt);
        generateResponse(prompt);
    };

    return (
        <div className="w-full min-h-screen bg-[#0E0E0E] text-white overflow-hidden flex">
            <Sidebar user={user} onSelectPrompt={handleSelectPrompt} />
            <div className="flex-1">
                {
                    isResponseScreen ? (
                        <div className="h-[80vh]">
                            <div className="header pt-[25px] flex items-center justify-between w-full px-8 md:px-[300px]">
                                <h2 className="text-2xl">CaseBud</h2>
                                <button
                                    id="newChatBtn"
                                    className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"
                                    onClick={newChat}
                                >
                                    New Case
                                </button>
                            </div>

                            <div className="messages">
                                {messages?.map((msg, index) => {
                                    return (
                                        <div key={index} className={msg.type}>
                                            {msg.text}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        //!Default prompts
                        <div className="middle h-[80vh] flex items-center flex-col justify-center px-4">
                            <h1 className="text-4xl">
                                CaseBud Legal Assistant
                            </h1>
                            <div className="boxes mt-[30px] flex items-center gap-2 flex-wrap justify-center">
                                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                                    <p className="text-[18px]">
                                        What are my rights <br />
                                        in a criminal case?
                                    </p>
                                    <i className="absolute right-3 bottom-3 text-[18px]">
                                        <GiHandcuffs />
                                    </i>
                                </div>
                                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                                    <p className="text-[18px]">
                                        Help with tenant <br />
                                        rights and housing <br />
                                        laws
                                    </p>
                                    <i className="absolute right-3 bottom-3 text-[18px]">
                                        <GiHouse />
                                    </i>
                                </div>
                                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                                    <p className="text-[18px]">
                                        Understanding <br />
                                        contract terms
                                    </p>
                                    <i className="absolute right-3 bottom-3 text-[18px]">
                                        <GiScales />
                                    </i>
                                </div>
                                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                                    <p className="text-[18px]">
                                        Legal document <br />
                                        analysis help
                                    </p>
                                    <i className="absolute right-3 bottom-3 text-[18px]">
                                        <GiPublicSpeaker />
                                    </i>
                                </div>
                            </div>
                        </div>
                    )
                    //!default prompts
                }

                <div className="bottom w-full flex flex-col items-center fixed bottom-0 pb-4 bg-[#0E0E0E]">
                    <div className="inputBox w-[90%] md:w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            className="p-[10px] pl-[15px] bg-transparent flex-1 outline-none border-none"
                            placeholder="Ask your legal question here..."
                        />
                        {message && (
                            <i
                                className="text-green-500 text-[20px] mr-5 cursor-pointer"
                                onClick={hitRequest}
                            >
                                <IoSend />
                            </i>
                        )}
                    </div>
                    <p className="text-[gray] text-[14px] my-4">
                        CaseBud - Your AI Legal Assistant. Not a substitute for
                        professional legal advice.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
