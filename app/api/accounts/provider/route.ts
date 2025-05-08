import Account from "@/database/account.model"
import errorHandler from "@/lib/handlers/error"
import { NotFoundError, ValidationError } from "@/lib/http-error"
import dbConnect from "@/lib/mongoose"
import { AccountSchema } from "@/lib/validation"
import { APIErrorResponse } from "@/types/global"
import { NextResponse } from "next/server"

export async function POST(request:Request, {params}:{params: Promise<{id:string}>}) {
  const {providerAccountId} = await request.json()

  try {
    
    await dbConnect();

    const validatedData = AccountSchema.partial().safeParse({providerAccountId})

    if(!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors)

    const account = await Account.findOne({providerAccountId})

    if(!account) throw new NotFoundError('User not found')

    return NextResponse.json({success:true,data:account},{status:200})
  } catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}