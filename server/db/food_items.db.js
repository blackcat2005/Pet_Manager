const pool = require("../config");

const createFoodItemDb = async ({
    name,
    amount, 
    unit, 
    description, 
    time,
    plan_id
  }) => {
    const { rows: fooditem } = await pool.query(
      `INSERT INTO "foodItem" (name, amount, unit, description, time, plan_id) 
          VALUES($1, $2, $3, $4, $5, $6) 
          returning food_id, plan_id, name, amount, unit, description, time`,
      [name, amount, unit, description, time, plan_id]
    );
    return fooditem[0];
  };

const getFoodItemListByPet_idDb = async (pet_id) => {
  const { rows: fooditemlist } = await pool.query(
    `SELECT "foodItem".*
    FROM "foodItem"
    WHERE "foodItem".plan_id IN (
        SELECT "dietPlans".plan_id
        FROM "dietPlans"
        JOIN "pets" ON "dietPlans".plan_id = "pets".plan_id
        WHERE "pets".pet_id = $1
    );
    `,
    [pet_id]
  );
  return fooditemlist;
};

const getFoodItemByIdDb = async (food_id) => {
    const { rows: foodItem } = await pool.query(
      `SELECT "foodItem".* FROM "foodItem" WHERE "foodItem".food_id = $1`,
      [food_id]
    );
    return foodItem[0];
  };

const updateFoodItemDb = async ({
    food_id,
    name,
    amount, 
    unit, 
    description, 
    time,
}) => {
  const { rows: foodItem } = await pool.query(
    `UPDATE "foodItem"
    SET name = $1, amount = $2, unit = $3, description = $4, time = $5
    WHERE food_id = $6
    RETURNING food_id, plan_id, name, amount, unit, description, time`,
    [name, amount, unit, description, time, food_id]
  );
  return foodItem[0];
};

const deleteFoodItemDb = async (food_id) => {
    const { rows: foodItem } = await pool.query(
        `DELETE FROM "foodItem" WHERE food_id = $1 returning *`,
        [food_id]
      );
      return foodItem[0];
  };
  

  module.exports = {
    createFoodItemDb,
    getFoodItemListByPet_idDb,
    getFoodItemByIdDb,
    updateFoodItemDb,
    deleteFoodItemDb
  }      