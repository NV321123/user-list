import React from 'react';

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {

  console.log('Main');
  
  return (
    <main className="flex-1 flex flex-col">
      <div className="container flex-1 flex flex-col py-6 px-4 md:px-6">
        {children}
      </div>
    </main>
  );
};