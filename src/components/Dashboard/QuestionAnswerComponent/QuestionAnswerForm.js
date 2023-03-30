import React, { useState } from 'react';
import {API_DOMAIN} from "../../../index.js";
import "./QA.css"
function QARowField({ index, question, answer, onQuestionChange, onAnswerChange, onDelete }) {
    const handleQuestionChange = (event) => {
        onQuestionChange(index, event.target.value);
    };

    const handleAnswerChange = (event) => {
        onAnswerChange(index, event.target.value);
    };

    const handleDelete = () => {
        onDelete(index);
    };

    return (
        <div className="qa-row">
            <input type="text" className="qa-input" value={question} onChange={handleQuestionChange} placeholder="Enter question" />
            <input type="text" className="qa-input" value={answer} onChange={handleAnswerChange} placeholder="Enter answer" />
            <button className="qa-delete-btn" onClick={handleDelete}>Х</button>
        </div>

    );
}

function QAForm({ initialQAList, botId, onClose, setBotResponseList }) {
    const [qaList, setQAList] = useState(initialQAList || []);

    const handleQuestionChange = (index, question) => {
        const updatedList = [...qaList];
        updatedList[index] = { ...updatedList[index], question };
        setQAList(updatedList);
    };

    const handleAnswerChange = (index, answer) => {
        const updatedList = [...qaList];
        updatedList[index] = { ...updatedList[index], answer };
        setQAList(updatedList);
    };

    const handleAddRow = () => {
        setQAList([...qaList, { question: '', answer: '' }]);
    };

    const handleDeleteRow = async (index) => {
        const updatedList = [...qaList];
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(API_DOMAIN + '/deleteResponsePair', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pairId: updatedList[index].id, botId})
        });
        const deletedPair = await response.json();
        console.log(deletedPair)
        updatedList.splice(index, 1);
        setQAList(updatedList);
    };

    const handleSaveQAs = async () => {
        console.log(qaList);
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(API_DOMAIN + '/updatePairs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({qaList, botId})
        });
        const newBot = await response.json();
        setBotResponseList(newBot.data);
        onClose(true)
        console.log(newBot)
    }
    const font = {
        fontFamily: "Montserrat, bold"
    }
    return (
        <div style={font}>
            <div className="qa-container">
                {qaList.map((qa, index) => (
                    <QARowField
                        key={index}
                        index={index}
                        question={qa.question}
                        answer={qa.answer}
                        onQuestionChange={handleQuestionChange}
                        onAnswerChange={handleAnswerChange}
                        onDelete={handleDeleteRow}
                    />
                ))}
                <button className="add-row-button" onClick={handleAddRow}>Add Row</button>

            </div>

            <button className="save-button" onClick={handleSaveQAs}>Save</button>
        </div>


    );
}

export default QAForm;
