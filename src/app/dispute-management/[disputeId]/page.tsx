"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, FileText, Image as ImageIcon, Mail, MessageSquare, Phone, Plus, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from 'next/navigation';

interface DisputeEvidence {
  name: string;
  type: string;
  size: string;
  url: string;
}

interface Question {
  id: string;
  text: string;
}

export default function DisputeReviewForm({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [selectedEvidence, setSelectedEvidence] = useState<DisputeEvidence | null>(null);
  const [data, setData] = useState({ files: [] });
  const [comment, setComment] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const router = useRouter();
  // const commentRef = useRef<HTMLTextAreaElement>(null);
  // const questionRef = useRef<HTMLInputElement>(null);

  const QuestionInpRef =  useRef(null)
  const commentsRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disputeId = (await params).disputeId;
        const response = await axios.get(`http://localhost:8000/admin/fetchDisputeInfo/${disputeId}`);
        setData(response.data);
      } catch (e) {
        toast.error('Error while getting dispute details');
      }
    };

    fetchData();
  }, []);

  const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      {children}
    </div>
  );

  const DisabledInput = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input 
          disabled 
          value={value} 
          className="pl-9 bg-gray-800"
        />
      </div>
    </div>
  );

  const handleEvidenceClick = (evidence: DisputeEvidence) => {
    setSelectedEvidence(evidence);
  };

  const handleAddQuestion = () => {
    const qs = QuestionInpRef.current.value
    if (qs.trim()) {
      const question: Question = {
        id: Date.now().toString(),
        text: qs,
      };
      setQuestions([...questions, question]);
      setNewQuestion('');
    }
  };

  const handleSubmit = async () => {
    // Handle form submission with comment and questions
    debugger
    const comments = commentsRef.current.value
    const returnObj = { comments, questions }
    const disputeId = (await params).disputeId;

    try {
      const response = await axios.post(
        `http://localhost:8000/admin/submitAdminQueries/${disputeId}`,
        JSON.stringify(returnObj),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      toast.success('Dispute submitted to Project creator review');
      router.push('/disputes');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Dispute submission failed!');
    }
    // Add your submission logic here
  };

  // const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setComment(e.target.value);
  // };

  // const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewQuestion(e.target.value);
  // };

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
                  src={`http://localhost:8000/admin/${selectedEvidence.url}`}
                  alt={selectedEvidence.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <iframe
                src={`http://localhost:8000/admin/${selectedEvidence.url}`}
                className="w-full h-[60vh]"
                title={selectedEvidence.name}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Dispute Review Form
          </h1>
          <p className="mt-2 text-gray-400">
            Review and process dispute details
          </p>
        </div>

        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 space-y-8">
          <FormSection title="Backer Information">
            <div className="grid gap-4 sm:grid-cols-2">
              <DisabledInput 
                icon={Mail} 
                label="Backer Email" 
                value="john.doe@example.com" 
              />
              <DisabledInput 
                icon={Phone} 
                label="Contact Number" 
                value="+1 (555) 123-4567" 
              />
            </div>
          </FormSection>

          <FormSection title="Project Information">
            <div className="grid gap-4 sm:grid-cols-2">
              <DisabledInput 
                icon={FileText} 
                label="Project Name" 
                value="Innovative Tech Project" 
              />
              <DisabledInput 
                icon={FileText} 
                label="Project ID" 
                value="PRJ-2024-001" 
              />
            </div>
          </FormSection>

          <FormSection title="Dispute Information">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Dispute Type</label>
                <Select disabled defaultValue="refund">
                  <SelectTrigger className="bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="refund">Refund Request</SelectItem>
                    <SelectItem value="delivery">Delivery Issue</SelectItem>
                    <SelectItem value="quality">Quality Concern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DisabledInput 
                icon={FileText} 
                label="Issued At" 
                value="2024-03-20 14:30 UTC" 
              />
              
              <div>
                <label className="text-sm text-gray-400">Description</label>
                <Textarea 
                  disabled 
                  className="bg-gray-800 h-32"
                  value="The product received does not match the description provided in the project. Multiple features are missing and the quality is subpar."
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Dispute Evidences">
            <ScrollArea className="h-48 border border-gray-800 rounded-md p-4">
              <div className="space-y-3">
                {data.files.map((evidence, index) => (
                  <button
                    key={index}
                    onClick={() => handleEvidenceClick(evidence)}
                    className="w-full text-left transition-colors hover:bg-gray-800/50 flex items-center justify-between p-2 bg-gray-800 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-300">{evidence.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{evidence.size}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </FormSection>

          <FormSection title="Comments">
            <div className="space-y-2">
              <Textarea
                //value={comment}
                //onChange={handleCommentChange}
                placeholder="Add your comments here..."
                className="bg-gray-800 min-h-[100px]"
                ref={commentsRef}
                
              />
            </div>
          </FormSection>

          <FormSection title="Evidence Questions">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  //value={newQuestion}
                  //onChange={handleQuestionChange}
                 // ref={questionRef}
                  placeholder="Add a question about the evidence..."
                  className="bg-gray-800"
                  ref={QuestionInpRef}
                />
                <Button onClick={handleAddQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
              <div className="border border-gray-800 rounded-md p-4 space-y-4">
                {questions.map((question) => (
                  <div key={question.id} className="bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-300">{question.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FormSection>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="destructive"
                    className="w-full sm:w-auto"
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Reject Dispute
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reject this dispute request</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={handleSubmit}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Review
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Submit the dispute review</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </div>
      <PreviewDialog />
    </div>
  );
}