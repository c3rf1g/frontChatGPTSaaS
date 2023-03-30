import React, {useState} from 'react';
import {API_DOMAIN} from "../../../index.js";
import BotSettingsModal from "./BotSettingsModal.js";
import "./BotItem.css"
const BotItem = ({ bot, onDelete }) => {
    const [showSettings, setShowSettings] = useState(false);
    const [botResponses, setBotResponses] = useState(bot.responseList);
    const handleDivClick = () => {
        setShowSettings(true);
    };
    console.log(showSettings)
    return (
        <div className="bot-item" onClick={handleDivClick}>
            <div className="bot-details">
                <h4 className="bot-name">{bot.name}</h4>
                <p className="bot-token">Token: {bot.token}</p>
                <p className="bot-id">ID: {bot.id}</p>
            </div>
            <button className="bot-delete" onClick={() => onDelete(bot.id)}>Delete</button>
            {showSettings && (
                <BotSettingsModal botResponses={botResponses} setBotResponses={setBotResponses} botId={bot.id} onClose={() => setShowSettings(false)}/>
            )}
        </div>
    );
};

export default BotItem;
