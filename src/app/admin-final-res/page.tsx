"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function DisputePage() {
  // Mock data - In real app, this would come from your API/database
  const disputeData = {
    backer: {
      email: "john.doe@example.com",
      desiredOutcome: "Full refund requested",
      disputeType: "Product not received",
      raisedDate: "2024-03-25",
    },
    campaign: {
      id: "CAM123456",
      name: "Innovative Tech Project",
      creatorName: "Jane Smith",
      creatorEmail: "jane.smith@example.com",
    },
    creatorEvidence: [
      {
        question: "Have you shipped the product?",
        answer: "Yes, the product was shipped on March 15th, 2024. Here's the detailed shipping timeline and tracking information...",
      },
      {
        question: "Can you provide proof of shipment?",
        answer: "Attached are the shipping receipts, tracking numbers, and delivery confirmation documents...",
      },
      {
        question: "Have you attempted to resolve this with the backer?",
        answer: "Yes, we've had multiple email exchanges trying to resolve the situation. Here's the communication timeline...",
      },
    ],
    backerEvidence: `
      1. Order confirmation screenshot
      2. Payment receipt
      3. Email communications showing attempted resolution
      4. Timeline of events
      5. Photos of received items (if applicable)
      6. Additional supporting documentation
    `,
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="p-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-6">Dispute Review Form</h1>
          <Separator className="my-4" />
        </div>

        {/* Backer Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Backer Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Backer Email</Label>
              <Input value={disputeData.backer.email} disabled />
            </div>
            <div className="space-y-2">
              <Label>Dispute Type</Label>
              <Input value={disputeData.backer.disputeType} disabled />
            </div>
            <div className="space-y-2">
              <Label>Desired Outcome</Label>
              <Input value={disputeData.backer.desiredOutcome} disabled />
            </div>
            <div className="space-y-2">
              <Label>Raised Date</Label>
              <Input value={disputeData.backer.raisedDate} disabled />
            </div>
          </div>
        </div>

        {/* Campaign Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Campaign Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Campaign ID</Label>
              <Input value={disputeData.campaign.id} disabled />
            </div>
            <div className="space-y-2">
              <Label>Campaign Name</Label>
              <Input value={disputeData.campaign.name} disabled />
            </div>
            <div className="space-y-2">
              <Label>Creator Name</Label>
              <Input value={disputeData.campaign.creatorName} disabled />
            </div>
            <div className="space-y-2">
              <Label>Creator Email</Label>
              <Input value={disputeData.campaign.creatorEmail} disabled />
            </div>
          </div>
        </div>

        {/* Creator Evidence */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Creator Evidence</h2>
          <div className="space-y-4">
            {disputeData.creatorEvidence.map((evidence, index) => (
              <div key={index} className="space-y-2">
                <Label>{evidence.question}</Label>
                <ScrollArea className="h-[100px] w-full border rounded-md p-4">
                  <p className="text-sm">{evidence.answer}</p>
                </ScrollArea>
              </div>
            ))}
          </div>
        </div>

        {/* Backer Evidence */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Backer Evidence</h2>
          <ScrollArea className="h-[200px] w-full border rounded-md p-4">
            <pre className="text-sm whitespace-pre-wrap">{disputeData.backerEvidence}</pre>
          </ScrollArea>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Reject Dispute</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will reject the dispute. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground">
                  Reject
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Approve Dispute</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will approve the dispute in favor of the backer. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Approve</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  );
}