import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { User as FirebaseUser, UserCredential } from "firebase/auth"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, updateEmail, updatePassword } from "firebase/auth"

type AuthContextValues = {
    currentUser: FirebaseUser | null,
    login: (email: string, password: string) => Promise<UserCredential>,
    signup: (email: string, password: string) => Promise<UserCredential>,
    logout: () => Promise<void>,
    resetPassword: (email: string) => Promise<void>,
    updateAppEmail: (email: string) => Promise<void>,
    updateAppPassword: (password: string) => Promise<void>
}

const AuthContext = React.createContext<AuthContextValues | null>(null)

export function useAuth() {
    return useContext(AuthContext)
}

type AuthProviderProps = {
    children: any
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null)
    const [loading, setLoading] = useState(true)

    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email: string) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateAppEmail(email: string): Promise<void> {
        if (currentUser == null) {
            return Promise.reject(new Error('Could not update email'))
        }
        return updateEmail(currentUser, email)
    }

    function updateAppPassword(password: string): Promise<void> {
        if (currentUser == null) {
            return Promise.reject(new Error('Could not update password'))
        }
        return updatePassword(currentUser, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: FirebaseUser | null) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateAppEmail,
        updateAppPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}