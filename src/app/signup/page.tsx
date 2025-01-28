'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type CarouselApi } from "@/components/ui/carousel"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { User, UserPlusIcon, Lock, Mail, Building2, ArrowRight, ArrowLeft, Phone } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"

const countries = [
  { code: 'IN', name: 'India', phone: '+91' },
  { code: 'US', name: 'United States', phone: '+1' },
  { code: 'GB', name: 'United Kingdom', phone: '+44' },
  { code: 'CA', name: 'Canada', phone: '+1' },
  { code: 'AU', name: 'Australia', phone: '+61' },
  { code: 'DE', name: 'Germany', phone: '+49' },
  { code: 'FR', name: 'France', phone: '+33' },
  { code: 'JP', name: 'Japan', phone: '+81' },
  { code: 'SG', name: 'Singapore', phone: '+65' },
  { code: 'AE', name: 'UAE', phone: '+971' },
];

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
  country: z.string().min(1, "Please select a country."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").max(10, "Phone number must be at most 10 digits."),
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
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      country: "",
      phone: "",
      termsAndConditions: false,
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
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/signup`, JSON.stringify({
      username: values.username,
      email: values.email,
      password: values.password,
      companyName: values.companyName,
      country: values.country,
      phone: `${selectedCountry.phone}${values.phone}`
    }), {
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      toast.success('Account created successfully')
      window.location.href = '/login'
    }).catch((error) => {
      toast.error(error.response?.data?.message || 'An error occurred');
    })
  }

  const handleNext = async () => {
    const firstStepFields: (keyof FormData)[] = ["username", "email", "password", "confirmPassword"];
    const secondStepFields: (keyof FormData)[] = ["companyName", "country", "phone", "termsAndConditions"];
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
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <ToastContainer />
      <Card className="w-full max-w-md relative bg-slate-900/90 border-slate-700 shadow-2xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-indigo-500/20 p-4">
              <UserPlusIcon className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">Welcome to QuantM AI</CardTitle>
          <CardDescription className="text-center text-lg text-slate-300">
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
                          <FormLabel className="text-slate-200">Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input placeholder="johndoe" className="pl-10 bg-slate-800/50 border-slate-700 text-white" {...field} />
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
                          <FormLabel className="text-slate-200">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input placeholder="john@example.com" className="pl-10 bg-slate-800/50 border-slate-700 text-white" {...field} />
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
                          <FormLabel className="text-slate-200">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                type="password"
                                placeholder="••••••••"
                                className="pl-10 bg-slate-800/50 border-slate-700 text-white"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
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
                          <FormLabel className="text-slate-200">Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input
                                type="password"
                                placeholder="••••••••"
                                className="pl-10 bg-slate-800/50 border-slate-700 text-white"
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
                          <FormLabel className="text-slate-200">Company Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                              <Input placeholder="Acme Inc." className="pl-10 bg-slate-800/50 border-slate-700 text-white" {...field} />
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
                          <FormLabel className="text-slate-200">Country</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedCountry(countries.find(c => c.code === value) || countries[0]);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              {countries.map((country) => (
                                <SelectItem
                                  key={country.code}
                                  value={country.code}
                                  className="text-white hover:bg-slate-700"
                                >
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200">Contact Number</FormLabel>
                          <FormControl>
                            <div className="relative flex gap-2">
                              
                              <div className="flex-shrink-0 z-10">
                                <Input
                                  disabled
                                  value={selectedCountry.phone}
                                  className="w-[4.5rem] pr-3 bg-slate-800/50 border-slate-700 text-white"
                                />
                              </div>
                              <Input
                                placeholder="Phone number"
                                className="flex-1 bg-slate-800/50 border-slate-700 text-white"
                                {...field}
                              />
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
                              onChange={field.onChange}
                              className=""
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-slate-200">
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />Previous 
                </Button>
                {current === count - 1 ? (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Create Account
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
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