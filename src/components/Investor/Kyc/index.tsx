'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Upload, AlertCircle, FileCheck, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { AIAssistant } from '@/components/AIAssistant';

export default function KYCPage() {
  const [isUsCitizen, setIsUsCitizen] = useState(false);
  const [currentTab, setCurrentTab] = useState('identification');
  const [formData, setFormData] = useState({
    country:'us',
    firstName: '',
    lastName: '',
    dob: '',
    countryName: "United States",
    nationality: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ssn: '',
    tin: '',
    annualIncome: '',
    netWorth: '',
    isAccreditedInvestor : true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAISuggestion = (field: string, value: string) => {
    handleInputChange(field, value);
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">KYC & Compliance</h1>
              <p className="text-muted-foreground">Complete your verification to start investing</p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                All information provided will be encrypted and securely stored in compliance with privacy regulations.
              </AlertDescription>
            </Alert>

            <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                <TabsTrigger value="identification">Identification</TabsTrigger>
                <TabsTrigger value="accreditation">Accreditation</TabsTrigger>
                <TabsTrigger value="aml">AML Compliance</TabsTrigger>
                <TabsTrigger value="securities">Securities</TabsTrigger>
                <TabsTrigger value="tax">Tax Compliance</TabsTrigger>
              </TabsList>

              <TabsContent value="identification">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Please provide your identification details as they appear on your government-issued ID.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Enter your first name"
                          className='text-white'
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Enter your last name"
                          className='text-white'
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input 
                          id="dob" 
                          type="date"
                          className='text-white'
                          value={formData.dob}
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input 
                          id="nationality" 
                          placeholder="Enter your nationality"
                          className='text-white'
                          value={formData.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Residential Address</Label>
                      <Input 
                        id="address" 
                        placeholder="Street address"
                        className='text-white'
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          placeholder="City"
                          className='text-white'
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input 
                          id="state" 
                          placeholder="State/Province"
                          className='text-white'
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input 
                          id="zipCode" 
                          placeholder="ZIP/Postal Code"
                          className='text-white'
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="usResident" 
                          checked={isUsCitizen}
                          onCheckedChange={(checked) => setIsUsCitizen(checked as boolean)}
                        />
                        <Label htmlFor="usResident">I am a U.S. resident</Label>
                      </div>

                      {isUsCitizen && (
                        <div className="space-y-2">
                          <Label htmlFor="ssn">Social Security Number (SSN)</Label>
                          <Input 
                            id="ssn" 
                            placeholder="XXX-XX-XXXX" 
                            className='text-white'
                            type="password"
                            value={formData.ssn}
                            onChange={(e) => handleInputChange('ssn', e.target.value)}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
                        <Input 
                          id="tin" 
                          placeholder="Enter your TIN"
                          className='text-white'
                          value={formData.tin}
                          onChange={(e) => handleInputChange('tin', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Government ID Upload</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="h-32">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="h-6 w-6" />
                            <span>Upload ID Front</span>
                          </div>
                        </Button>
                        <Button variant="outline" className="h-32">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="h-6 w-6" />
                            <span>Upload ID Back</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accreditation">
                <Card>
                  <CardHeader>
                    <CardTitle>Accredited Investor Verification</CardTitle>
                    <CardDescription>
                      Verify your status as an accredited investor to access exclusive investment opportunities.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Qualification Criteria</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-muted">
                          <CardHeader>
                            <CardTitle className="text-base">Income Qualification</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                              <li>Individual income > $200,000 in each of the past 2 years</li>
                              <li>Joint income with spouse > $300,000 in each of the past 2 years</li>
                              <li>Reasonable expectation of maintaining income levels</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted">
                          <CardHeader>
                            <CardTitle className="text-base">Net Worth Qualification</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                              <li>Individual or joint net worth > $1 million</li>
                              <li>Excluding primary residence</li>
                              <li>Including assets and liabilities</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Document Upload</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <Button variant="outline" className="h-32">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="h-6 w-6" />
                            <span>Upload Income Proof</span>
                            <span className="text-xs text-muted-foreground">Tax returns, W-2s, or pay stubs</span>
                          </div>
                        </Button>
                        <Button variant="outline" className="h-32">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="h-6 w-6" />
                            <span>Upload Net Worth Statement</span>
                            <span className="text-xs text-muted-foreground">Bank statements, investment accounts, or certification letter</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="aml">
                <Card>
                  <CardHeader>
                    <CardTitle>AML Compliance</CardTitle>
                    <CardDescription>
                      Anti-Money Laundering (AML) compliance and Bank Secrecy Act (BSA) requirements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Shield className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="text-lg font-semibold">OFAC Screening</h3>
                          <p className="text-sm text-muted-foreground">
                            Automatic screening against Office of Foreign Assets Control sanctions lists
                          </p>
                        </div>
                      </div>

                      <ScrollArea className="h-48 rounded-md border p-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold">BSA Compliance Declaration</h4>
                          <p className="text-sm">
                            I understand and acknowledge that:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>All information provided is true and accurate</li>
                            <li>Funds used for investment are from legitimate sources</li>
                            <li>I am not acting on behalf of any undisclosed third party</li>
                            <li>I will promptly report any suspicious activities</li>
                            <li>False statements may result in legal consequences</li>
                          </ul>
                        </div>
                      </ScrollArea>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="amlConsent" />
                        <Label htmlFor="amlConsent">I agree to the BSA Compliance Declaration</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="securities">
                <Card>
                  <CardHeader>
                    <CardTitle>Securities Regulations</CardTitle>
                    <CardDescription>
                      Understanding securities regulations and investment limitations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-muted">
                        <CardHeader>
                          <CardTitle className="text-base">Regulation Crowdfunding</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Maximum investment limits based on income/net worth</li>
                            <li>12-month investment limitation across all Reg CF offerings</li>
                            <li>Required disclosure documents</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted">
                        <CardHeader>
                          <CardTitle className="text-base">JOBS Act Title III</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-2 text-sm">
                            <li>Investment company registration requirements</li>
                            <li>Ongoing reporting obligations</li>
                            <li>Investor protection provisions</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Investment Limits Calculator</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="annualIncome">Annual Income</Label>
                          <Input 
                            id="annualIncome" 
                            type="number" 
                            placeholder="Enter your annual income"
                            className='text-white'
                            value={formData.annualIncome}
                            onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="netWorth">Net Worth</Label>
                          <Input 
                            id="netWorth" 
                            type="number" 
                            placeholder="Enter your net worth"
                            className='text-white'
                            value={formData.netWorth}
                            onChange={(e) => handleInputChange('netWorth', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tax">
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Compliance</CardTitle>
                    <CardDescription>
                      Tax reporting requirements and FATCA compliance information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <DollarSign className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="text-lg font-semibold">FATCA Requirements</h3>
                          <p className="text-sm text-muted-foreground">
                            Foreign Account Tax Compliance Act reporting obligations
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="usPerson" />
                          <Label htmlFor="usPerson">I am a U.S. person for tax purposes</Label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="w9Form">Form W-9 (U.S. Persons)</Label>
                          <Button variant="outline" className="w-full">
                            <FileCheck className="mr-2 h-4 w-4" />
                            Download Form W-9
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="w8Form">Form W-8BEN (Non-U.S. Persons)</Label>
                          <Button variant="outline" className="w-full">
                            <FileCheck className="mr-2 h-4 w-4" />
                            Download Form W-8BEN
                          </Button>
                        </div>
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          You will receive appropriate tax forms (1099-B, 1099-DIV, etc.) for your investment activities by January 31st of each year.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save Progress</Button>
              <Button onClick={() => console.log('KYC Form Data:', formData)}>Submit for Review</Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AIAssistant 
              onSuggest={handleAISuggestion}
              currentSection={currentTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
