import React, { useEffect, useState } from 'react';
import {API_DOMAIN} from "../../index.js";
import BotItem from "./BotItem.js";
import "../BotList.css"
const BotList = () => {
    const [botList, setBotList] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBotData, setNewBotData] = useState({ token: '', name: '' });

    useEffect(() => {
        const fetchBotList = async () => {
            setIsLoading(true);
            const response = await fetch(API_DOMAIN + `/getBots`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(response)
            const data = await response.json();
            setBotList(data.data);
            setIsLoading(false);
        };

        fetchBotList();
    }, []);

    const handleCreateBot = async () => {
        setIsLoading(true);
        const response = await fetch(API_DOMAIN + '/createBot', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  ...newBotData  })
        });
        const newBot = await response.json();
        console.log(newBot)
        if (newBot.data) {
            setBotList([...botList, newBot.data]);

        } else {
            alert(newBot.error)
        }
        setIsLoading(false);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBotData({ ...newBotData, [name]: value });
    }

    const handleDeleteBot = async (botId) => {
        setIsLoading(true);
        const response = await fetch(API_DOMAIN + `/deleteBot`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ botId }),
        });
        console.log()
        if (response.ok) {
            console.log("deleted")
            const updatedBotList = botList.filter((bot) => bot.id !== botId);
            setBotList(updatedBotList);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <h3>Available Bots</h3>
            <div className="create-bot-wrapper">
                <button className="create-bot-btn" onClick={() => setIsModalOpen(true)}>Create Bot</button>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : botList.length ? (
                <ul>
                    {botList.map((bot) => (
                        <BotItem bot={bot} onDelete={handleDeleteBot} />
                    ))}
                </ul>
            ) : (
                <p>No bots available for this user.</p>
            )}

            {isModalOpen && (
                <div className="modal" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div>
                            <h3>Create Bot</h3>
                            <form onSubmit={(event) => { event.preventDefault(); handleCreateBot(); }}>
                                <label>
                                    Token:
                                    <input className="form-input" type="text" name="token" value={newBotData.token} onChange={handleInputChange} />
                                </label>
                                <br />
                                <label>
                                    Name:
                                    <input className="form-input" type="text" name="name"
                                           value={newBotData.name} onChange={handleInputChange} />
                                </label>
                                <br />
                                <button className="create-bot-form-btn" type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotList;
