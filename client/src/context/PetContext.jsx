import { createContext, useContext, useEffect, useState } from "react";
import pet from "api/pet";
import useAuth from "hooks/useAuth";
const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState(null);
  const {isLoggedIn} = useAuth()
  useEffect(() => {
    pet.getPetList().then((response) => {
        setPets(response.data);
    });
  }, [isLoggedIn]);

  return (
    <PetContext.Provider
      value={{ pets, setPets}}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContext;
