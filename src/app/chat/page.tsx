'use client';

import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import UserMessageComponent from '../components/UserMessage';
import BotMessageComponent from '../components/BotMessage';
import ChatInput from '../components/ChatInput';
import { EditOutlined, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

// New interfaces for grouped messages
interface UserMessageVersion {
  content: string;
}

interface UserMessageData {
  id: string;
  role: 'user';
  versions: UserMessageVersion[];
  currentVersionIndex: number;
}

interface BotResponseData {
  userVersionIndex: number; // Index of the user message version this bot response is for
  content: string;
}

interface ChatEntry {
  id: string; // Unique ID for this conversation entry
  userMessage: UserMessageData;
  botResponses: BotResponseData[];
  currentBotResponseIndex: number; // Index into botResponses array to display
  isBotResponding: boolean; // Indicates if bot is currently generating a response for this entry
}

export default function ChatPage() {
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Global loading for input field

  const simulateBotResponse = (chatEntryId: string, userVersionContent: string, userVersionIndex: number) => {
    setTimeout(() => {
      setChatHistory(prevChatHistory => {
        const updatedChatHistory = prevChatHistory.map(entry => {
          if (entry.id === chatEntryId) {
            const newBotResponse: BotResponseData = {
              userVersionIndex: userVersionIndex,
              content: `Đây là phản hồi mẫu từ chatbot cho phiên bản ${userVersionIndex + 1}: "${userVersionContent}".`,
            };
            return {
              ...entry,
              botResponses: [...entry.botResponses, newBotResponse],
              currentBotResponseIndex: entry.botResponses.length, // Point to the new response
              isBotResponding: false, // Bot finished responding
            };
          } else {  
            return entry;
          }
        });
        return updatedChatHistory;
      });
    setIsLoading(false); // Global loading: Enable input after a bot response
    }, 2000);
  };

  useEffect(() => {
    console.log('chatHistory', chatHistory);
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newChatEntryId = Date.now().toString();
    const newUserMessage: UserMessageData = {
      id: Date.now().toString(),
      role: 'user',
      versions: [{ content: input }],
      currentVersionIndex: 0,
    };

    const newChatEntry: ChatEntry = {
      id: newChatEntryId,
      userMessage: newUserMessage,
      botResponses: [],
      currentBotResponseIndex: -1,
      isBotResponding: true, // Bot will respond to this new message
    };

    setChatHistory(prevChatHistory => [...prevChatHistory, newChatEntry]);
    setInput('');
    setIsLoading(true); // Disable input while bot is thinking
    simulateBotResponse(newChatEntryId, input, newUserMessage.currentVersionIndex);
  };

  const handleUserMessageUpdate = (chatEntryIndex: number, newContent: string) => {
    const chatEntryToUpdateId = chatHistory[chatHistory.length > 0 ? chatEntryIndex : 0].id; // Ensure chatEntryIndex is valid
    const latestUserVersionIndex = chatHistory[chatEntryIndex].userMessage.versions.length; // This will be the new index

    setChatHistory(prevChatHistory => {
      return prevChatHistory.map((entry, index) => {
        if (index === chatEntryIndex) {
          const updatedVersions = [...entry.userMessage.versions, { content: newContent }];
          const updatedUserMessage: UserMessageData = {
            ...entry.userMessage,
            versions: updatedVersions,
            currentVersionIndex: updatedVersions.length - 1,
          };
          return {
            ...entry,
            userMessage: updatedUserMessage,
            // botResponses: [], // Clear old bot responses for this entry
            currentBotResponseIndex: -1, // No bot response for now
            isBotResponding: true, // Start loading for this entry
          };
        }
        return entry;
      });
    });
    setIsLoading(true); // Disable input while bot is thinking
    simulateBotResponse(chatEntryToUpdateId, newContent, latestUserVersionIndex);
  };

  const handleUserVersionChange = (chatEntryIndex: number, newVersionIndex: number) => {
    setChatHistory(prevChatHistory => {
      return prevChatHistory.map((entry, index) => {
        if (index === chatEntryIndex) {
          const correspondingBotResponseIndex = entry.botResponses.findIndex(
            res => res.userVersionIndex === newVersionIndex
          );
          console.log('correspondingBotResponseIndex', entry.botResponses);
          return {
            ...entry,
            userMessage: {
              ...entry.userMessage,
              currentVersionIndex: newVersionIndex,
            },
            currentBotResponseIndex: correspondingBotResponseIndex !== -1 ? correspondingBotResponseIndex : entry.currentBotResponseIndex,
            isBotResponding: false, // Ensure loading is off when changing versions
          };
        }
        return entry;
      });
    });
  };

  return (
    <>
      {/* Chat container */}
      <Container 
        maxWidth="md" 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {chatHistory.map((entry, chatEntryIndex) => (
          <Box key={entry.id}>
            <UserMessageComponent 
              messageIndex={chatEntryIndex}
              versions={entry.userMessage.versions.map(v => v.content)} 
              onUpdate={handleUserMessageUpdate}
              onVersionChange={handleUserVersionChange}
              currentVersionIndex={entry.userMessage.currentVersionIndex}
            />
            {entry.isBotResponding ? (
              <BotMessageComponent content="" isLoading={true} />
            ) : (
              entry.currentBotResponseIndex !== -1 && (
                <BotMessageComponent 
                  content={entry.botResponses[entry.currentBotResponseIndex]?.content || ''}
                  isLoading={false}
                />
              )
            )}
          </Box>
        ))}
        {/* Global isLoading for input field (e.g., when sending initial message) */}
        {/* {isLoading && chatHistory.length > 0 && chatHistory[chatHistory.length - 1].isBotResponding && (
          <BotMessageComponent content="" isLoading={true} />
        )} */}
      </Container>

      {/* Input form */}
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </>
  );
} 