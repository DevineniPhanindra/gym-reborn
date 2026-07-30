const bcrypt = require("bcrypt");
const pool = require("./config/db"); // Adjust the path if needed

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await pool.query(
      `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      `,
      ["admin", hashedPassword]
    );

    console.log("✅ Admin user created successfully.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();