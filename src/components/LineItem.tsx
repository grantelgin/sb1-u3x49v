import React from 'react';
import { useDrop } from 'react-dnd';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import { useInvoice } from '../context/InvoiceContext';

interface LineItemProps {
  item: {
    id: string;
    description: string;
    quantity: number;
    price: number;
    images: string[];
  };
  index: number;
}

const LineItem = ({ item, index }: LineItemProps) => {
  const { updateItem, removeItem, addImageToItem } = useInvoice();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: (droppedItem: { url: string }) => {
      addImageToItem(item.id, droppedItem.url);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 rounded-lg border ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            value={item.description}
            onChange={(e) =>
              updateItem(item.id, { ...item, description: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItem(item.id, { ...item, quantity: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={item.price}
            onChange={(e) =>
              updateItem(item.id, { ...item, price: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end space-x-2">
          <button
            onClick={() => removeItem(item.id)}
            className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Work Images
          </label>
          <span className="text-sm text-gray-500">
            Drag images here or click to upload
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {item.images.map((image, imgIndex) => (
            <div key={imgIndex} className="relative group">
              <img
                src={image}
                alt={`Work progress ${imgIndex + 1}`}
                className="h-24 w-full object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  const newImages = [...item.images];
                  newImages.splice(imgIndex, 1);
                  updateItem(item.id, { ...item, images: newImages });
                }}
                className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">Add Image</span>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
              if (e.target.files?.[0]) {
                const url = URL.createObjectURL(e.target.files[0]);
                addImageToItem(item.id, url);
              }
            }} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default LineItem;