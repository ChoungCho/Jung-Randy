import './ChatBox.css';
import { ChatBoxProps } from './types';
import { useChat } from './useChat';
import { formatTime } from './utils';

export default function ChatBox({ onSendMessage }: ChatBoxProps) {
  const {
    messages,
    inputValue,
    isActive,
    opacity,
    messagesEndRef,
    inputRef,
    handleSend,
    handleKeyDown,
    handleInputChange,
    activateChat,
  } = useChat({ onSendMessage });

  return (
    <div 
      className="chat-box" 
      style={{ opacity }}
      onClick={activateChat}
    >
      <div className="chat-header">
        <span className="chat-title">채팅 (Enter로 입력)</span>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="chat-message">
            <div className="message-header">
              <span className="message-username">{message.username}</span>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          ref={inputRef}
          type="text"
          className="chat-input"
          placeholder="메시지를 입력하세요 (Enter로 전송)"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-send-btn" onClick={handleSend}>
          전송
        </button>
      </div>
    </div>
  );
}


