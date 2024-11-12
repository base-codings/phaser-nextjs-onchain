import { createContext } from "react";

interface UserIF {}

const defaultUser: UserIF = {};

const UserContext = createContext<UserIF>(defaultUser);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export { UserContext };
export default UserProvider;
