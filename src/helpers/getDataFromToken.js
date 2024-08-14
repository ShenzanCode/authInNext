import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken=(request)=>{
    try {
        const token=request.cookies.get('token')?.value || "";
        const decodedTokken= jwt.verify(token,process.env.TOKEN_SECRET_KEY);
        return decodedTokken.id;

        
    } catch (error) {
        throw new Error(error.message)
        
    }
}