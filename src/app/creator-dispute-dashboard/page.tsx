"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";

const disputes = [
  {
    id: 1,
    campaignTitle: "Save the Ocean Initiative",
    campaignType: "Environmental",
    status: "pending",
    reason: "Possible fund misuse reported by the fundraiser",
    lastUpdate: "2025-01-25",
  },
  {
    id: 2,
    campaignTitle: "Tech Education for All",
    campaignType: "Education",
    status: "resolved",
    reason: "Documentation discrepancy in expense reports",
    lastUpdate: "2025-01-24",
  },
  {
    id: 3,
    campaignTitle: "Community Health Center",
    campaignType: "Healthcare",
    status: "escalated",
    reason: "Missing progress updates and financial reports",
    lastUpdate: "2025-01-23",
  },
];

export default function DisputesDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Filter disputes based on search query and selected type
  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch = dispute.campaignTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || dispute.campaignType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="h-screen flex justify-center mt-16">

    
        <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">Campaign Disputes Dashboard</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
            className="md:w-[300px]"
            placeholder="Search by Campaign Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Campaign Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Environmental">Environmental</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
            </SelectContent>
            </Select>
        </div>

        {/* Dispute List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDisputes.map((dispute) => (
            <Card key={dispute.id} className="flex flex-col">
                <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                    <CardTitle className="text-xl">{dispute.campaignTitle}</CardTitle>
                    <CardDescription>{dispute.campaignType}</CardDescription>
                    </div>
                    <Badge
                    variant={
                        dispute.status === "pending"
                        ? "default"
                        : dispute.status === "resolved"
                        ? "secondary"
                        : "destructive"
                    }
                    >
                    {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                    </Badge>
                </div>
                </CardHeader>
                <CardContent className="flex-grow">
                <p className="text-muted-foreground">{dispute.reason}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                    Last Update: {format(new Date(dispute.lastUpdate), "MMM dd, yyyy")}
                </span>
                <Button variant="ghost" className="flex items-center">
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
        </div>
    </div>
  );
}