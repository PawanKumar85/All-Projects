import oracledb from "oracledb";

export const postEmp = async (req, res) => {
  try {
    const { eid,ename, esalary } = req.body;
    const connection = await oracledb.getConnection();

    const result = await connection.execute(
      `INSERT INTO Employee (eid,ename, esalary) VALUES (:eid,:ename, :esalary)`,
      [eid,ename, esalary],
      { autoCommit: true }
    );

    return res
      .status(201)
      .json({ message: "Employee created", eid: result.lastRowid });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating employee",
      error: error.message,
    });
  }
};

export const getEmps = async (req, res) => {
  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute("SELECT * FROM Employee");
    return res.json({
      message: "Employees fetched successfully",
      employees: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching employees",
      error: error.message,
    });
  }
};
