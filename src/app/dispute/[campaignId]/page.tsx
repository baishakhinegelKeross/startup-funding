"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, AlertCircle, X, CheckCircle2, Clock, FileText, MessageSquare, Shield } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-dropdown-menu";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const formSchema = z.object({
  campaignId: z.string(),
  campaignName: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  disputeType: z.string(),
  issueDate: z.date(),
  description: z.string().min(10),
  desiredOutcome: z.string().min(10),
  additionalNotes: z.string().optional(),
  termsAccepted: z.boolean(),
  signature: z.boolean(),
  documents: z.array(z.instanceof(File)).optional(),
});

export default function DisputeForm({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [campaignData,setCampaignData] = useState({})
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignId: '',
      campaignName:'' ,
      email: 'backer.email@example.com',
      termsAccepted: false,
      signature: false,
      documents: [],
    },
  });

  useEffect(()=>{
    const fetchCampaignData = async ()=>{
      debugger
      const _params = decodeURIComponent((await params).campaignId)
      setCampaignData({campaignId:_params.split("-")[1],campaignName:_params.split("-")[0]})
    }
    fetchCampaignData()
  },[])
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    // Validate file size and type
    const validFiles = selectedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.error(`${file.name} has an invalid file type`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
    form.setValue('documents', [...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    form.setValue('documents', newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    // Validate file size and type
    const validFiles = droppedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.error(`${file.name} has an invalid file type`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
    form.setValue('documents', [...files, ...validFiles]);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    debugger
    const _values = {...values,campaignName:campaignData.campaignName,campaignId:campaignData.campaignId}
    try {
      const formData = new FormData();

      Object.entries(_values).forEach(([key, value]) => {
        if (key !== 'documents') {
          formData.append(key, value as string);
        }
      })
      
      //Append files
      files.forEach((file) => {
        formData.append('files', file);
        
      });
      
      debugger

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      debugger
      console.log(process);
      
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/submitDispute`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
  console.log('File uploaded:', response);
    
      
      if (!response.ok) {
        throw new Error('Failed to submit dispute');
      }

      toast.success("Dispute submitted successfully");
      router.push("/campaigns")
      setFiles([]); // Clear files after successful submission
      form.reset(); // Reset form
    } catch (error) {
      toast.error("Error submitting dispute");
      console.error(error);
    }
  }

  const disputeTypes = [
    "Fraud",
    "Mis Representation",
    "Quality Concerns",
    "Scope Disagreement",
    "Technical Issues",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 transition-colors duration-300">
      <div className="container mx-auto p-4 md:p-8 animate-in slide-in-from-bottom duration-700">
        <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-card/95 shadow-xl mt-10  transition-all duration-300 hover:shadow-2xl">
          <CardHeader className="space-y-6 pb-8">
            <div className="space-y-2 text-center">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-top duration-500">
                Dispute Resolution Center
              </CardTitle>
              <p className="text-muted-foreground">Submit your dispute for quick resolution</p>
            </div>
            
            <Alert variant="default" className="animate-in fade-in slide-in-from-top duration-700 delay-300 border-primary/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Before you begin</AlertTitle>
              <AlertDescription className="mt-2">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Ensure all information provided is accurate and complete</li>
                  <li>Attach relevant supporting documents</li>
                  <li>Review our dispute resolution guidelines</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-primary/5">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Secure Process</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-primary/5">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Documentation</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-primary/5">
                <Clock className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Quick Response</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-primary/5">
                <MessageSquare className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Support</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Project Information</h3>
                    <Separator className="flex-1" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="projectId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project ID</FormLabel>
                          <FormControl>
                            <Input {...field} disabled className="bg-muted/30 text-white" />
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
                            <Input {...field} disabled className="bg-muted/30 text-white" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Contact Details</h3>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" disabled className="bg-muted/30 text-white" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="tel" 
                              className="transition-all duration-300 hover:border-primary focus:border-primary text-white" 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Dispute Details</h3>
                    <Separator className="flex-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="disputeType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dispute Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 hover:border-primary">
                                <SelectValue placeholder="Select dispute type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {disputeTypes.map((type) => (
                                <SelectItem key={type} value={type.toLowerCase()}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="issueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Issue</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal transition-all duration-300 hover:border-primary",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide a detailed description of the issue..."
                            className="min-h-[120px] transition-all duration-300 hover:border-primary focus:border-primary resize-y"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Supporting Evidence</h3>
                    <Separator className="flex-1" />
                  </div>

                  <div
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden text-white"
                      multiple
                      accept={ACCEPTED_FILE_TYPES.join(',')}
                    />
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4 transition-transform group-hover:scale-110 group-hover:text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: PDF, DOCX, JPG, PNG (Max 5MB)
                    </p>
                  </div>

                  {files.length > 0 && (
                    <ScrollArea className="h-[150px] w-full border rounded-lg p-4">
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg group hover:bg-muted/50 transition-all duration-300"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium truncate max-w-[200px]">
                                  {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Resolution</h3>
                    <Separator className="flex-1" />
                  </div>

                  <FormField
                    control={form.control}
                    name="desiredOutcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Outcome</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What resolution are you seeking?"
                            className="min-h-[100px] transition-all duration-300 hover:border-primary focus:border-primary resize-y"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information you'd like to provide..."
                            className="transition-all duration-300 hover:border-primary focus:border-primary resize-y"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Agreement</h3>
                    <Separator className="flex-1" />
                  </div>

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="transition-all duration-300 data-[state=checked]:bg-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Terms and Conditions</FormLabel>
                          <FormDescription>
                            By checking this box, I acknowledge that I have read and agree to the terms and conditions
                            of the dispute resolution process. I confirm that all information provided is accurate
                            and complete to the best of my knowledge.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Submit Dispute
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>

  );
}