'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Upload, FileCheck, UserPlus, GraduationCap, AlertCircle, FileText, DollarSign } from 'lucide-react';
import { useState, useRef } from 'react';
import { AIAssistant } from '@/components/AIAssistant';
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import TabsPanel from '@/components/ui/TabsPanel';
import { isValid } from 'zod';


//for tab changes 
const tabs = [
  { id: 'identification', value: 'identification', label: 'Identification', icon: UserPlus },
  { id: 'accreditation', value: 'accreditation', label: 'Accreditation', icon: GraduationCap },
  { id: 'aml', value: 'aml', label: 'AML Compliance', icon: AlertCircle },
  { id: 'securities', value: 'securities', label: 'Securities', icon: FileText },
  { id: 'tax', value: 'tax', label: 'Tax Compliance', icon: DollarSign },
];

export default function KYCPage() {
  const [isUsCitizen, setIsUsCitizen] = useState(false);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const router = useRouter();

  const [files, setFiles] = useState({
    idFront: null,
    idBack: null,
    incomeProof: null,
    netWorthStatement: null,
  });

  const [formData, setFormData] = useState({
    country: 'us',
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
    isAccreditedInvestor: true,
  });

  /* const [file, setFile] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    console.log('Upload button clicked');
    fileInputRef.current?.click();
  }; */
  async function uploadFile(file: any) {
    /* const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; */

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });
      console.log('File uploaded:', response);

      const result = await response.json();
      if (result.status === 'success') {
        console.log('File uploaded data:', result.data);
        alert(result.message);
        return result.data.filename;
      }
      else {
        console.error('Error uploading file:', result.error);
        alert('Error uploading file');
      }
      //console.log('File uploaded data:', result);
      //alert(result.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  }


  const fileInputRefs = {
    idFront: useRef<HTMLInputElement>(null),
    idBack: useRef<HTMLInputElement>(null),
    incomeProof: useRef<HTMLInputElement>(null),
    netWorthStatement: useRef<HTMLInputElement>(null),
  };

  const handleFileChange = async (event: any, type: any) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [type]: event.target.files[0],
    }));
    console.log('File uploaded:', event.target.files[0]);
    try {
      let filename = await uploadFile(event.target.files[0]);
      setFormData(prev => ({
        ...prev,
        [type]: filename,
      }));
    }
    catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }

    /* setFormData(prev => ({
      ...prev,
      [type]: event.target.files[0], */

  };

  const handleUploadClick = (type: any) => {
    fileInputRefs[type].current.click();
  };

  const truncateFileName = (name: any, maxLength: any) => {
    if (name.length <= maxLength) return name;
    const separator = '...';
    const charsToShow = maxLength - separator.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return name.substr(0, frontChars) + separator + name.substr(name.length - backChars);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAISuggestion = (field: string, value: string) => {
    handleInputChange(field, value);
  };

  const handleKYCSubmit = () => {
    console.log('KYC Form Data:', formData);

    // Send KYC form data to the backend
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/kyc`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        toast.success('Login Successful')
        debugger;
        if (data.error) {
          alert(data.error);
          toast.error(data.error);
        }
        else {
          alert('KYC form submitted successfully!');
          toast.success('KYC form submitted successfully!');
          router.push('/');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the KYC form.');
        toast.error('An error occurred while submitting the KYC form.');
      });

  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className=" mx-auto space-y-8">
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

            <Tabs value={tabs[currentTab]?.id}
              onValueChange={(value) => setCurrentTab(tabs.findIndex(tab => tab.id === value))}
              className="flex-1 overflow-hidden">
              <TabsPanel tabs={tabs} activeTab={currentTab} onTabChange={setCurrentTab} isValid={true} />

              <div>
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
                            onChange={(e) => setIsUsCitizen(e.target.checked)}
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
                          <Button variant="outline" className="h-32" onClick={() => handleUploadClick('idFront')}>
                            <div className="flex flex-col items-center space-y-2">
                              <Upload className="h-6 w-6" />
                              <input
                                type="file"
                                ref={fileInputRefs.idFront}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(e, 'idFront')}
                              />
                              {files.idFront && <p>{truncateFileName(files.idFront.name, 20)}</p>}
                              <span>Upload ID Front</span>
                            </div>
                          </Button>
                          <Button variant="outline" className="h-32" onClick={() => handleUploadClick('idBack')}>
                            <div className="flex flex-col items-center space-y-2">
                              <Upload className="h-6 w-6" />
                              <input
                                type="file"
                                ref={fileInputRefs.idBack}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(e, 'idBack')}
                              />
                              {files.idBack && <p>{truncateFileName(files.idBack.name, 20)}</p>}
                              <span>Upload ID Back</span>
                            </div>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="accreditation">
                  <Card className="bg-dark-gray rounded shadow-md">
                    <CardHeader className="py-4 px-6 bg-medium-gray">
                      <CardTitle className="text-lg font-bold text-white">Accredited Investor Verification</CardTitle>
                      <CardDescription className="text-sm text-light-gray">
                        Verify your status as an accredited investor to access exclusive investment opportunities.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8 text-gray-300">
                      <section className="space-y-4">
                        <h3 className="text-lg font-bold">Qualification Criteria</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="bg-dark-gray p-6 rounded shadow-md">
                            <header className="py-2 px-4 bg-medium-gray border-b border-light-gray">
                              <h5 className="text-lg font-bold">Income Qualification</h5>
                            </header>
                            <div className="p-4 space-y-2 text-sm">
                              <ul className="list-disc list-inside">
                                <li>Individual income > $200,000 in each of the past 2 years</li>
                                <li>Joint income with spouse > $300,000 in each of the past 2 years</li>
                                <li>Reasonable expectation of maintaining income levels</li>
                              </ul>
                            </div>
                          </Card>
                          <Card className="bg-dark-gray p-6 rounded shadow-md">
                            <header className="py-2 px-4 bg-medium-gray border-b border-light-gray">
                              <h5 className="text-lg font-bold">Net Worth Qualification</h5>
                            </header>
                            <div className="p-4 space-y-2 text-sm">
                              <ul className="list-disc list-inside">
                                <li>Individual or joint net worth > $1 million</li>
                                <li>Excluding primary residence</li>
                                <li>Including assets and liabilities</li>
                              </ul>
                            </div>
                          </Card>
                        </div>
                      </section>

                      <section className="space-y-4">
                        <h3 className="text-lg font-bold">Document Upload</h3>
                        <div className="grid grid-cols-1 gap-4">
                          <Button variant="outline" className="bg-medium-gray py-2 px-6 border border-light-gray rounded hover:bg-dark-gray transition duration-300"
                            onClick={() => handleUploadClick('incomeProof')}
                            >
                            <div className="flex flex-col items-center space-y-2">
                              <Upload className="h-6 w-6" />
                              <input
                                type="file"
                                ref={fileInputRefs.incomeProof}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(e, 'incomeProof')}
                              />
                              {files.incomeProof && <p className="text-gray-400">{truncateFileName(files.incomeProof.name, 20)}</p>}
                              <span className="text-white">Upload Income Proof</span>
                              <span className="text-sm text-light-gray">Tax returns, W-2s, or pay stubs</span>
                            </div>
                          </Button>
                          <Button variant="outline" className="bg-medium-gray py-2 px-6 border border-light-gray rounded hover:bg-dark-gray transition duration-300"
                            onClick={() => handleUploadClick('netWorthStatement')}
                            >
                            <div className="flex flex-col items-center space-y-2">
                              <Upload className="h-6 w-6" />
                              <input
                                type="file"
                                ref={fileInputRefs.netWorthStatement}
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(e, 'netWorthStatement')}
                              />
                              {files.netWorthStatement && <p className="text-gray-400">{truncateFileName(files.netWorthStatement.name, 20)}</p>}
                              <span className="text-white">Upload Net Worth Statement</span>
                              <span className="text-sm text-light-gray">Bank statements, investment accounts, or certification letter</span>
                            </div>
                          </Button>
                        </div>
                      </section>
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
              </div>

            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save Progress</Button>
              {/*  <Button onClick={() => console.log('KYC Form Data:', formData)}>Submit for Review</Button> */}
              <Button onClick={() => handleKYCSubmit()}>Submit for Review</Button>
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
