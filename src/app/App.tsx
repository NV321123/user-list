import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Header } from '@/widgets/header/ui/Header';
import { Footer } from '@/widgets/footer/ui/Footer';
import { Main } from '@/shared/ui/Layout/Main';
import { UserTable } from '@/widgets/user-list/ui/UserTable';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {

  console.log('App');
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Main>
        <UserTable />
      </Main>
      <Footer />
      
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop
        theme="light"
      />
    </div>
  );
};

export default App;