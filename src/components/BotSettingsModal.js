import React, {useState} from 'react';
import QAForm from "./QuestionAnswerForm.js";

function BotResponseModal({ botResponses, onClose, botId, setBotResponses }) {
    console.log(botResponses)


    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Bot Responses</h2>
                <QAForm initialQAList={botResponses} botId={botId} onClose={onClose} setBotResponseList={setBotResponses}/>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
export default BotResponseModal;