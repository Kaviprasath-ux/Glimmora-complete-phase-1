import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  hasUnreadMessages?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ hasUnreadMessages = false }) => {
  const handleChatClick = () => {
    console.log('Chat opened');
    // TODO: Open AI chat interface
    // For now, just a placeholder
    alert('AI Chat feature coming soon!');
  };

  return (
    <div className={styles.chatBubbleContainer}>
      <button className={styles.chatBubble} onClick={handleChatClick}>
        <MessageCircle size={28} strokeWidth={2} />
        {hasUnreadMessages && <span className={styles.notificationBadge} />}
      </button>
    </div>
  );
};

export default ChatBubble;
