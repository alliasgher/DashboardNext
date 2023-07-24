import { insertUser, getAllUsers } from "@/app/mongodb";
import { NextResponse } from 'next/server';




export const POST = async(req, res) => {
  if (req.method === "POST") {
    const { name, summary, age, pic } = await req.json();

    

    console.log("User Data:", { name, summary, age, pic }); 
    const userData = { name, summary, age, pic };

    try {
      const result = await insertUser(userData);

      return new Response(JSON.stringify('User data saved successfully'), { status: 201 })
    } catch (error) {
      console.error("Error saving user data:", error);
      return new Response("Failed to create a new prompt", { status: 500 });
    }
  } 
}



export async function GET() {
  try {
    const users = await getAllUsers();
    console.log(users);

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error({ message: "An error occurred while fetching users" });
  }
}

