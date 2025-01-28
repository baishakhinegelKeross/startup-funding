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
import { ImageIcon, Upload, ChevronsUpDown, Check, Shield } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { request } from "http";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";






export default function App() {
    const [profileData, setProfileData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        about: "",
        profilePicture: null as File | null,
        profilePicturePreview: "",
        company: "",
        selectedDomains: [] as string[],
        kycVerified: false,
    });

    let approvalStatus = "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                // call API to fetch user profile data and populate the form  


                const approvalStatusResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/roleRequest`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json' // Adjust the content type if needed
                        }
                    }
                );

                console.log(approvalStatusResponse.data);


                approvalStatus = approvalStatusResponse.data.role;


            } catch (error) {

                toast.error('Failed to fetch user role status');
            }
        };

        fetchData();
    }, []);
    const currentPath = usePathname()
    const currentRoleRequest = currentPath.split("/")[2];
    console.log(currentRoleRequest);


    const [businessData, setBusinessData] = useState({
        industry: "",
        investmentAmount: "",
        field_of_interest: "",
        investmentExperience: "",
        kyc_document: null as File | null,
        document_upload: null as File | null,
        company: "",
    });
    const domains = [
        { value: "Telecommunications", label: "Telecommunications" },
        { value: "Retail", label: "Retail" },
        { value: "Advertising", label: "Advertising" },
        { value: "Manufacturing", label: "Manufacturing" },
        { value: "Automotive", label: "Automotive" },
        { value: "Construction and Engineering", label: "Construction and Engineering" },
        { value: "Transportation", label: "Transportation" },
        { value: "Transport", label: "Transport" },
        { value: "Software", label: "Software" },
        { value: "Infrastructure", label: "Infrastructure" },
        { value: "Food", label: "Food" },
        { value: "Financial Services", label: "Financial Services" },
        { value: "Oil and Gas", label: "Oil and Gas" },
        { value: "Consultancy Services", label: "Consultancy Services" },
        { value: "Accounting", label: "Accounting" },
        { value: "Technology", label: "Technology" },
        { value: "Engineering", label: "Engineering" },
        { value: "Food and Beverage", label: "Food and Beverage" },
        { value: "Aviation", label: "Aviation" },
        { value: "Insurance", label: "Insurance" },
        { value: "Other", label: "Other" }
    ];

    const countries = [
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
        { value: "au", label: "Australia" },
        { value: "de", label: "Germany" },
        { value: "fr", label: "France" },
        { value: "in", label: "India" },
        { value: "jp", label: "Japan" },
        // Add more countries as needed
    ];

    const [open, setOpen] = useState(false);

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
            const submittedJSON = JSON.stringify({ ...businessData, role: currentRoleRequest });
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/sendRequest`, submittedJSON, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }).then((response) => {
                debugger
                toast.success('Role request sent sucessfully');


            }).catch((error) => {
                debugger
                toast.error(error.response.data.error);
            });
            console.log('Business Data:', businessData);
        }
    };

    function handleDomainToggle(value: string) {
        throw new Error("Function not implemented.");
    }

    function handleKYCVerification() {
        // Implement your KYC verification logic here
        console.log("KYC verification initiated");
    }

    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <ToastContainer position="top-right" theme="dark" />

            <div className="relative z-10 max-w-3xl mx-auto">
                <Card className="backdrop-blur-lg bg-white/10 border-0 shadow-2xl mt-10">
                    <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-bold text-white">Profile Settings</CardTitle>
                        <p className="text-sm text-gray-300">Manage your account settings and preferences</p>
                    </CardHeader>
                    <CardContent className="max-h-[calc(100vh-147px)] overflow-y-auto">
                        <form onSubmit={handleSubmit} className="space-y-6 mt-1">
                            {/* Profile Picture Section */}
                            <div className="flex justify-center">
                                <div className="space-y-3">
                                    <div className="relative w-24 h-24 mx-auto">
                                        {profileData.profilePicturePreview ? (
                                            <img
                                                src={profileData.profilePicturePreview}
                                                alt="Profile Preview"
                                                className="w-full h-full object-cover rounded-full ring-2 ring-blue-500/50"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center ring-2 ring-blue-500/50">
                                                <ImageIcon className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-center">
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
                                            className="bg-gray-800/50 text-white hover:bg-gray-700/50 border-gray-600 text-sm py-1"
                                        >
                                            Change Photo
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {/* Basic Information */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="username" className="text-white text-sm">Username</Label>
                                        <Input
                                            id="username"
                                            placeholder="Enter your username"
                                            value={profileData.username}
                                            onChange={handleProfileChange}
                                            className="bg-gray-800/50 border-gray-600 text-white focus:ring-blue-500/50 h-9"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="email" className="text-white text-sm">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={profileData.email}
                                            onChange={handleProfileChange}
                                            className="bg-gray-800/50 border-gray-600 text-white focus:ring-blue-500/50 h-9"
                                        />
                                    </div>
                                </div>

                                {/* Company and Country */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="company" className="text-white text-sm">Company (Optional)</Label>
                                        <Input
                                            id="company"
                                            placeholder="Enter your company name"
                                            value={profileData.company}
                                            onChange={handleProfileChange}
                                            className="bg-gray-800/50 border-gray-600 text-white focus:ring-blue-500/50 h-9"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="country" className="text-white text-sm">Country</Label>
                                        <Select onValueChange={(value) => setProfileData(prev => ({ ...prev, country: value }))}>
                                            <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white h-9">
                                                <SelectValue placeholder="Select your country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries.map((country) => (
                                                    <SelectItem key={country.value} value={country.value}>
                                                        {country.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Domains */}
                                {/* Domains Section */}
                                <div className="space-y-1">
                                    <Label className="text-white text-sm">Domains</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between bg-gray-800/50 text-white border-gray-600 hover:bg-gray-700/50 h-9"
                                            >
                                                {profileData.selectedDomains.length === 0
                                                    ? "Select domains..."
                                                    : `${profileData.selectedDomains.length} domain(s) selected`}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[720px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search domains..." className="h-9" />
                                                <CommandEmpty>No domain found.</CommandEmpty>
                                                <CommandGroup className="max-h-[200px] overflow-auto">
                                                    {domains.map((domain) => (
                                                        <CommandItem
                                                            key={domain.value}
                                                            onSelect={() => handleDomainToggle(domain.value)}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    profileData.selectedDomains.includes(domain.value)
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {domain.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>


                                {/* Password Section */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="password" className="text-white text-sm">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={profileData.password}
                                            onChange={handleProfileChange}
                                            className="bg-gray-800/50 border-gray-600 text-white focus:ring-blue-500/50 h-9"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="confirmPassword" className="text-white text-sm">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={profileData.confirmPassword}
                                            onChange={handleProfileChange}
                                            className="bg-gray-800/50 border-gray-600 text-white focus:ring-blue-500/50 h-9"
                                        />
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="space-y-1">
                                    <Label htmlFor="about" className="text-white text-sm">About</Label>
                                    <Textarea
                                        id="about"
                                        placeholder="Tell us about yourself"
                                        value={profileData.about}
                                        onChange={handleProfileChange}
                                        className="bg-gray-800/50 border-gray-600 text-white h-20 min-h-[80px] focus:ring-blue-500/50"
                                    />
                                </div>
                            </div>

                            {/* //ekyc section */}

                            <div className="space-y-1 p-4 bg-gray-800/30 rounded-lg border border-gray-600/50">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-white font-medium flex items-center gap-2">
                                            <CircleAlert className="h-4 w-4 text-yellow-500" />
                                            Identity Verification (e-KYC)
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Complete your identity verification to unlock all features
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={handleKYCVerification}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                                    >
                                        <Shield className="h-4 w-4" />
                                        Verify Identity
                                    </Button>
                                </div>
                                {profileData.kycVerified && (
                                    <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                        Verified
                                    </Badge>
                                )}
                            </div>


                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}