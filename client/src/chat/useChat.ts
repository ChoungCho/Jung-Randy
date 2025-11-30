import { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from './types';
import { initialMessages, createUserMessage } from './messages';

interface UseChatOptions {
  onSendMessage?: (message: string) => void;
}

export function useChat({ onSendMessage }: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [opacity, setOpacity] = useState(0.3);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInputFocusedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // 투명도 관리: 활성화 시 불투명, 비활성 시 투명
  useEffect(() => {
    if (isActive || inputValue.length > 0) {
      setOpacity(1.0);
      if (fadeOutTimerRef.current) {
        clearTimeout(fadeOutTimerRef.current);
        fadeOutTimerRef.current = null;
      }
    } else {
      fadeOutTimerRef.current = setTimeout(() => {
        setOpacity(0.3);
      }, 3000);
    }

    return () => {
      if (fadeOutTimerRef.current) {
        clearTimeout(fadeOutTimerRef.current);
      }
    };
  }, [isActive, inputValue]);

  // 전역 엔터 키 리스너: 게임 플레이 중 엔터로 채팅 활성화
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isInputFocusedRef.current) return;
      
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        setIsActive(true);
        setOpacity(1.0);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  // 입력창 포커스 추적
  useEffect(() => {
    const handleFocus = () => {
      isInputFocusedRef.current = true;
      setIsActive(true);
      setOpacity(1.0);
    };
    const handleBlur = () => {
      isInputFocusedRef.current = false;
      if (inputValue.trim() === '') {
        setIsActive(false);
      }
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      return () => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      };
    }
  }, [inputValue]);

  const handleSend = useCallback(() => {
    if (inputValue.trim() === '') {
      setIsActive(false);
      inputRef.current?.blur();
      return;
    }

    const newMessage = createUserMessage(inputValue.trim());

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsActive(false);
    inputRef.current?.blur();

    if (onSendMessage) {
      onSendMessage(newMessage.text);
    }
  }, [inputValue, onSendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isActive) {
      setIsActive(true);
    }
  }, [isActive]);

  const activateChat = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      setOpacity(1.0);
      inputRef.current?.focus();
    }
  }, [isActive]);

  return {
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
  };
}


