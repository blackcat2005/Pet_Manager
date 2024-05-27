import { createContext, useContext, useEffect, useState } from "react";
import pet from "api/pet";
import useAuth from "hooks/useAuth";
import service from "api/service";
const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [customerServices, setCustomerServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const { userData } = useAuth()

  useEffect(() => {
    if (userData && userData.roles === 'customer') {
      service.getAllServiceByUserId().then((response) => {
        console.log(response.data);
        setCustomerServices(response.data);
      }).catch((error) => {
        console.error('Error fetching customer pet list:', error);
      });
    }
  }, [userData]);
  
  // useEffect(() => {
  //   if (userData && (userData.roles === 'staff' || userData.roles === 'admin')) {
  //     pet.getAllPet().then((response) => {
  //       setAllPets(response.data);
  //     }).catch((error) => {
  //       console.error('Error fetching all pets:', error);
  //     });
  //   }
  // }, [userData]);

  return (
    <ServiceContext.Provider
      value={{ customerServices, setCustomerServices, allServices, setAllServices }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;
