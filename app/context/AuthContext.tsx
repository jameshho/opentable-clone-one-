"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useEffect } from "react";
import { fetchUser } from "@/hooks/auth";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: true,
  error: null,
  data: null,
  setAuthState: () => { },

});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  

  useEffect(() => {
    fetchUser(setAuthState);
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,

      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}