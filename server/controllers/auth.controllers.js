import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all details" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    // 🔑 ISSUE TOKEN (THIS IS THE FIX)
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Register Admin Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


/* ================= LOGIN ADMIN ================= */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Check admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Login Admin Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export { registerAdmin, loginAdmin };
