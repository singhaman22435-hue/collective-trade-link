import React, { createContext, useContext, useState, useEffect } from 'react';

const InquiryContext = createContext(null);

export const InquiryProvider = ({ children }) => {
  const [inquiries, setInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem('ctl_inquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ctl_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const markAsRead = (id) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, read: true } : inq))
    );
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const unreadCount = inquiries.filter((inq) => !inq.read).length;

  return (
    <InquiryContext.Provider value={{ inquiries, addInquiry, markAsRead, deleteInquiry, unreadCount }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiries = () => useContext(InquiryContext);
