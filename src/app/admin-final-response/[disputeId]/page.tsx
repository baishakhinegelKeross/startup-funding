'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  FileText, 
  User, 
  AlertCircle, 
  MessageSquare, 
  Calendar,
  Save,
  CheckCircle,
  XCircle,
  FileIcon,
  X
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Dummy images for evidence
const dummyImages = [
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=200&fit=crop",
];

export default function DisputeResolutionForm({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<any>({ files: [], _details:{adminQueries: [] }});
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  // const evidenceQuestions = [
  //   {
  //     id: "q1",
  //     question: "Please provide details of the issue or concern.",
  //     description: "Include specific dates, events, and any relevant context.",
  //     required: true,
  //   },
  //   {
  //     id: "q2",
  //     question: "What attempts have been made to resolve this issue?",
  //     description: "Detail any communication or actions taken thus far.",
  //     required: true,
  //   },
  //   {
  //     id: "q3",
  //     question: "What is your proposed solution?",
  //     description: "Describe your ideal resolution to this dispute.",
  //     required: true,
  //   }
  // ];
  const evidenceQuestions = data._details.adminQueries.map(e =>{
    return {
      id:e.id,
      question:e.text
    }
  })
  const handleEvidenceClick = (evidence:any) => {
    setSelectedEvidence(evidence);
  };

  const disputeFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    desiredOutcome: z.string().min(10, "Desired outcome must be at least 10 characters"),
    issuedDate: z.date(),
    backerEmail: z.string().email("Invalid email address"),
    backerName: z.string().min(1, "Backer name is required"),
    creatorName: z.string().min(1, "Creator name is required"),
    projectName: z.string().min(1, "Project name is required"),
    creatorEvidences: z.array(z.object({
      questionId: z.string(),
      answer: z.string().min(1, "Answer is required"),
    })),
  });

  type DisputeForm = z.infer<typeof disputeFormSchema>;

  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger
        const disputeId = (await params).disputeId;
        if (process.env.NEXT_PUBLIC_BACKEND_API_URL) {
        //   const response = await axios.get(
        //     `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/fetchLatestDisputeInfo/${disputeId}`
        //   );
        const response = await axios.get(
            `http://localhost:8000/admin/fetchLatestDisputeInfo/${disputeId}`
          )
          
          // Add dummy images to the response data
        //   const filesWithImages = response.data.files.map((file: any, index: number) => ({
        //     ...file,
        //     imageUrl: dummyImages[index % dummyImages.length],
        //   }));
          
          setData({ ...response.data, files: response.data.files });
          
        //   if (response.data) {
        //     form.reset({
        //       ...response.data,
        //       issuedDate: new Date(response.data.issuedDate),
        //       creatorEvidences: evidenceQuestions.map(q => ({
        //         questionId: q.id,
        //         answer: response.data.answers[q.id] || "",
        //       })),
        //     });
        //   }
        } else {
          toast.error('Could not find NEXT_PUBLIC_BACKEND_API_URL from env');
        }
      } catch (e) {
        toast.error('Error while getting dispute details');
      }
    };
    fetchData();
  }, []);

  const PreviewDialog = () => {
    if (!selectedEvidence) return null;

    return (
      <Dialog open={!!selectedEvidence} onOpenChange={() => setSelectedEvidence(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedEvidence.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedEvidence(null)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedEvidence.type === "Image" ? (
              <div className="relative h-[60vh] w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/${selectedEvidence.url}`}
                  alt={selectedEvidence.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <iframe
                src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/${selectedEvidence.url}`}
                className="w-full h-[60vh]"
                title={selectedEvidence.name}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const FileDisplay = ({ files }: { files: any[] }) => (
    <ScrollArea className="h-48 w-full border rounded-md p-4">
      <div className="grid grid-cols-2 gap-4">
        {files.map((file, index) => (
          <button
          key={index}
          onClick={() => handleEvidenceClick(file)}
          className="w-full text-left transition-colors hover:bg-gray-800/50 flex items-center justify-between p-2 bg-gray-800 rounded-md"
        >
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-300">{file.name}</span>
          </div>
          <span className="text-xs text-gray-500">{file.size}</span>
        </button>
        ))}
      </div>
    </ScrollArea>
  );

  const FormSection = ({ children, icon: Icon, title }: { children: React.ReactNode; icon: any; title: string }) => (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );

  const EvidenceSection = ({
    questions,
    form,
  }: {
    questions: typeof evidenceQuestions;
    form: any;
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
              name={`creatorEvidences.${index}.answer`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[100px] resize-y bg-background"
                      placeholder="Enter your response..."
                      value={
                        
                        data._details.creatorResponse?data._details.creatorResponse.filter(e =>e.questionId ===question.id)[0].answer:'n/a'
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Attached Files</h4>
              <FileDisplay 
                files={data.files.filter((f: any) => f.name.includes(question.id))}
              />
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
      creatorEvidences: evidenceQuestions.map(q => ({
        questionId: q.id,
        answer: "",
      })),
    },
  });

  const onSubmit = async (values: DisputeForm, action: 'approve' | 'reject' | 'draft') => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'creatorEvidences' && key !== 'issuedDate') {
          formData.append(key, value as string);
        }
      });

      formData.append('issuedDate', values.issuedDate.toISOString());
      formData.append('creatorEvidences', JSON.stringify(values.creatorEvidences));
      formData.append('action', action);

      const disputeId = (await params).disputeId;
      
      const response = await fetch(`/rejectDispute/${disputeId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit dispute');
      }

      toast.success('Dispute submitted successfully');
    } catch (error) {
      toast.error('Error submitting dispute');
      console.error('Error submitting dispute:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <PreviewDialog />
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
                          <Input {...field} disabled placeholder="Enter dispute title" className="bg-background" />
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
                            disabled
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
                            disabled
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
                                disabled
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
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="backerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Backer Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled type="email" placeholder="Enter backer's email" className="bg-background" />
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
                            <Input {...field} disabled placeholder="Enter backer's name" className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Backer Files</h4>
                    <FileDisplay files={data.files.filter((f: any) => f.for === 'backer')} />
                  </div>
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
                          <Input {...field} disabled placeholder="Enter creator's name" className="bg-background" />
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
                          <Input {...field} disabled placeholder="Enter project name" className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormSection>

              <FormSection icon={MessageSquare} title="Creator Evidence">
                <EvidenceSection
                  questions={evidenceQuestions}
                  form={form}
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
                
                {/* <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => form.handleSubmit((values) => onSubmit(values, 'draft'))()}
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}