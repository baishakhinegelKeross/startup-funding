"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, User, AlertCircle, Upload, MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

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
  termsAccepted: z.any(),
  signatureConfirmed: z.any()
});

type DisputeResponse = z.infer<typeof disputeResponseSchema>;

// const mockDisputeQuestions = [
//   {
//     id: "q1",
//     question: "Please explain your perspective on the dispute in detail.",
//     description: "Provide a comprehensive explanation of your side of the dispute, including relevant dates and events.",
//     required: true,
//   },
//   {
//     id: "q2",
//     question: "What steps have you taken to address the backer's concerns?",
//     description: "Detail all communication and actions taken to resolve the situation.",
//     required: true,
//   },
//   {
//     id: "q3",
//     question: "Describe your proposed resolution to this dispute.",
//     description: "Outline your suggested solution and timeline for implementation.",
//     required: true,
//   },
//   {
//     id: "q4",
//     question: "What evidence can you provide to support your position?",
//     description: "Include any relevant documentation, communication records, or other supporting materials.",
//     required: true,
//   }
// ];

// const mockDisputeData = {
//   projectId: "PRJ-2024-001",
//   projectName: "Creative Project X",
//   creatorName: "John Doe",
//   creatorEmail: "john.doe@example.com",
//   disputeId: "DSP-2024-001",
//   backerName: "Jane Smith",
//   backerComplaint: "Delayed delivery and communication issues",
// };

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
  const [data, setData] = useState({ _details:{adminQueries:[]}});

  useEffect(()=>{
    const fetchData = async()=>{
      const disputeId = (await params).disputeId;
      const response = await axios.get(`http://localhost:8000/user/getDisputeInfo/${disputeId}`)
      setData(response.data)
      }
    fetchData()
  },[])


  const mockDisputeData = {
  projectId: data._details.campaignId,
  projectName: data._details.campaignName,
  creatorName: "CREATOR",
  creatorEmail: "creator.example@example.com",
  disputeId: "DSP-2024-001",
  backerName: data._details.rasiedBy,
  backerComplaint: data._details.desiredOutcome  ,
};

  const form = useForm<DisputeResponse>({
    resolver: zodResolver(disputeResponseSchema),
    defaultValues: {
      ...mockDisputeData,
      responses: data._details.adminQueries.map(q => ({
        questionId: q.id,
        textAnswer: "",
      })),
      termsAccepted: false,
      signatureConfirmed: false,
    },
  });

  const handleFileChange = (questionId: string, files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setQuestionFiles(prev => ({
        ...prev,
        [questionId]: [...(prev[questionId] || []), ...newFiles]
      }));
    }
  };

  const removeFile = (questionId: string, fileIndex: number) => {
    setQuestionFiles(prev => ({
      ...prev,
      [questionId]: prev[questionId].filter((_, index) => index !== fileIndex)
    }));
  };

  async function onSubmit(values: DisputeResponse) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Add basic info
      Object.entries(mockDisputeData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Add responses and files
      const responsesArray = values.responses.map((response: any) => ({
        questionId: response.questionId,
        answer: response.textAnswer || '',
      }));

      formData.append('responses', JSON.stringify(responsesArray));
      
      // Append files with their respective question IDs
      Object.entries(questionFiles).forEach(([questionId, files]) => {
        files.forEach((file, index) => {
          formData.append(`question_${questionId}`, file);
        });
      });

      formData.append('termsAccepted', values.termsAccepted.toString());
      formData.append('signatureConfirmed', values.signatureConfirmed.toString());
      const responses = JSON.stringify(responsesArray)
      const disputeId = await (params).disputeId;
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/submitCreatorResponse/${disputeId}?responses=${encodeURIComponent(responses)}`, {
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
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <ReadOnlyField label="Dispute ID" value={mockDisputeData.disputeId} />
                <ReadOnlyField label="Backer Name" value={mockDisputeData.backerName} />
              </div> */}
              <ReadOnlyField label="Backer's desired Outcome" value={mockDisputeData.backerComplaint} />
            </FormSection>

            <div className="space-y-8">
              {data._details.adminQueries.map((question, index) => (
                <div key={question.id} className="p-6 bg-muted/30 rounded-lg border">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <FormLabel className="text-base font-semibold flex items-center gap-2">
                          {question.text}
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
                        <input
                          type="file"
                          name={`question_${question.id}`}
                          multiple
                          onChange={(e) => handleFileChange(question.id, e.target.files)}
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
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