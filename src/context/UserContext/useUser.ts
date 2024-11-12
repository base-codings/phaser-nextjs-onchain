import { useContext } from 'react';
import { UserContext } from './UserProvider';

const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export default useUser;
