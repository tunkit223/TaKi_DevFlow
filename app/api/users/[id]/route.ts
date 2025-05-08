import User from "@/database/user.model";
import errorHandler from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

// GET/api/users/[id]
export async function GET(request:Request, {params}:{params: Promise<{id:string}>}) {
  const {id} = await params;
  
  if(!id) throw new NotFoundError('User not found')

  try {
    
    await dbConnect();

    const user = await User.findById(id);

    if(!user) throw new NotFoundError('User not found')

    return NextResponse.json({success:true, data:user},{status:200});

  } catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}

//DELETE/api/users/[id]
export async function DELETE(request:Request, {params}:{params: Promise<{id:string}>}) {
  const {id} = await params;
  
  if(!id) throw new NotFoundError('User not found')
  
  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);

    if(!user) throw new NotFoundError('User not found')

    return NextResponse.json({success:true, data:user},{status:204});
  } catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}

//PUT/api/users/[id]
export async function PUT(request:Request, {params}:{params: Promise<{id:string}>}) {
  const {id} = await params;
  
  if(!id) throw new NotFoundError('User not found')

  try {

    await dbConnect();

    const body = await request.json();

    const validatedData = UserSchema.partial().parse(body);

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {new:true});

    if(!updatedUser) throw new NotFoundError('User not found')

    return NextResponse.json({success:true,data:updatedUser},{status:200});

  } catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}