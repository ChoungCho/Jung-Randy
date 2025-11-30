import { Message } from './types';

// 초기 시스템 메시지
export const initialMessages: Message[] = [
  {
    id: '1',
    username: 'System',
    text: '채팅이 시작되었습니다.',
    timestamp: new Date(),
  },
];

// 시스템 메시지 생성 헬퍼
export const createSystemMessage = (text: string): Message => ({
  id: `system-${Date.now()}`,
  username: 'System',
  text,
  timestamp: new Date(),
});

// 사용자 메시지 생성 헬퍼
export const createUserMessage = (text: string, username: string = 'You'): Message => ({
  id: `user-${Date.now()}`,
  username,
  text,
  timestamp: new Date(),
});


