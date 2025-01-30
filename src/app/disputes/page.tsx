'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, Filter, RefreshCw, Search } from 'lucide-react';

const filterOptions = {
  status: [
    'Under Review',
    'Resolved',
  ],
  type: [
    'Fraud',
    'Mis Representation',
    'Scope Disagreement',
    'Quality Concerns',
    'Technical Issues',
    'Other'
  ],
};

export default function Home() {
  const [disputes, setDisputes] = useState<Object[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/getAlldisputes`);
        setDisputes(response.data);
      } catch (e) {
        toast.error("Error while getting disputes");
      }
    };
    fetchDisputes();
  }, []);

  const handleViewDetails = (id: number) => {
    router.push(`/dispute-management/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review':
        return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20';
      case 'Resolved':
        return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Under Review':
        return <AlertCircle className="w-4 h-4 mr-1.5" />;
      case 'Resolved':
        return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
      default:
        return null;
    }
  };

  const capitalize = (str: string) => {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const filteredDisputes = disputes.filter((dispute) => {
    const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(dispute.status || '');
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(capitalize(dispute.disputeType) || '');
    return statusMatch && typeMatch;
  });

  const handleClearFilters = () => {
    setSelectedStatus([]);
    setSelectedTypes([]);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <ToastContainer />
      <div className=" mx-auto space-y-8">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Dispute Management
            </h1>
            <p className="text-gray-400 mt-2">
              Manage and resolve user disputes efficiently
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleClearFilters}
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          {isFilterOpen && (
            <Card className="h-fit bg-card/50 backdrop-blur border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 text-primary">Status</h3>
                    <div className="space-y-3">
                      {filterOptions.status.map((status) => (
                        <label
                          key={status}
                          className="flex items-center space-x-3 cursor-pointer group"
                        >
                          <Checkbox
                            id={status}
                            checked={selectedStatus.includes(status)}
                            onCheckedChange={(checked) => {
                              setSelectedStatus(
                                checked
                                  ? [...selectedStatus, status]
                                  : selectedStatus.filter((s) => s !== status)
                              );
                            }}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 text-primary">Type</h3>
                    <div className="space-y-3">
                      {filterOptions.type.map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-3 cursor-pointer group"
                        >
                          <Checkbox
                            id={type}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              setSelectedTypes(
                                checked
                                  ? [...selectedTypes, type]
                                  : selectedTypes.filter((t) => t !== type)
                              );
                            }}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {filteredDisputes.length === 0 ? (
              <Card className="bg-card/50 backdrop-blur border-primary/10">
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No disputes match the selected filters</p>
                </CardContent>
              </Card>
            ) : (
              filteredDisputes.map((dispute, index) => (
                <Card 
                  key={index}
                  className="bg-card/50 backdrop-blur border-primary/10 hover:bg-card/70 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                      <div className="flex-grow space-y-3">
                        <h3 className="text-xl font-semibold text-white">
                          {dispute.title}
                        </h3>
                        <p className="text-gray-400 line-clamp-2">
                          {dispute.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            Reported by: {dispute.reportedBy}
                          </span>
                          <span className="flex items-center">
                            {new Date(dispute.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            Type: {capitalize(dispute.disputeType)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Badge 
                          variant="secondary"
                          className={`flex items-center ${getStatusColor(dispute.status || '')}`}
                        >
                          {getStatusIcon(dispute.status)}
                          {dispute.status}
                        </Badge>
                        <Button
                          variant="outline"
                          onClick={() => handleViewDetails(dispute.disputeId || 0)}
                          className="w-full sm:w-auto"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}