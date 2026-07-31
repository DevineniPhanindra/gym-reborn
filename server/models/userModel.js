const pool = require("../config/db");

const User = {
  // Find user by username
  findByUsername: async (username) => {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  },

  // Create new user
  create: async (username, password) => {
    const result = await pool.query(
      `INSERT INTO users (username, password)
       VALUES ($1, $2)
       RETURNING *`,
      [username, password]
    );

    return result.rows[0];
  },

  changePassword: async (id, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE id = $2
      `,
      [hashedPassword, id]
    );
  },
};

module.exports = User;
