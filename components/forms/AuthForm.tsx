"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValue, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form"
import { object, z, ZodType } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import ROUTES from "@/constants/route"



interface AuthFormProps<T extends FieldValues>{
  schema: ZodType<T>;
  defaultValues:T,
  onSubmit:(data: T) => Promise<{success : boolean}>,
  formType:"SIGN_IN"|"SIGN_UP"
}

function AuthForm <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>){
 
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  })

  const handlerSubmit: SubmitHandler<T> = async () =>{
    //TODO: Authenticate User
  }
    
  
  const buttonText = formType ==="SIGN_IN" ?"Sign In" : "Sign Up"
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlerSubmit)} 
        className="mt-6 space-y-2">
        {Object.keys(defaultValues).map((field)=>(
           <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="paragraph-medium text-dark400_light700">
                {field.name === 'email' ?"Email Address":field.name.charAt(0).toUpperCase()+field.name.slice(1)}</FormLabel>
              <FormControl>
                <Input 
                  required 
                  type={field.name==='password' ? "password" 
                  :"text"}
                  {...field} 
                  className="paragraph-regular background-light900_dark300 light-border-2
                            text-dark300_light700 no-focus min-h-11 rounded-1.5 border"
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        ))}
       
        <Button 
          disabled={form.formState.isSubmitting} 
          type="submit"
          className="primary-gradient paragraph-medium w-full rounded-2 px-4 py-3 min-h-12 text-light-900"
          >
            {form.formState.isSubmitting 
            ?buttonText === "Sign In" 
            ? "Signing In..."
            : "Signing Up..."
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? <p>
          Don't have an account?
          <Link href={ROUTES.SIGN_UP}
                className="paragraph-semibold primary-text-gradient"
          >{" "}Sign up</Link>
        </p> :<p>
          Already have an account? 
          <Link href={ROUTES.SIGN_IN}
                className="paragraph-semibold primary-text-gradient"
          >{" "}Sign in</Link>
          </p>}
      </form>
    </Form>
  )
}
export default AuthForm
