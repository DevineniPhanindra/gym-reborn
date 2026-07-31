const pool = require("../config/db");

const Member = {
  // Get all members
  getAll: async () => {
    const result = await pool.query(
      "SELECT * FROM members ORDER BY id DESC"
    );
    return result.rows;
  },

  // Get member by ID
  getById: async (id) => {
    const result = await pool.query(
      "SELECT * FROM members WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  // Create member
  create: async (member) => {
    const {
      name,
      phone,
      email,
      gender,
      age,
      address,
      join_date,
      membership_start_date,
      membership_end_date,
    } = member;

    const result = await pool.query(
      `INSERT INTO members
      (name, phone, email, gender, age, address,
       join_date, membership_start_date,
       membership_end_date)

      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9)

      RETURNING *`,
      [
        name,
        phone,
        email,
        gender,
        age,
        address,
        join_date,
        membership_start_date,
        membership_end_date,
      ]
    );

    return result.rows[0];
  },

  // Update member
  update: async (id, member) => {
    const {
      name,
      phone,
      email,
      gender,
      age,
      address,
      join_date,
      membership_start_date,
      membership_end_date,
      status,
    } = member;

    const result = await pool.query(
      `UPDATE members
       SET
       name=$1,
       phone=$2,
       email=$3,
       gender=$4,
       age=$5,
       address=$6,
       join_date=$7,
       membership_start_date=$8,
       membership_end_date=$9,
       status=$10,
       updated_at=NOW()
       WHERE id=$11
       RETURNING *`,
      [
        name,
        phone,
        email,
        gender,
        age,
        address,
        join_date,
        membership_start_date,
        membership_end_date,
        status,
        id,
      ]
    );

    return result.rows[0];
  },

  // Delete member
  delete: async (id) => {
    await pool.query(
      "DELETE FROM members WHERE id = $1",
      [id]
    );
  },

  // Renew membership
 renew: async (id, endDate) => {
  const result = await pool.query(
    `UPDATE members
     SET membership_end_date=$1,
         status='Active',
         reminder_sent = FALSE,
         updated_at=NOW()
     WHERE id=$2
     RETURNING *`,
    [endDate, id]
  );

  return result.rows[0];
},

  // Dashboard Statistics
  getStats: async () => {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS total_members,

        COUNT(*) FILTER (
          WHERE membership_end_date >= CURRENT_DATE
        ) AS active_members,

        COUNT(*) FILTER (
          WHERE membership_end_date < CURRENT_DATE
        ) AS expired_members,

        COUNT(*) FILTER (
          WHERE membership_end_date BETWEEN CURRENT_DATE
          AND CURRENT_DATE + INTERVAL '7 days'
        ) AS expiring_soon

      FROM members;
    `);

    return result.rows[0];
  },

  // Members expiring within next 7 days
  getExpiringMembers: async () => {
  const result = await pool.query(`
    SELECT *
    FROM members
    WHERE membership_end_date BETWEEN CURRENT_DATE
    AND CURRENT_DATE + INTERVAL '7 days'
    ORDER BY membership_end_date ASC;
  `);

  return result.rows;
},

getReminderMembers: async () => {
  const result = await pool.query(`
    SELECT *
    FROM members
    WHERE membership_end_date BETWEEN CURRENT_DATE
      AND CURRENT_DATE + INTERVAL '7 days'
      AND reminder_sent = FALSE
    ORDER BY membership_end_date ASC;
  `);

  return result.rows;
},
 // Check if email already exists
emailExists: async (email) => {
  const result = await pool.query(
    "SELECT id FROM members WHERE email = $1",
    [email]
  );

  return result.rows.length > 0;
},

  markReminderSent: async (id) => {
    await pool.query(
      `
      UPDATE members
      SET reminder_sent = TRUE
      WHERE id = $1
    `,
      [id]
    );
  },
};

module.exports = Member;
