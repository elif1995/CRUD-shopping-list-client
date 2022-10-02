import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider ({children}) {

  const [currentUser, setCurrentUser] = useState('')

  return(
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext