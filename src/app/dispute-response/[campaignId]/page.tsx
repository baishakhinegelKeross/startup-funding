"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, FileText, User, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  projectId: z.string(),
  projectName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  disputeId: z.string(),
  backerName: z.string(),
  backerComplaint: z.string(),
  explanation: z.string().min(50, "Explanation must be at least 50 characters"),
  stepsTaken: z.string().min(50, "Steps taken must be at least 50 characters"),
  resolution: z.string().min(50, "Resolution proposal must be at least 50 characters"),
  evidence: z.instanceof(FileList).optional(),
  additionalNotes: z.string().max(1000, "Additional notes must not exceed 1000 characters").optional(),
  terms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
  signature: z.boolean().refine(val => val === true, "You must confirm the information is accurate")
});

const FormSection = ({ children, icon: Icon, title }: { children: React.ReactNode; icon: any; title: string }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold flex items-center gap-2">
      <Icon className="h-5 w-5" />
      {title}
    </h3>
    {children}
  </div>
);

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: "PRJ-2024-001",
      projectName: "Creative Project X",
      fullName: "John Doe",
      email: "john.doe@example.com",
      disputeId: "DSP-2024-001",
      backerName: "Jane Smith",
      backerComplaint: "Delayed delivery and communication issues",
      terms: false,
      signature: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">
              Project Creator Response Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormSection icon={FileText} title="Project Information">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="projectId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project ID</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly className="bg-muted transition-all duration-200 hover:bg-muted/80" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly className="bg-muted transition-all duration-200 hover:bg-muted/80" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>

                <FormSection icon={User} title="Creator Information">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly className="bg-muted transition-all duration-200 hover:bg-muted/80" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" readOnly className="bg-muted transition-all duration-200 hover:bg-muted/80" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>

                <FormSection icon={AlertCircle} title="Dispute Details">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="disputeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dispute ID</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly className="bg-muted transition-all duration-200 hover:bg-muted/80" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="backerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Backer's Name</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly className="bg-muted transition-all duration-200 hover:bg-muted/80" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="backerComplaint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Backer's Complaint Summary</FormLabel>
                        <FormControl>
                          <Textarea {...field} readOnly className="bg-muted h-24 transition-all duration-200 hover:bg-muted/80" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </FormSection>

                <FormSection icon={CheckCircle2} title="Response to Dispute">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="explanation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Explanation</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Please provide a detailed explanation..."
                              className="h-32 transition-all duration-200 focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stepsTaken"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Steps Taken</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Describe the steps you've taken to address the issue..."
                              className="h-32 transition-all duration-200 focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="resolution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resolution Proposal</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Outline your proposed resolution..."
                              className="h-32 transition-all duration-200 focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormSection>

                <FormSection icon={Upload} title="Supporting Evidence">
                  <FormField
                    control={form.control}
                    name="evidence"
                    render={({ field: { onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Upload Evidence</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            multiple
                            onChange={(e) => onChange(e.target.files)}
                            className="cursor-pointer transition-all duration-200 hover:bg-muted/80"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormSection>

                <FormSection icon={Mail} title="Additional Information">
                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Any additional information you'd like to provide..."
                            className="h-32 transition-all duration-200 focus:ring-2 focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormSection>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="transition-transform duration-200 hover:scale-110"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions of submitting this response
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="signature"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="transition-transform duration-200 hover:scale-110"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I confirm that all information provided is true and accurate
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full transition-all duration-300 hover:shadow-lg">
                  Submit Response
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}