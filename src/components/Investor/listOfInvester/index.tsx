import React from 'react';
import { motion } from 'framer-motion';

// Dummy data for investors
const investors = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    investmentDate: '2024-03-15',
    contactNumber: '+1 (555) 123-4567',
    address: '123 Investment Ave, New York, NY 10001'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    investmentDate: '2024-03-14',
    contactNumber: '+1 (555) 234-5678',
    address: '456 Finance St, San Francisco, CA 94105'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    investmentDate: '2024-03-13',
    contactNumber: '+1 (555) 345-6789',
    address: '789 Venture Blvd, Boston, MA 02110'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    investmentDate: '2024-03-12',
    contactNumber: '+1 (555) 456-7890',
    address: '321 Capital Row, Chicago, IL 60601'
  },
  {
    id: 5,
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    investmentDate: '2024-03-11',
    contactNumber: '+1 (555) 567-8901',
    address: '654 Equity Lane, Seattle, WA 98101'
  }
];

export default function ListOfInvestor() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto"
      >
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"
          >
            Investors List
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 sm:mt-0"
          >
            <span className="text-gray-400">
              Total Investors: {investors.length}
            </span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="overflow-x-auto rounded-xl shadow-xl border border-gray-700/50 bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm"
        >
          <table className="min-w-full divide-y divide-gray-700/50">
            <thead className="bg-gray-800/70">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Email ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Investment Date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Contact Number
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 bg-gray-900/20">
              {investors.map((investor, index) => (
                <motion.tr 
                  key={investor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group hover:bg-gray-800/40 transition-all duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
                        {investor.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {investor.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {new Date(investor.investmentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {investor.contactNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {investor.address}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  );
}