import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = React.createContext([null, () => {}]);

function AuthProvider(props) {
    const [token, setToken] = useLocalStorage("auth", null);
   return <AuthContext.Provider value={[token, setToken]}>{props.children}</AuthContext.Provider>
  
}

export default AuthProvider