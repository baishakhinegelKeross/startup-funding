"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Upload, Bot, Shield, Briefcase, DollarSign, FileText, GraduationCap, ShieldCheck, User, UserPlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import TabsPanel from "@/components/ui/TabsPanel";

const tabs = [
  { id: 'personal', value: 'personal', label: 'Personal Info', icon: User },
  { id: 'business', value: 'business', label: 'Business Details', icon: Briefcase },
  { id: 'documents', value: 'documents', label: 'Documents', icon: FileText },
  { id: 'verification', value: 'verification', label: 'Verification', icon: ShieldCheck },
];

export default function CompliancePage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("personal");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [currentTab, setCurrentTab] = useState<number>(0);

  // States for uploaded files
  const [governmentIDFile, setGovernmentIDFile] = useState<File | null>(null);
  const [businessRegistrationFile, setBusinessRegistrationFile] = useState<File | null>(null);

  // Refs for file input elements
  const governmentIDInputRef = useRef<HTMLInputElement>(null);
  const businessRegistrationInputRef = useRef<HTMLInputElement>(null);

  const handleSectionComplete = (section: string) => {
    setProgress((prev) => Math.min(prev + 25, 100));
    setActiveSection(section);
    // Simulate AI suggestions
    setAiSuggestion("Based on your business type, you'll need to provide additional documentation for SEC compliance.");
  };

  // Handlers for file uploads
  const handleGovernmentIDUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGovernmentIDFile(file);
      console.log("Government ID uploaded", file);
    }
  };

  const handleBusinessRegistrationUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBusinessRegistrationFile(file);
      console.log("Business Registration uploaded", file);
    }
  };

  return (
    <div className="min-h-screen  p-6 space-y-8 mt-10">
      <div className="mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-primary">Compliance Center</h1>
          <p className="text-muted-foreground">
            Complete your KYC and regulatory requirements for US-based fundraising
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <Progress value={progress} className="w-full" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {progress}% Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 p-6">
            <Tabs
              value={tabs[currentTab]?.id}
              onValueChange={(value) => setCurrentTab(tabs.findIndex(tab => tab.id === value))}
              className="flex-1 overflow-hidden"
            >
              <TabsPanel tabs={tabs} activeTab={currentTab} onTabChange={setCurrentTab} isValid={true} />
              <div>
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="full-name">Full Legal Name</Label>
                      <Input id="full-name" className="text-white" placeholder="As it appears on official documents" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="ssn">Social Security Number</Label>
                      <Input id="ssn" className="text-white" type="password" placeholder="XXX-XX-XXXX" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" className="text-white" type="date" />
                    </div>
                    <Button onClick={() => handleSectionComplete("business")}>
                      Save and Continue
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="business" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="company-name">Company Legal Name</Label>
                      <Input id="company-name" className="text-white" placeholder="Registered business name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="ein">EIN Number</Label>
                      <Input id="ein" className="text-white" placeholder="XX-XXXXXXX" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="business-type">Business Type</Label>
                      <Input id="business-type" className="text-white" placeholder="e.g., LLC, Corporation" />
                    </div>
                    <Button onClick={() => handleSectionComplete("documents")}>
                      Save and Continue
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="grid gap-6">
                    <div className="space-y-4">
                      <Label>Required Documents</Label>
                      <div className="grid gap-4">
                        <Card className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Upload className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Government ID</p>
                                <p className="text-sm text-muted-foreground">
                                  Upload a clear photo of your driver's license or passport
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => governmentIDInputRef.current?.click()}
                            >
                              Upload
                            </Button>
                          </div>
                          {/* Hidden file input for Government ID */}
                          <input
                            type="file"
                            className="hidden"
                            ref={governmentIDInputRef}
                            onChange={handleGovernmentIDUpload}
                          />
                          {governmentIDFile && (
                            <p className="text-sm text-green-500 mt-2">
                              Uploaded: {governmentIDFile.name}
                            </p>
                          )}
                        </Card>
                        <Card className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Upload className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Business Registration</p>
                                <p className="text-sm text-muted-foreground">
                                  Certificate of incorporation or LLC formation documents
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => businessRegistrationInputRef.current?.click()}
                            >
                              Upload
                            </Button>
                          </div>
                          {/* Hidden file input for Business Registration */}
                          <input
                            type="file"
                            className="hidden"
                            ref={businessRegistrationInputRef}
                            onChange={handleBusinessRegistrationUpload}
                          />
                          {businessRegistrationFile && (
                            <p className="text-sm text-green-500 mt-2">
                              Uploaded: {businessRegistrationFile.name}
                            </p>
                          )}
                        </Card>
                      </div>
                    </div>
                    <Button onClick={() => handleSectionComplete("verification")}>
                      Save and Continue
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="verification" className="space-y-4">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Verification Status</h3>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Personal Information Verified</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        <span>Business Verification Pending</span>
                      </div>
                    </div>
                    <Button className="w-full">Complete Verification</Button>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </Card>

          <div className="space-y-6">
            {/* <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">AI Assistant</h3>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">
                    Suggestion
                  </Badge>
                  <p className="text-sm text-muted-foreground">{aiSuggestion}</p>
                </div>
              </div>
            </Card> */}

            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Compliance Status</h3>
                </div>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Badge variant="outline">FinCEN</Badge>
                      <p className="text-sm">MSB Registration Required</p>
                    </div>
                    <div className="space-y-1">
                      <Badge variant="outline">SEC</Badge>
                      <p className="text-sm">Regulation Crowdfunding Compliance</p>
                    </div>
                    <div className="space-y-1">
                      <Badge variant="outline">State Level</Badge>
                      <p className="text-sm">
                        Additional state licenses may be required
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
