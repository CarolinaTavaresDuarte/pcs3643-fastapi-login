import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api } from '@/lib/api';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const HealthCheck = () => {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const checkApi = async () => {
      try {
        await api.healthCheck();
        setApiStatus('online');
      } catch (error) {
        console.error('API health check failed:', error);
        setApiStatus('offline');
      }
    };

    checkApi();

    const interval = setInterval(() => {
      if (apiStatus === 'offline') {
        checkApi();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [apiStatus]);

  if (apiStatus === 'checking' || apiStatus === 'online') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Alert variant="destructive" className="rounded-none border-x-0">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>API indisponível:</strong> Não foi possível conectar com o servidor. 
          Verifique se o backend está rodando em {import.meta.env.VITE_API_URL || 'http://localhost:8000'}.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default HealthCheck;