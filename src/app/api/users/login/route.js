import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    //check if user already exists
    const user = await User.findOne({ email:email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found exists" },
        { status: 400 }
      );
    }
    // Check if password matches
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        error: "Invalid credentials",
        status: 401,
      });
    }
    // Generate JWT token
    const tokenData= {
      id: user.id,
      username: user.username,
      email: user.email
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' });
    
    const response= NextResponse.json({
      message: "login successful",
      success: true
    })

    //set cookie
    response.cookies.set('token', token,{
      httpOnly: true,
    })
    return response;
  } catch (error) {
    console.log("internal server error: " + error);
  }
}
