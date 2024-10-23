import React from 'react';
import { useDrag } from 'react-dnd';
import { Upload } from 'lucide-react';

const ImagePanel = () => {
  const images = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12',
    'https://images.unsplash.com/photo-1590579491624-f98f36d4c763',
  ];

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop images here, or click to select files
        </p>
        <input
          type="file"
          multiple
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            // Handle file upload
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {images.map((url, index) => (
          <DraggableImage key={index} url={url} />
        ))}
      </div>
    </div>
  );
};

const DraggableImage = ({ url }: { url: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { url },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`relative cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <img
        src={url}
        alt="Construction work"
        className="w-full h-24 object-cover rounded-lg"
      />
    </div>
  );
};

export default ImagePanel;