const {
  createPetDb,
  getPetListByUser_idDb,
  getPetByIdDb,
  updatePetDb,
  deletePetDb,
  getDetailPetdb,
} = require('../db/pets.db')
  const { ErrorHandler } = require("../helpers/error");
class PetService {
  createPet = async (pet) => {
      try {
        return await createPetDb(pet);
      } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
  };
  getUserPetsByUser_Id = async (user_id) => {
    try {
        const pets = await getPetListByUser_idDb(user_id);
        return pets;
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  getPetById = async (pet_id) => {
    try {
        const pet = await getPetByIdDb(pet_id);
        return pet;
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  updatePet = async (pet) => {
    const { fullname, species, age, weight, sex, health, describe, avatar } = pet;
    const errors = {};
    try {
        if (Object.keys(errors).length > 0) {
          throw new ErrorHandler(403, errors);
        }
        return await updatePetDb(pet);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};
  deletePet = async (pet_id) => {
    try {
        return await deletePetDb(pet_id);
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
  };



}


module.exports = new PetService();