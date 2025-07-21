import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { SendFill } from 'react-bootstrap-icons';

const InputBox = ({ onSend }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSendClick = () => {
        onSend(inputValue);
        setInputValue('');
    };

    return (
        <div className="chat-footer">
            <InputGroup>
                <Form.Control
                    placeholder="What would you like to say?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendClick();
                    }}
                />
                <Button variant="primary" className="send-button" onClick={handleSendClick}>
                    <SendFill />
                </Button>
            </InputGroup>
        </div>
    );
};

export default InputBox;
