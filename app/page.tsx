"use client"

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import useClientAuth from "./hooks/useClientAuth";

export default function Home() {

  const {loginWithGoogle} = useClientAuth()

  return (
    <section className="w-full h-screen flex items-center justify-center p-3">
      <div className="max-w-[1000px] m-auto flex items-center justify-center flex-col gap-5 text-center">
        <h1 className="text-6xl uppercase font-black">CHAT
          <span className="text-blue-600">APP</span>
        </h1>

        <div className="container mx-auto px-4 py-8">
        
        <div className="bg-white  text-black rounded-lg p-6 mt-4">
         

          <h2 className="text-xl uppercase font-semibold mb-2">Pourquoi Choisir ChatApp?</h2>
          <p>ChatApp est plus qu'une simple application de chat ; c'est une plateforme qui valorise les interactions humaines dans un monde digital. Notre mission est de fournir un service de chat sécurisé, convivial et accessible à tous. Que vous cherchiez à rester en contact avec vos proches, à collaborer avec des collègues ou simplement à discuter de vos passions préférées, ChatApp est là pour vous accompagner.</p>
          <p className="mt-4"><strong>Rejoignez la communauté ChatApp aujourd'hui</strong> et découvrez pourquoi tant d'utilisateurs choisissent cette application pour leurs besoins de communication instantanée.</p>
        
        </div>

 
      </div>

     
        <button onClick={loginWithGoogle} className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md p-2 flex items-center gap-2">
          <FcGoogle />
          <span> Se connecter avec Google</span>
        </button>
        
      </div>
    </section>

  );
}
