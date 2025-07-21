import React, { useRef } from 'react';

const Message = ({ text, sender, specialReply, onContextMenu, time }) => {
    const messageRef = useRef(null);
    const lines = text.split('\n');

    return (
        <div
            ref={messageRef}
            className={`message ${sender === 'me' ? 'sent' : 'received'}`}
            onContextMenu={(e) => onContextMenu(e, sender)}
        >
            <div className={`bubble ${sender === 'me' ? 'gray' : 'purple'}`}>
                <div>{lines[0]}</div>
                {specialReply && (
                    <div className="reply-options">Not yet &nbsp;&nbsp; Yes</div>
                )}
            </div>
            <div className="timestamp">{time}</div>
        </div>
    );
};

export default Message;
