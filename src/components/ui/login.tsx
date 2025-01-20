"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc";
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation";
import { useContext } from "react";


import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { User, Lock, ArrowRight, LogIn } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import { Separator } from "@/components/ui/separator"

import { LoginContext } from "@/components/context/loginContext";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios";
import Link from "next/link";

//axios.defaults.withCredentials = true;



const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be provided.",
  }),
  password: z.string().min(1, {
    message: "Password must be provided.",
  }),
})

export default function ProfileForm() {
  // ...
  // 1. Define your form.
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const submittedData = { username: values.username, password: values.password }

    axios.post('http://localhost:8000/auth/login', JSON.stringify(submittedData), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((response) => {

      

      toast.success('Login Successfull');
    

      //router.push('/');
      window.location.href = '/';
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <ToastContainer />
      <Card className="w-full max-w-md relative bg-slate-900/90 border-slate-700 shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <LogIn className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome to QuantM.AI</CardTitle>
          <CardDescription className="text-center">
            Enter your details to LogIn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="johndoe" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Enter a secure password for your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-md">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
          <div className="flex w-full items-center justify-between">
            <Separator className="my-4 w-2/5" />
            <small>OR</small>
            <Separator className="my-4 w-2/5" />
          </div>
          <div className="flex justify-center mt-6" >
            <Badge className="w-full max-w-md relative bg-slate-900/90 border-slate-700 shadow-2xl p-2 flex justify-center text-md"
            onClick={() => {
              // axios.get("http://localhost:8000/oauth/google").then((response) => {
              //   console.log(response);
              //   console.log(response.data);
              // }).catch((error) => {
              //   console.log("error")
              //   toast.error(error.response.data.message);
              // })
              router.push('http://localhost:8000/oauth/google'); 
              //window.open('http://localhost:8000/oauth/google', '_blank');
            }} variant="secondary">Continue with Google <FcGoogle className="ms-2" /> </Badge>
          </div>
          <CardFooter className="flex justify-center mt-4">
  <small className="text-gray-600">
    Don’t have an account?{' '}
    <Link href="/signup" className="underline text-blue-500 hover:text-blue-700">
      Sign Up
    </Link>
  </small>
</CardFooter>

        </CardContent>
      </Card>
    </div>

  )
}
