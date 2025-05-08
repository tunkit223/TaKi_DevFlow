import User from "@/database/user.model"
import errorHandler from "@/lib/handlers/error"
import { NotFoundError, ValidationError } from "@/lib/http-error"
import { UserSchema } from "@/lib/validation"
import { APIErrorResponse } from "@/types/global"
import { NextResponse } from "next/server"

export async function POST(request:Request, {params}:{params: Promise<{id:string}>}) {
  const {email} = await request.json()

  try {
    
    const validatedData = UserSchema.partial().safeParse({email})

    if(!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors)

    const user = await User.findOne({email})

    if(!user) throw new NotFoundError('User not found')

    return NextResponse.json({success:true,data:user},{status:200})
  } catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}