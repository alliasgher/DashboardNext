import { insertUser } from "../mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, summary, age, pic } = req.body;

  const userData = { name, summary, age, pic };

  try {
    const result = await insertUser(userData);

    res
      .status(201)
      .json({ success: true, message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while saving user data",
      });
  }
}
