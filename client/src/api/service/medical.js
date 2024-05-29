import API from "api/axios.config";
const MedicalService = {
    getAllPrice: () => {
      const url = '/services/allPrice'
      return API.get(url)
    },

    getAllAppointmentbyUserSession: () => {
      const url = '/services/appointment/getAllAppointmentbyUserSession'
      return API.get(url)
    },

    createAppointment: (body) => {
      const url = '/services/appointment/CreateAppointment'
      return API.get(url)
    },

    updateAppointment: (body) => {
      const url = '/services/appointment/updateAppointment'
      return API.get(url)
    },

    updateAppointmentStatus: (body) => {
      const url = '/services/appointment/updateStatus'
      return API.get(url)
    },

    deleteAppointment: (body) => {
      const url = '/services/appointment/deleteAppointment'
      return API.get(url)
    },
}
export default MedicalService