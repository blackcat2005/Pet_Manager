import API from "api/axios.config";

const ServiceHistoryAPI = {
    getStorageServicebyUser_ID: () => {
        const url = '/services/getStorageServicebyUser_ID'
        return API.get(url)
    },
    deleteStorageService: (body) => {
        const url = '/services/deleteStorageService'
        return API.delete(url, { data: body })
    },
    getAllBeautyService: () => {
        const url = '/services/getAllBeautybyUser_ID'
        return API.get(url)
    },
    deleteBeautyService: (body) => {
        const url = '/services/deleteBeauty'
        return API.delete(url, { data: body })
    },
    getAllAppointmentbyUserSession: () => {
        const url = '/services/appointment/getAllAppointmentbyUserSession'
        return API.get(url)
    },
    deleteAppointment: (body) => {
        const url = '/services/appointment/deleteAppointment'
        return API.delete(url, { data: body })
    },
}

export default ServiceHistoryAPI