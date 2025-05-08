import Account from "@/database/account.model";
import errorHandler from "@/lib/handlers/error";
import { ForbiddenError, ValidationError } from "@/lib/http-error";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validation";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try { 
    await dbConnect();

    const accounts = await Account.find();

    return NextResponse.json({success:true, data:accounts},{status:200});
  
  } catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}

//Create Account
export async function POST(request:Request) {
  try { 

    await dbConnect();

    const body = await request.json();

    const validatedData = AccountSchema.parse(body);

    const existingAccount = await Account.findOne(
      {provider: validatedData.provider,
       providerAccountId: validatedData.providerAccountId}
    );

    if(existingAccount){
      throw new ForbiddenError('Account already exists');
  }

    const newAccount = await Account.create(validatedData);

    return NextResponse.json({success:true,data:newAccount},{status:201});
}
  catch (error) {
    return errorHandler(error,'api') as APIErrorResponse
  }
}