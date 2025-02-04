"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { User, Lock, ArrowRight, LogIn } from "lucide-react"
import { ToastContainer, toast } from 'react-toastify'
import { Separator } from "@/components/ui/separator"
import { LoginContext } from "@/components/context/loginContext"
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
import axios from "axios"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be provided.",
  }),
  password: z.string().min(1, {
    message: "Password must be provided.",
  }),
})

export default function ProfileForm() {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    debugger;
    try {
      const submittedData = {
        username: values.username,
        password: values.password
      }

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, JSON.stringify(submittedData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })

      toast.success('Login Successful')
      window.location.href = '/'
      setIsLoggedIn(true)

    } catch (error: any) {
      debugger;
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-md mx-auto">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <Card className="w-full backdrop-blur-md bg-slate-900/90 border-slate-800/50 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 pt-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-slate-800/50 ring-1 ring-slate-700/50">
                <LogIn className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r text-white text-transparent bg-clip-text">
              Welcome to QuantM.AI
            </h2>
            <p className="text-slate-400 text-center text-sm">
              Enter your credentials to access your account
            </p>
          </CardHeader>

          <CardContent className="space-y-8 pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Username</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 transition-colors group-hover:text-blue-400" />
                          <Input
                            placeholder="Enter your username"
                            className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-400 focus:ring-blue-400/10 transition-all text-[#fff]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">Password</FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 transition-colors group-hover:text-blue-400" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-400 focus:ring-blue-400/10 transition-all text-[#fff]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r hover:from-blue-600 transition-all duration-300 text-white font-medium py-2"
                >
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>

            <div className="flex w-full items-center justify-between">
              <Separator className="my-4 w-2/5" />
              <small className="text-[#fff]">OR</small>
              <Separator className="my-4 w-2/5" />
            </div>

            <Button
              variant="outline"
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth/google`)}
              className="w-full bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 text-slate-200 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </CardContent>

          <CardFooter className="justify-center pb-8">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}