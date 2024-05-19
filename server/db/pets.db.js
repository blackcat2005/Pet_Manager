const pool = require("../config");

const createPetDb = async ({
    fullname, 
    species, 
    age, 
    weight, 
    sex, 
    health, 
    describe,
    avatar,
    user_id
  }) => {
    const { rows: pet } = await pool.query(
      `INSERT INTO pets(fullname, species, age, weight, sex, health, describe, avatar, user_id) 
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
          returning pet_id, fullname, species, age, weight, sex, health, describe, avatar, user_id`,
      [fullname, species, age, weight, sex, health, describe, avatar, user_id]
    );
    return pet[0];
  };

const getPetListByUser_idDb = async (user_id) => {
  const { rows: pets } = await pool.query(
      "SELECT * FROM pets WHERE user_id = $1",
      [user_id]
  );
  return pets;
};

const getPetByIdDb = async (pet_id) => {
  const { rows: pet } = await pool.query(
    "SELECT pets.* FROM pets WHERE pets.pet_id = $1",
    [pet_id]
  );
  return pet[0];
};

const deletePetDb = async (pet_id) => {
  const { rows: pet } = await pool.query(
    "DELETE FROM pets WHERE pet_id = $1 returning *",
    [pet_id]
  );
  return pet[0];
};

const updatePetDb = async ({
  pet_id,
  fullname,
  species,
  age,
  weight,
  sex,
  health,
  describe,
  avatar
}) => {
  const { rows: pet } = await pool.query(
    `UPDATE pets set fullname = $1, species = $2, age = $3, weight = $4, sex = $5, health = $6, describe = $7, avatar = $8
        WHERE pet_id = $9 returning fullname, species, age, weight, sex, health, describe, avatar, user_id`,
    [fullname, species, age, weight, sex, health, describe, avatar, pet_id]
  );
  return pet[0];
};

  module.exports = {
    createPetDb,
    getPetListByUser_idDb,
    getPetByIdDb,
    updatePetDb,
    deletePetDb
  }      