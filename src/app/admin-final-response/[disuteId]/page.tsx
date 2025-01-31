"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  FileText, 
  User, 
  AlertCircle, 
  Upload, 
  MessageSquare, 
  X,
  Calendar,
  Save,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import axios from "axios";




export default function DisputeResolutionForm({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
  const [backerFiles, setBackerFiles] = useState<Record<string, File[]>>({});
  const [creatorFiles, setCreatorFiles] = useState<Record<string, File[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data,setData] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
        try{
            debugger
            const disputeId = (await params).disputeId;
            let resposne = undefined
            if(process.env.NEXT_PUBLIC_BACKEND_API_URL){
                resposne = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/fetchLatestDisputeInfo/${disputeId}`);
                setData(resposne.data)
            }
            else
                toast.error('Could not find NEXT_PUBLIC_BACKEND_API_URL from env')
            
        }
        catch(e){
            toast.error('Error while getting dispute details')
        }
        
    }
    fetchData()
  },[])
  const evidenceQuestions = [
    {
      id: "q1",
      question: "Please provide details of the issue or concern.",
      description: "Include specific dates, events, and any relevant context.",
      required: true,
    },
    {
      id: "q2",
      question: "What attempts have been made to resolve this issue?",
      description: "Detail any communication or actions taken thus far.",
      required: true,
    },
    {
      id: "q3",
      question: "What is your proposed solution?",
      description: "Describe your ideal resolution to this dispute.",
      required: true,
    }
  ];
  
  const disputeFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    desiredOutcome: z.string().min(10, "Desired outcome must be at least 10 characters"),
    issuedDate: z.date(),
    backerEmail: z.string().email("Invalid email address"),
    backerName: z.string().min(1, "Backer name is required"),
    creatorName: z.string().min(1, "Creator name is required"),
    projectName: z.string().min(1, "Project name is required"),
    backerEvidences: z.array(z.object({
      questionId: z.string(),
      answer: z.string().min(1, "Answer is required"),
    })),
    creatorEvidences: z.array(z.object({
      questionId: z.string(),
      answer: z.string().min(1, "Answer is required"),
    })),
  });
  
  type DisputeForm = z.infer<typeof disputeFormSchema>;
  
  const FormSection = ({ children, icon: Icon, title }: { children: React.ReactNode; icon: any; title: string }) => (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );
  
//   const EvidenceSection = ({ 
//     questions, 
//     type, 
//     form, 
//     files, 
//     onFileChange, 
//     onFileRemove 
//   }: { 
//     questions: typeof evidenceQuestions;
//     type: "backer" | "creator";
//     form: any;
//     files: Record<string, File[]>;
//     onFileChange: (questionId: string, files: FileList) => void;
//     onFileRemove: (questionId: string, fileIndex: number) => void;
//   }) => (
//     <div className="space-y-6">
//       {questions.map((question, index) => (
//         <div key={question.id} className="p-6 bg-muted/10 rounded-lg border">
//           <div className="space-y-4">
//             <div>
//               <FormLabel className="text-base font-semibold flex items-center gap-2">
//                 {question.question}
//                 {question.required && (
//                   <Badge variant="secondary" className="text-xs">Required</Badge>
//                 )}
//               </FormLabel>
//               <FormDescription className="text-sm text-muted-foreground mt-1">
//                 {question.description}
//               </FormDescription>
//             </div>
  
//             <FormField
//               control={form.control}
//               name={`${type}Evidences.${index}.answer`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Textarea
//                       {...field}
//                       className="min-h-[100px] resize-y bg-background"
//                       placeholder="Enter your response..."
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
  
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//               <ScrollArea className="h-48 border border-gray-800 rounded-md p-4">
//                 <div className="space-y-3">
//                   {data.files.map((evidence, index) => (
//                     <button
//                       key={index}
//                       onClick={() => //handleEvidenceClick(evidence)
//                         }
//                       className="w-full text-left transition-colors hover:bg-gray-800/50 flex items-center justify-between p-2 bg-gray-800 rounded-md"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <span className="text-sm font-medium text-gray-300">{evidence.name}</span>
//                       </div>
//                       <span className="text-xs text-gray-500">{evidence.size}</span>
//                     </button>
//                   ))}
//                 </div>
//               </ScrollArea>
//               </div>
  
//               {files[question.id]?.length > 0 && (
//                 <ScrollArea className="h-32 w-full rounded-md border">
//                   <div className="p-4 space-y-2">
//                     {files[question.id].map((file, fileIndex) => (
//                       <div
//                         key={fileIndex}
//                         className="flex items-center justify-between bg-background rounded-md p-2"
//                       >
//                         <span className="text-sm truncate">{file.name}</span>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => onFileRemove(question.id, fileIndex)}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </ScrollArea>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

const EvidenceSection = ({
    questions,
    type,
    form,
    files,
    onFileChange,
    onFileRemove,
  }: {
    questions: typeof evidenceQuestions;
    type: "backer" | "creator";
    form: any;
    files: Record<string, File[]>;
    onFileChange: (questionId: string, files: FileList) => void;
    onFileRemove: (questionId: string, fileIndex: number) => void;
  }) => (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id} className="p-6 bg-muted/10 rounded-lg border">
          <div className="space-y-4">
            <div>
              <FormLabel className="text-base font-semibold flex items-center gap-2">
                {question.question}
                {question.required && (
                  <Badge variant="secondary" className="text-xs">Required</Badge>
                )}
              </FormLabel>
              <FormDescription className="text-sm text-muted-foreground mt-1">
                {question.description}
              </FormDescription>
            </div>
  
            <FormField
              control={form.control}
              name={`${type}Evidences.${index}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[100px] resize-y bg-background"
                      placeholder="Enter your response..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                {/* <ScrollArea className="h-48 border border-gray-800 rounded-md p-4">
                  <div className="space-y-3">
                    {files[question.id].map((evidence, index) => (
                      <button
                        key={index}
                        onClick={() => console.log(evidence)}
                        className="w-full text-left transition-colors hover:bg-gray-800/50 flex items-center justify-between p-2 bg-gray-800 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-300">{evidence.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{evidence.size}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea> */}
              </div>
  
              {files[question.id]?.length > 0 && (
                <ScrollArea className="h-32 w-full rounded-md border">
                  <div className="p-4 space-y-2">
                    {files[question.id].map((file, fileIndex) => (
                      <div
                        key={fileIndex}
                        className="flex items-center justify-between bg-background rounded-md p-2"
                      >
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => onFileRemove(question.id, fileIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  

  const form = useForm<DisputeForm>({
    resolver: zodResolver(disputeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      desiredOutcome: "",
      issuedDate: new Date(),
      backerEmail: "",
      backerName: "",
      creatorName: "",
      projectName: "",
      backerEvidences: evidenceQuestions.map(q => ({
        questionId: q.id,
        answer: "",
      })),
      creatorEvidences: evidenceQuestions.map(q => ({
        questionId: q.id,
        answer: "",
      })),
    },
  });

  const handleFileChange = (type: "backer" | "creator") => (questionId: string, files: FileList) => {
    const setFiles = type === "backer" ? setBackerFiles : setCreatorFiles;
    const newFiles = Array.from(files);
    setFiles(prev => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), ...newFiles]
    }));
  };

  const handleFileRemove = (type: "backer" | "creator") => (questionId: string, fileIndex: number) => {
    const setFiles = type === "backer" ? setBackerFiles : setCreatorFiles;
    setFiles(prev => ({
      ...prev,
      [questionId]: prev[questionId].filter((_, index) => index !== fileIndex)
    }));
  };

  const onSubmit = async (values: DisputeForm, action: 'approve' | 'reject' | 'draft') => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Add form values
      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'backerEvidences' && key !== 'creatorEvidences' && key !== 'issuedDate') {
          formData.append(key, value as string);
        }
      });

      // Add issued date
      formData.append('issuedDate', values.issuedDate.toISOString());

      // Add evidences
      formData.append('backerEvidences', JSON.stringify(values.backerEvidences));
      formData.append('creatorEvidences', JSON.stringify(values.creatorEvidences));

      // Add action
      formData.append('action', action);

      // Add files
      Object.entries(backerFiles).forEach(([questionId, files]) => {
        files.forEach(file => {
          formData.append(`backer_${questionId}`, file);
        });
      });

      Object.entries(creatorFiles).forEach(([questionId, files]) => {
        files.forEach(file => {
          formData.append(`creator_${questionId}`, file);
        });
      });

      // Submit form
      const response = await fetch('/api/disputes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit dispute');
      }

      // Handle success
      console.log('Dispute submitted successfully');
    } catch (error) {
      console.error('Error submitting dispute:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Dispute Resolution Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormSection icon={AlertCircle} title="Dispute Details">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dispute Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter dispute title" className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe the dispute in detail"
                          className="min-h-[100px] bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="desiredOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Outcome</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="What outcome are you seeking?"
                          className="min-h-[100px] bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issuedDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Issue Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`w-[240px] pl-3 text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <FormSection icon={User} title="Backer Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="backerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Backer Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Enter backer's email" className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="backerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Backer Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter backer's name" className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <FormSection icon={User} title="Project Creator Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="creatorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Creator Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter creator's name" className="bg-background" />
                      </FormControl>
                      <FormMessage />
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
                        <Input {...field} placeholder="Enter project name" className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <FormSection icon={MessageSquare} title="Backer Evidence">
              <EvidenceSection
                questions={evidenceQuestions}
                type="backer"
                form={form}
                files={backerFiles}
                onFileChange={handleFileChange("backer")}
                onFileRemove={handleFileRemove("backer")}
              />
            </FormSection>

            <FormSection icon={MessageSquare} title="Creator Evidence">
              <EvidenceSection
                questions={evidenceQuestions}
                type="creator"
                form={form}
                files={creatorFiles}
                onFileChange={handleFileChange("creator")}
                onFileRemove={handleFileRemove("creator")}
              />
            </FormSection>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                className="flex-1"
                onClick={() => form.handleSubmit((values) => onSubmit(values, 'approve'))()}
                disabled={isSubmitting}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={() => form.handleSubmit((values) => onSubmit(values, 'reject'))()}
                disabled={isSubmitting}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => form.handleSubmit((values) => onSubmit(values, 'draft'))()}
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}