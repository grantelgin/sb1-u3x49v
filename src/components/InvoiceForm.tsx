import React, { useState } from 'react';
import { Receipt, Trash2, Image as ImageIcon, Plus } from 'lucide-react';
import { useInvoice } from '../context/InvoiceContext';
import LineItem from './LineItem';

const InvoiceForm = () => {
  const { items, addItem, updateTotal } = useInvoice();
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Receipt className="h-5 w-5 mr-2 text-blue-600" />
          Invoice Details
        </h2>
        <div className="text-2xl font-bold text-blue-600">
          Total: ${updateTotal().toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              name="name"
              value={companyDetails.name}
              onChange={handleCompanyChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={companyDetails.address}
              onChange={handleCompanyChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={companyDetails.phone}
              onChange={handleCompanyChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={companyDetails.email}
              onChange={handleCompanyChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Line Items</h3>
          <button
            onClick={() => addItem()}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <LineItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;