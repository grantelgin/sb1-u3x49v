import React, { createContext, useContext, useState } from 'react';

interface Item {
  id: string;
  description: string;
  quantity: number;
  price: number;
  images: string[];
}

interface InvoiceContextType {
  items: Item[];
  addItem: () => void;
  updateItem: (id: string, updatedItem: Item) => void;
  removeItem: (id: string) => void;
  addImageToItem: (id: string, imageUrl: string) => void;
  updateTotal: () => number;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: '',
        quantity: 1,
        price: 0,
        images: [],
      },
    ]);
  };

  const updateItem = (id: string, updatedItem: Item) => {
    setItems(items.map((item) => (item.id === id ? updatedItem : item)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addImageToItem = (id: string, imageUrl: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, images: [...item.images, imageUrl] }
          : item
      )
    );
  };

  const updateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  return (
    <InvoiceContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        addImageToItem,
        updateTotal,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};