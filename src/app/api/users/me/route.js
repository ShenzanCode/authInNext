import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(req) {
    try {
        const userId= await getDataFromToken(req);
        const user = await User.findOne({_id:userId}).select("-password");
        console.log("user found in me page",user);
        return NextResponse.json({
            message:"user found",
            data:user
        })
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server Error" },{status:400});
        
    }
}