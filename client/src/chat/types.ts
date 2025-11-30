export interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
}

export interface ChatBoxProps {
  onSendMessage?: (message: string) => void;
}


