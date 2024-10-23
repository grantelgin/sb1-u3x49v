import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Building2, Receipt, Image as ImageIcon, PlusCircle, Calendar, DollarSign } from 'lucide-react';
import InvoiceForm from './components/InvoiceForm';
import ImagePanel from './components/ImagePanel';
import Timeline from './components/Timeline';
import { InvoiceProvider } from './context/InvoiceContext';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <InvoiceProvider>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-semibold text-gray-900">BuildInvoice Pro</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    New Invoice
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <InvoiceForm />
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Project Timeline
                  </h2>
                  <Timeline />
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Image Gallery
                  </h2>
                  <ImagePanel />
                </div>
              </div>
            </div>
          </main>
        </div>
      </InvoiceProvider>
    </DndProvider>
  );
}

export default App;