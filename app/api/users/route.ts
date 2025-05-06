import User from "@/database/user.model";
import errorHandler from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try { 
    await dbConnect();

    const users = await User.find();

    return NextResponse.json({success:true, data:users},{status:200});
  
  } catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}

//Create User
export async function POST(request:Request) {
  try { 

    await dbConnect();

    const body = await request.json();

    const validatedData = UserSchema.safeParse(body);

    if(!validatedData.success){
      return new ValidationError(validatedData.error.flatten().fieldErrors)
    } 

    const {email, username} = validatedData.data;

    const existingUser = await User.findOne({email});

    if(existingUser){
      return new ValidationError({email:["Email already exists"]});
    }

    const existingUsername = await User.findOne({username});

    if(existingUsername){
      return new ValidationError({username:["Username already exists"]});
    }

    const newUser = await User.create(validatedData.data);

    return NextResponse.json({success:true, data:newUser},{status:200});
  }
  catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}