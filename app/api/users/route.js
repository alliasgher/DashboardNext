import { insertUser } from "@/app/mongodb";

export const POST = async(req, res) => {
  if (req.method === "POST") {
    const { name, summary, age, pic } = req.body;
    const userData = { name, summary, age, pic };

    try {
      const result = await insertUser(userData);

      res.status(201).json({ success: true, message: "User data saved successfully" });
    } catch (error) {
      console.error("Error saving user data:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while saving user data",
      });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
