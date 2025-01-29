import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Campaign } from '@/hooks/useCampaigns';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from '@/components/ui/table';

interface CampaignTableProps {
    campaigns: Campaign[];
    onViewDetails: (campaign: Campaign) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onViewDetails }) => {
    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5
            }
        },
        hover: {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            transition: {
                duration: 0.2
            }
        }
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit";
        switch (status.toLowerCase()) {
            case 'active':
                return (
                    <span className={`${baseClasses} bg-emerald-500/20 text-emerald-400 border border-emerald-500/20`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active
                    </span>
                );
            case 'pending':
                return (
                    <span className={`${baseClasses} bg-amber-500/20 text-amber-400 border border-amber-500/20`}>
                        <Clock className="w-3.5 h-3.5" />
                        Pending
                    </span>
                );
            default:
                return (
                    <span className={`${baseClasses} bg-gray-500/20 text-gray-400 border border-gray-500/20`}>
                        <AlertCircle className="w-3.5 h-3.5" />
                        {status}
                    </span>
                );
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={tableVariants}
            className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm"
        >
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-800/50">
                        <TableRow className="border-b-gray-700 hover:bg-transparent">
                            <TableHead className="text-gray-300 font-medium">Campaign Title</TableHead>
                            <TableHead className="text-gray-300 font-medium">Founder</TableHead>
                            <TableHead className="text-gray-300 font-medium">Category</TableHead>
                            <TableHead className="text-gray-300 font-medium">Target Amount</TableHead>
                            <TableHead className="text-gray-300 font-medium">Status</TableHead>
                            <TableHead className="text-gray-300 font-medium text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {campaigns.map((campaign) => (
                            <motion.tr
                                key={campaign._id}
                                variants={rowVariants}
                                whileHover="hover"
                                className="border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm transition-colors"
                            >
                                <TableCell className="font-medium text-gray-200">
                                    {campaign.title}
                                </TableCell>
                                <TableCell className="text-gray-300">{campaign.owner}</TableCell>
                                <TableCell className="text-gray-300 capitalize">
                                    {campaign.category}
                                </TableCell>
                                <TableCell className="text-gray-300">
                                    <span className="font-mono">
                                        ${campaign.goal_amount.toLocaleString()}
                                    </span>
                                </TableCell>
                                <TableCell>{getStatusBadge(campaign.published ? 'active' : 'pending')}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        onClick={() => onViewDetails(campaign)}
                                        variant="ghost"
                                        className="hover:bg-blue-500/10 hover:text-blue-400 group"
                                    >
                                        View Details
                                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                                    </Button>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};

export default CampaignTable;