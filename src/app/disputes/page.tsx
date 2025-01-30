'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {useRouter } from 'next/navigation'

// interface Dispute {
//   id: number | null;
//   title: string | null;
//   description: string | null;
//   reportedBy: string | null;
//   date: string | null;
//   status: string | null;
//   type: string | null;
// }

const filterOptions = {
  status: ['Under Review', 
    //'In Mediation', 
    'Resolved', 
    //'In Arbitration', 'Reported'
    ],
  type: ['Fraud', 'Mis Representation', 'Scope Disagreement','Quality Concerns','Technical Issues','Other'], // Replace with actual types
};

export default function Home() {
  const [disputes, setDisputes] = useState<Object[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const router = useRouter()

  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/getAlldisputes`);
        debugger
        setDisputes(response.data);
      } catch (e) {
        toast.error("Error while getting disputes");
      }
    };
    fetchDisputes();
  }, []);

  const handleViewDetails = (id: number) => {
    toast.info(`Opening details for dispute #${id}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    router.push(`/dispute-management/${id}`)
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Under Review': 'bg-blue-500',
      //'In Mediation': 'bg-purple-500',
      'Resolved': 'bg-green-500',
    //   'In Arbitration': 'bg-orange-500',
    //   'Reported': 'bg-yellow-500',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };
  const capitalize = (str:String)=>{
    return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  }

  const filteredDisputes = disputes.filter((dispute) => {
    const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(dispute.status || '');
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(capitalize(dispute.disputeType) || '');
    return statusMatch && typeMatch;
  });

  const handleClearFilters = () => {
    setSelectedStatus([]);
    setSelectedTypes([]);
    // toast.success('Filters cleared');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dispute Management</h1>
        </div>

        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Filter Disputes</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Status</h3>
                  <div className="space-y-2">
                    {filterOptions.status.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
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
                        />
                        <label htmlFor={status} className="text-sm">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Type</h3>
                  <div className="space-y-2">
                    {filterOptions.type.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
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
                        />
                        <label htmlFor={type} className="text-sm">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredDisputes.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No disputes match the selected filters
                </CardContent>
              </Card>
            ) : (
              filteredDisputes.map((dispute, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{dispute.title}</h3>
                        <p className=" mb-4">{dispute.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Reported by: {dispute.reportedBy}</span>
                          <span>Date: {new Date(dispute.createdAt).toLocaleDateString()}</span>
                          <span>Type: {capitalize(dispute.disputeType)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className={getStatusColor(dispute.status || '')}>
                          {dispute.status}
                        </Badge>
                        <Button
                          variant="outline"
                          onClick={() => handleViewDetails(dispute.disputeId || 0)}
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