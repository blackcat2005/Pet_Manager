const { ErrorHandler } = require("../helpers/error");
const { createStorageServicedb,
    createRoomInfodb, 
    createStorageRegistationdb,
    createStorageOrderdb,
    createBeautyServicedb,
    createAppointmentdb } = require("../db/servicePet.db")

class ServiceService {
    createStorageService = async(StorageService) => {
        try {
            return await createStorageServicedb(StorageService);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    };
    createStorageRegistation = async(StorageRegistation) =>{
        try {
            return await createStorageRegistationdb(StorageRegistation);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);            
        }
    };
    createStorageOrder = async(StorageOrder) => {
        try {
            return await createStorageOrderdb(StorageOrder);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);             
        }
    }
    createRoomInfo = async(RoomInfo) => {
        try {
            return await createRoomInfodb(RoomInfo);
        } catch (error) {
            throw new ErrorHandler(error.statusCode, error.message);
        }
    }
    // createRoomInfo = async(RoomInfo) => {
    //     try {
    //         return await createRoomInfodb(RoomInfo);
    //     } catch (error) {
    //         throw new ErrorHandler(error.statusCode, error.message);            
    //     }
    // }
    // createBeautyService = async(BeautyService) => {
    //     try {
    //         return await createBeautyServicedb(BeautyService);
    //     } catch (error) {
    //         throw new ErrorHandler(error.statusCode, error.message);
    //     }
    // }
    // createAppointment = async(Appointment) => {
    //     try {
    //         return await createAppointmentdb(Appointment);
    //     } catch (error) {
    //         throw new ErrorHandler(error.statusCode, error.message);
    //     }
    // }
    
}

module.exports = new ServiceService();