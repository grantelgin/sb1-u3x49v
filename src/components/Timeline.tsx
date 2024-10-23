import React from 'react';
import { useInvoice } from '../context/InvoiceContext';

const Timeline = () => {
  const { items } = useInvoice();

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={item.id} className="relative pl-10">
            <div className="absolute left-0 top-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              {index + 1}
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900">{item.description}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Quantity: {item.quantity} × ${item.price}
              </p>
              
              {item.images.length > 0 && (
                <div className="mt-4">
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {item.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Progress ${imgIndex + 1}`}
                        className="h-20 w-20 object-cover rounded-lg flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;