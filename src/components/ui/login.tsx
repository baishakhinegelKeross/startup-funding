"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User, Lock, ArrowRight,LogIn } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';

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

//axios.defaults.withCredentials = true;

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be provided.",
  }),
  password: z.string().min(1, {
    message: "Password must be provided.",
  }),
})

export default function  ProfileForm() {
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    debugger
    const submittedData = {username: values.username, password: values.password}

    axios.post('http://192.168.3.7:8080/auth/login', JSON.stringify(submittedData), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((response) => {
      
      toast.success('Login Successful');
      window.location.href = '/';
    }).catch((error) => {
      toast.error(error.response.data.message);
    }); 
    console.log(values)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <ToastContainer />
      <Card className="w-full max-w-md">
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
                <Button type="submit"  className="w-full">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
      </Card>
    </div>
    
  )
}
