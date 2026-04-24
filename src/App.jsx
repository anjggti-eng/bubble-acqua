import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from '@/components/layout/AppLayout';
import RoleSelect from '@/pages/RoleSelect';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import BarbershopDetail from '@/pages/BarbershopDetail';
import Appointments from '@/pages/Appointments';
import MyShop from '@/pages/MyShop';
import Profile from '@/pages/Profile';
import OwnerHome from '@/pages/OwnerHome';
import OwnerAppointments from '@/pages/OwnerAppointments';
import OwnerServices from '@/pages/OwnerServices';
import OwnerGallery from '@/pages/OwnerGallery';
import Promotions from '@/pages/Promotions';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin, user, checkUserAuth } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  // Show role selection on first use (no onboarding flag set)
  if (user && !user.onboarded) {
    return <RoleSelect onDone={checkUserAuth} />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Client routes */}
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/barbearia/:id" element={<BarbershopDetail />} />
        <Route path="/agendamentos" element={<Appointments />} />
        <Route path="/perfil" element={<Profile />} />
        {/* Owner routes */}
        <Route path="/minha-loja" element={<OwnerHome />} />
        <Route path="/agendamentos-loja" element={<OwnerAppointments />} />
        <Route path="/servicos" element={<OwnerServices />} />
        <Route path="/galeria" element={<OwnerGallery />} />
        <Route path="/promocoes" element={<Promotions />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App