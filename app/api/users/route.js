import { deleteUser, insertUser, getAllUsers, editUser } from "@/app/mongodb";
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

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error({ message: "An error occurred while fetching users" });
  }
}


export async function DELETE(req) {
  try {
    const userId = await req.json();
    console.log('Received userId:', userId); // Add this log statement
    const result = await deleteUser(userId);
    console.log("User deleted:", result);
    return NextResponse.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ success: false, message: "An error occurred while deleting user" });
  }
}


export async function PATCH(req) {
  try {
    const { userId, userInfo } = await req.json();
    console.log('Received userId:', userId); 
    console.log('Received userinfo:', userInfo); 
    const result = await editUser(userId, userInfo);
    console.log("User edited:", result);
    return NextResponse.json({ success: true, message: "User edited successfully" });
  } catch (error) {
    console.error("Error editing user:", error);
    return NextResponse.json({ success: false, message: "An error occurred while editing user" });
  }
}