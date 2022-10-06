import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider ({children}) {

  const [currentUser, setCurrentUser] = useState('')
  const [isLogged, setIsLogged] = useState(false)

  return(
    <UserContext.Provider value={{currentUser, setCurrentUser, isLogged, setIsLogged}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext