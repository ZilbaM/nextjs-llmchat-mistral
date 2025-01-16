import React, { useState } from 'react'
import Sidebar from './Sidebar'
import InputText from './InputText';
import Button from './Button';
import { MessageType } from '@/utils/types';

type Props = {
    conversationId?: string;
    conversations: string[];
    messages: MessageType[];
    onSend: (message: string) => void
}

const ChatLayout : React.FC<Props> = function({
    messages = [],
    conversations = [],
    conversationId,
    onSend
}: Props) {
    const [message, setMessage] = useState('')

  return (
    <div className='flex w-screen h-screen'>
        <Sidebar conversations={conversations} conversationId={conversationId} />
        <main className='w-full h-full py-16 flex flex-col items-center'>
            <div className='w-3/5 h-full flex flex-col justify-between items-center'>
            <ul className='flex flex-col gap-2 '>
            {messages.length === 0 && (
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-4xl'>AI Chatbot</h2>
                <p>Write a message to start a conversation !</p>
            </div>
        )}
                {messages.map((messageItem, idx) => {
                    const key = `${messageItem}_${idx}`
                    return (
                        <li className='flex gap-2' key={key}>
                            {
                                messageItem.role == 'user' ? (
                                    <div>
                                        <span className='font-bold'>You:</span>
                                    </div>
                                ) : (
                                    <div>
                                        <span className='font-bold'>AI:</span>
                                    </div>
                                )
                            }
                            <p>{messageItem.content}</p>
                        </li>
                    )
                })}
            </ul>
            <div className='w-2/3 flex gap-8 border border-gray-200 p-6 items-center'>
                <InputText fullWidth placeholder="Message" type='text' onChange={(e) => {setMessage(e.target.value)}} value={message} />
                <Button variant='outlined' onClick={() => {onSend(message)}} disabled={message.length == 0}>Send</Button>
            </div>
            </div>
        </main>
    </div>
  )
}

export default ChatLayout