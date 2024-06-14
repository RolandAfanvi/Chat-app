import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { collection, query, onSnapshot, orderBy, limit, QuerySnapshot } from 'firebase/firestore'
import { db } from '@/db/configFirebase'
import useClientAuth from '../hooks/useClientAuth'
import { Interface } from 'readline'


interface Message{
  id: string;
  name: string;
  text: string;
  avatar: string;
  createAt: string;

}



export default function ChatContainer() {

  const [data, setData] = useState<Message[]>([])
  const {user} = useClientAuth()

  useEffect(()=>{
    const q = query(collection(db, "conversations"), orderBy('createAt'), limit(50))
    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      const messages: Message[] = [];
      querySnapshot.forEach((doc)=>{
        const data = doc.data();
        messages.push({
          id: data.id,
          name: data.name,
          text: data.text,
          avatar: data.avatar,
          createAt: data.createAt ? data.createAt.toDate(): new Date()

        })
      });
      setData(messages)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="max-w-[700px] h-screen m-auto">
      <ul className="flex flex-col gap-3 p-10 pb-[150px]">
        {
          data.map((msg, index)=>(
            <li key={index} className={`relative flex items-center p-3 max-w-xs rounded-lg ${msg.id === user?.uid ? 'self-end rounded-br-none bg-blue-300 text-blue-900' : 'self-start rounded-bl-none bg-gray-300 text-gray-900' }`}>
              <Image src={msg.avatar} alt="user icon" width={40} height={40} className="rounded-full mr-3"/>
              <div className="whitespace-normal overflow-hidden">
                <p className="font-bold">{msg.name}</p>
                <p >{msg.text}</p>
                <span className="text-xs text-gray-600">{msg.createAt.toLocaleString()}</span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
