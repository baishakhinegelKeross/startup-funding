"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, User, AlertCircle, Upload, MessageSquare, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const disputeResponseSchema = z.object({
  // Basic Info (pre-filled)
  projectId: z.string(),
  projectName: z.string(),
  creatorName: z.string(),
  creatorEmail: z.string().email(),
  disputeId: z.string(),
  backerName: z.string(),
  backerComplaint: z.string(),
  
  // Response Questions
  responses: z.any(),
  
  // Terms and Signature
  termsAccepted: z.any(),//z.boolean().refine(val => val === true, "You must accept the terms"),
  signatureConfirmed: z.any() //z.boolean().refine(val => val === true, "You must confirm the accuracy"),
});

type DisputeResponse = z.infer<typeof disputeResponseSchema>;

const mockDisputeQuestions = [
  {
    id: "q1",
    question: "Please explain your perspective on the dispute in detail.",
    description: "Provide a comprehensive explanation of your side of the dispute, including relevant dates and events.",
    required: true,
  },
  {
    id: "q2",
    question: "What steps have you taken to address the backer's concerns?",
    description: "Detail all communication and actions taken to resolve the situation.",
    required: true,
  },
  {
    id: "q3",
    question: "Describe your proposed resolution to this dispute.",
    description: "Outline your suggested solution and timeline for implementation.",
    required: true,
  },
  {
    id: "q4",
    question: "What evidence can you provide to support your position?",
    description: "Include any relevant documentation, communication records, or other supporting materials.",
    required: true,
  }
];

const mockDisputeData = {
  projectId: "PRJ-2024-001",
  projectName: "Creative Project X",
  creatorName: "John Doe",
  creatorEmail: "john.doe@example.com",
  disputeId: "DSP-2024-001",
  backerName: "Jane Smith",
  backerComplaint: "Delayed delivery and communication issues",
};

const FormSection = ({ children, icon: Icon, title }: { children: React.ReactNode; icon: any; title: string }) => (
  <div className="space-y-4 mb-8">
    <div className="flex items-center gap-2 pb-2 border-b">
      <Icon className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
    </div>
    {children}
  </div>
);

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <div className="p-2 bg-muted rounded-md text-sm">{value}</div>
  </div>
);

export default function DisputeForm({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [questionFiles, setQuestionFiles] = useState<Record<string, File[]>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

 

  const form = useForm<DisputeResponse>({
    resolver: zodResolver(disputeResponseSchema),
    defaultValues: {
      ...mockDisputeData,
      responses: mockDisputeQuestions.map(q => ({
        questionId: q.id,
        textAnswer: "",
      })),
      termsAccepted: false,
      signatureConfirmed: false,
    },
  });

  const handleUploadClick = (questionId: string) => {
    setActiveQuestionId(questionId);
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeQuestionId && e.target.files?.length) {
      const newFiles = Array.from(e.target.files);
      setQuestionFiles(prev => ({
        ...prev,
        [activeQuestionId]: [...(prev[activeQuestionId] || []), ...newFiles]
      }));
    }
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (questionId: string, fileIndex: number) => {
    setQuestionFiles(prev => ({
      ...prev,
      [questionId]: prev[questionId].filter((_, index) => index !== fileIndex)
    }));
  };

  async function onSubmit(values: DisputeResponse) {
    debugger
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Add basic info
      Object.entries(mockDisputeData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const responsesArray: { questionId: any; answer: any;  }[] = [];
      // Add responses and files
      values.responses.forEach((response, index) => {
        //const files = questionFiles[response.questionId] || [];
        const responseObject = {
          questionId: response.questionId,
          answer: response.textAnswer || '',
          //files: files,
        };
        responsesArray.push(responseObject);
      });

      formData.append('responses', JSON.stringify(responsesArray));
      formData.append('termsAccepted', values.termsAccepted.toString());
      formData.append('signatureConfirmed', values.signatureConfirmed.toString());

      // Log FormData contents for debugging
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }
      console.log(Array.from(formData.entries()));


      const _disputeId = await (params).campaignId
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/submitCreatorResponse/${_disputeId}`, {
        method: 'POST',
        body: formData,
        
      });
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitSuccess) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Your dispute response has been successfully submitted. You will receive a confirmation email shortly.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          Dispute Response Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              name="files"
              id="chut"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />

            <FormSection icon={FileText} title="Project Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReadOnlyField label="Project ID" value={mockDisputeData.projectId} />
                <ReadOnlyField label="Project Name" value={mockDisputeData.projectName} />
              </div>
            </FormSection>

            <FormSection icon={User} title="Creator Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReadOnlyField label="Creator Name" value={mockDisputeData.creatorName} />
                <ReadOnlyField label="Email" value={mockDisputeData.creatorEmail} />
              </div>
            </FormSection>

            <FormSection icon={AlertCircle} title="Dispute Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <ReadOnlyField label="Dispute ID" value={mockDisputeData.disputeId} />
                <ReadOnlyField label="Backer Name" value={mockDisputeData.backerName} />
              </div>
              <ReadOnlyField label="Backer's Complaint" value={mockDisputeData.backerComplaint} />
            </FormSection>

            <div className="space-y-8">
              {mockDisputeQuestions.map((question, index) => (
                <div key={question.id} className="p-6 bg-muted/30 rounded-lg border">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          {question.question}
                          {question.required && (
                            <Badge variant="secondary" className="text-xs">Required</Badge>
                          )}
                        </FormLabel>
                        <FormDescription className="text-sm text-muted-foreground">
                          {question.description}
                        </FormDescription>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name={`responses.${index}.textAnswer`}
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
                        <FormLabel className="text-sm">Supporting Documents</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleUploadClick(question.id)}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Files
                        </Button>
                      </div>

                      {questionFiles[question.id]?.length > 0 && (
                        <ScrollArea className="h-32 w-full rounded-md border">
                          <div className="p-4 space-y-2">
                            {questionFiles[question.id].map((file, fileIndex) => (
                              <div
                                key={fileIndex}
                                className="flex items-center justify-between bg-background rounded-md p-2"
                              >
                                <span className="text-sm truncate">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(question.id, fileIndex)}
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

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
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
                name="signatureConfirmed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
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

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Response"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}