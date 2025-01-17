'use client'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ImageIcon, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function App() {
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        about: "",
        profilePicture: null as File | null,
        profilePicturePreview: "",
    });
    const [isFundraiser,setisFundraiser] = useState(true)
    useEffect(() => {
        // call API to fetch user profile data and populate the form  
        axios.get('/').then((response) => {
            const data = response.data;
            setProfileData({
                username: data.username,
                email: data.email,
                password: "",
                confirmPassword: "",
                about: "",
                profilePicture: null,
                profilePicturePreview: data.profilePicture,
            });
        }).catch((error) => {
            toast.error('Failed to fetch user profile data');
        });

    }, []);

    const [businessData, setBusinessData] = useState({
        investmentFocus: "",
        investmentAmount: "",
        field_of_interest: "",
        investmentExperience: "",
        kyc_document: null as File | null,
        document_upload: null as File | null,
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfileData({
            ...profileData,
            [e.target.id]: e.target.value,
        });
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileData({
                ...profileData,
                profilePicture: file,
                profilePicturePreview: URL.createObjectURL(file),
            });
        }
    };

    const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessData({
            ...businessData,
            [e.target.id]: e.target.value,
        });
    };

    const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'document_upload' | 'kyc_document') => {
        const file = e.target.files?.[0];
        if (file) {
            setBusinessData({
                ...businessData,
                
                [e.target.id]: file.name,
            });
        }
    };

    const handleSectorChange = (value: string) => {
        setBusinessData({
            ...businessData,
            field_of_interest: value,
        });
    };

    const handleExperienceChange = (value: string) => {
        setBusinessData({
            ...businessData,
            investmentExperience: value,
        });
    };

    const handleSubmit = (type: 'profile' | 'business') => {
        if (type === 'profile') {
            if (profileData.password !== profileData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            console.log('Profile Data:', profileData);
        } else {
            debugger
            const submittedJSON = JSON.stringify({...businessData,role:isFundraiser?"fundraiser":"investor"});
            axios.post('http://localhost:8000/auth/sendRequest',submittedJSON,{ headers: { 'Content-Type': 'application/json' },withCredentials:true}).then((response) => {
                debugger
                toast.success('Business details saved successfully');
                

            }).catch((error) => {
                debugger
                toast.error(error.response.data.message);
            });
            console.log('Business Data:', businessData);
        }
    };

    return (
        <div className="h-screen flex  justify-center bg-black p-10">
            <ToastContainer />
            <div className="h-4/5 mt-10">
                <Tabs defaultValue="profile" className="w-[600px] h-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">Profile Details</TabsTrigger>
                        <TabsTrigger value="business">Business Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Details</CardTitle>
                                <CardDescription>
                                    Edit your profile information and settings.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="spcae-y-1">
                                <div className="spcae-y-1">
                                    <Label>Profile Picture</Label>
                                    <div className="flex flex-col items-center space-y-4">
                                        {profileData.profilePicturePreview ? (
                                            <div className="relative w-32 h-32">
                                                <img
                                                    src={profileData.profilePicturePreview}
                                                    alt="Profile Preview"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                                                <ImageIcon className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                id="profilePicture"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleProfilePictureChange}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => document.getElementById('profilePicture')?.click()}
                                            >
                                                Upload Photo
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="spcae-y-1">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        placeholder="Enter your username"
                                        value={profileData.username}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="spcae-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={profileData.email}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="spcae-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={profileData.password}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="spcae-y-1">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={profileData.confirmPassword}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="spcae-y-1">
                                    <Label htmlFor="about">About</Label>
                                    <Textarea
                                        id="about"
                                        placeholder="Tell us about yourself"
                                        value={profileData.about}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handleSubmit('profile')}>Save Profile</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="business">
                        <Card>
                            <CardHeader>
                                <CardTitle>Business Details</CardTitle>
                                <CardDescription>
                                    Tell us about your investment preferences and experience.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="investmentFocus">Investment Focus</Label>
                                    <Input
                                        id="investmentFocus"
                                        placeholder="e.g., Technology, Real Estate"
                                        value={businessData.investmentFocus}
                                        onChange={handleBusinessChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="investmentAmount">Investment Budget (USD)</Label>
                                    <Input
                                        id="investmentAmount"
                                        type="number"
                                        placeholder="Enter your investment budget"
                                        value={businessData.investmentAmount}
                                        onChange={handleBusinessChange}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="investmentSector">Investment Sector</Label>
                                    <Select onValueChange={handleSectorChange} value={businessData['field_of_interest']}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a sector" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tech">Technology</SelectItem>
                                            <SelectItem value="health">Healthcare</SelectItem>
                                            <SelectItem value="finance">Financial Services</SelectItem>
                                            <SelectItem value="real-estate">Real Estate</SelectItem>
                                            <SelectItem value="energy">Energy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="investmentExperience">Investment Experience</Label>
                                    <Select onValueChange={handleExperienceChange} value={businessData.investmentExperience}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                                            <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                                            <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                                            <SelectItem value="expert">Expert (10+ years)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label>Document Uploaf</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="document_upload"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                            onChange={(e) => handleDocumentUpload(e, 'document_upload')}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => document.getElementById('document_upload')?.click()}
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            {businessData['document_upload'] ? businessData['document_upload'].name : 'Upload Supporting Document'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label>KYC Documnet</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="kyc_document"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                            onChange={(e) => handleDocumentUpload(e, 'kyc_document')}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => document.getElementById('kyc_document')?.click()}
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            {businessData['kyc_document'] ? businessData['kyc_document'].name : 'Upload KYC details'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="flex items-center space-x-2">
                                       
                                        <Switch onCheckedChange={(e)=>{
                                            
                                                setisFundraiser(prev => !prev)

                                        }}/>
                                        <span>{isFundraiser?" Rqeuest for Fundraiser Role " : " Request for Investor Role"}</span>
                                    </label>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => handleSubmit('business')}>Save Business Details</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}