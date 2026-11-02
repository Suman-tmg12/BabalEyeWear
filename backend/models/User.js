const pool = require("../config/db");  
  
const findByEmail = async (email) => {  
  try {  
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [  
      email,  
    ]);  
    return result.rows[0];  
  } catch (error) {  
    console.error("Error finding user:", error);  
    throw new error("Database error");  
  }  
};  
  
// CHANGE THIS FUNCTION
const createUser = async (email, passwordHash, firstName, lastName, phone) => {  
  try {  
    const query = `  
      INSERT INTO users (email, password, first_name, last_name, phone)   
      VALUES ($1, $2, $3, $4, $5)   
      RETURNING id, email, role, created_at  
    `;  
    const values = [email, passwordHash, firstName, lastName, phone || null];  
    const result = await pool.query(query, values);  
    return result.rows[0];  
  } catch (error) {  
    console.error("Error creating user:", error);  
    if (error.code === "23505") {  
      throw new Error("Email already exists");  
    }  
    throw new Error("Failed to create user");  
  }  
};  
  
module.exports = { findByEmail, createUser };  