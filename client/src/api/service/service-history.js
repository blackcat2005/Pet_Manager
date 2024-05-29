import API from "api/axios.config";

const ServiceHistoryAPI = {
    getAllPrice: () => {
        const url = '/services/allPrice'
        return API.get(url)
    },
    getStorageServicebyUser_ID: () => {
        const url = '/services/getStorageServicebyUser_ID'
        return API.get(url)
    },
    getDetailPet: () => {
        const url = '/services/detailPet'
        return API.get(url)
    },
    getAllBeautyService: () => {
        const url = '/services/getAllBeautybyUser_ID'
        return API.get(url)
    },
    getAllAppointmentbyUserSession: () => {
        const url = '/services/appointment/getAllAppointmentbyUserSession'
        return API.get(url)
    },
    deleteBeautyService: (body) => {
        const url = '/services/deleteBeauty'
        return API.delete(url, { data: body })
    },
    deleteStorageService: (body) => {
        const url = '/services/deleteStorageService'
        return API.delete(url, { data: body })
    },
    deleteAppointment: (body) => {
        const url = '/services/appointment/deleteAppointment'
        return API.delete(url, { data: body })
    },
}

export default ServiceHistoryAPI