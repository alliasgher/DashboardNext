import { insertUser } from "@/app/mongodb";
import bodyParser from "body-parser";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Set the size limit for the request body if needed
    },
  },
};



export const POST = async(req, res) => {
  if (req.method === "POST") {
    const { name, summary, age, pic } = req.body;

    

    console.log("Request Body:", req.body); // Log the request body to check its content
    console.log("User Data:", { name, summary, age, pic }); // Log the userData object
    const userData = { name, summary, age, pic };

    try {
      const result = await insertUser(userData);

      return new Response(JSON.stringify('User data saved successfully'), { status: 201 })
      res.status(201).json({ success: true, message: "User data saved successfully" });
    } catch (error) {
      console.error("Error saving user data:", error);
      return new Response("Failed to create a new prompt", { status: 500 });
    }
  } 
}
