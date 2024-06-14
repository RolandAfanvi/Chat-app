import { useState, useEffect } from "react";
import {auth } from "@/db/configFirebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const useClientAuth = () =>{
    const [user, setUser] = useState<User | null>(null);
    const [isFetch, setIsFetch] = useState(true);

    const router = useRouter();

    const loginWithGoogle = async ()=> {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if(user){
            router.push('/dashboard')
        }
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) =>{
            if(user){
                setUser(user);
                setIsFetch(false);
            }else{
                setUser(null);
                setIsFetch(false);
            }

        });
        return ()=> unsubscribe()
    }, [])

    const redirectIfAuthenticated = ()=> {
        if(user){
            router.push('/dashboard')
        }
    }
    
    return {user, isFetch, redirectIfAuthenticated, loginWithGoogle}

}

export default useClientAuth