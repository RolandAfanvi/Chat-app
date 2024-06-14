"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import SendMessage from '../components/SendMessage'
import useClientAuth from '../hooks/useClientAuth'
import { useRouter } from 'next/navigation'



export default function PageChat() {


  const router = useRouter()
  const {user, isFetch} = useClientAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    if(!isFetch){
      setIsLoading(false)
    }
  },[isFetch])

  useEffect(()=>{
    if(!isLoading && !user){
      router.push('/')
    }
  },[user, isLoading, router])

  return (
    <div className="w-full h-screen">
      <ChatContainer/>
      <SendMessage/>
    </div>
  )
}
