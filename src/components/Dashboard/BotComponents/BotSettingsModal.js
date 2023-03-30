import React, {useRef, useState} from 'react';
import QAForm from "../QuestionAnswerComponent/QuestionAnswerForm.js";
import { FaQuestionCircle } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import "./BotModal.css"
function BotResponseModal({ botResponses, onClose, botId, setBotResponses }) {
    console.log(botResponses)
    const tooltipRef = useRef(null);

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>


                <h2 style={{display: "flex", alignItems: "center"}}>
                    <span style={{flex: "1 1 0"}}>Bot Responses</span>
                    <div className="create-bot-wrapper" style={{marginLeft: "auto"}}>
                        <button onClick={onClose}>X</button>
                    </div>
                </h2>
                <p>Build typical templates of questions and corresponding answers so that the bot can solve your questions
                    from your template</p>
                For example:<br/>
                <i>Question: Who are you?<br/>
                Answer: I am a bot, which constructed on mybotgpt.ai
                </i>
                <br/>
                <br/>

                <QAForm initialQAList={botResponses} botId={botId} onClose={onClose} setBotResponseList={setBotResponses}/>
            </div>
        </div>
    );
}
export default BotResponseModal;