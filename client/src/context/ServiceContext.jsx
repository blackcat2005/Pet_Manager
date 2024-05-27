import { createContext, useContext, useEffect, useState } from "react";
import service from "api/service";
import useAuth from "hooks/useAuth";
const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
    const [serviceAppointment, setServiceAppointment] = useState([]);
    const [serviceBeauty, setServiceBeauty] = useState([]);
    const [serviceStorage, setServiceStorage] = useState([]);

    const { userData } = useAuth()

    useEffect(() => {
        service.getTimePrice().then((response) => {
            setServiceAppointment(response.data.appointment)
            setServiceBeauty(response.data.beauty)
            setServiceStorage(response.data.storage)
        }).catch((error) => {
            console.error('Error fetching time price list:', error);
        });
    }, [userData]);

    return (
        <ServiceContext.Provider
            value={{
                serviceAppointment, setServiceAppointment,
                serviceBeauty, setServiceBeauty,
                serviceStorage, setServiceStorage,
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceContext;
