'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription, Form } from "@/components/ui/form"
import { User, UserPlusIcon, Lock, Mail, Building2, ArrowBigRight, Link, ArrowRight, ArrowLeft } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { error } from "console"
import axios from "axios"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/router"


const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  confirmPassword: z.string(),
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  country: z.string().min(1, "Provide a country name."),
  phone: z.string().min(10, "Phone number must be at least 10 characters.").max(10, "Phone number must be at most 10 characters."),
  termsAndConditions: z.boolean().refine((value) => value === true, { message: "You must accept the terms and conditions", }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>

export default function SignUpForm() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
    },
  })

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  async function onSubmit(values: FormData) {
    debugger
    axios.post('http://localhost:8000/auth/signup', JSON.stringify({username: values.username, email: values.email, password: values.password}), {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      toast.success('Account created successfully')
      window.location.href = '/login'
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  }

  const handleNext = async () => {
    const firstStepFields: (keyof FormData)[] = ["username", "email", "password", "confirmPassword"];
    const secondStepFields: (keyof FormData)[] = ["companyName"];
    const isValid = await form.trigger(current === 0 ? firstStepFields : secondStepFields);
    if (isValid) {
      api?.scrollTo(current + 1);
    }
  }

  const handlePrevious = () => {
    api?.scrollTo(current - 1)
  }

  const handleSubmit = async () => {
    const isValid = await form.trigger()
    if (isValid) {
      form.handleSubmit(onSubmit)()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 items-center justify-center flex p-4">
      <ToastContainer />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <UserPlusIcon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome to QuantM.AI</CardTitle>
          <CardDescription className="text-center text-lg">
            Complete your profile in two simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  <CarouselItem className="space-y-4">
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="john@example.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
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
                                onChange={(e) => {
                                  field.onChange(e);
                                  // Trigger confirm password validation when password changes
                                  if (form.getValues("confirmPassword")) {
                                    form.trigger("confirmPassword");
                                  }
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CarouselItem>

                  <CarouselItem className="space-y-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="Acme Inc." className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="India" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact No.</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input placeholder="India" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="termsAndConditions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 pl-0">
                          <FormControl>
                            <Checkbox 
                            
                              checked={field.value}
                              onCheckedChange={field.onChange}
                             
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the terms and conditions
                            </FormLabel>
                            
                          </div>
                        </FormItem>
                      )}
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>

              <div className="flex items-center justify-between gap-4 pt-4">
                <Button
                  type="button"
                 
                  onClick={handlePrevious}
                  disabled={current === 0}
                  className="bg-primary hover:bg-primary/90"
                >
                  <ArrowLeft className="ml-2 h-4 w-4" />Previous 
                </Button>
                {current === count - 1 ? (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Create Account
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}