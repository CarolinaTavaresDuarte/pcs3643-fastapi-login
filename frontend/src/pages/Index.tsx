import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogIn, UserPlus, Shield } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';
import { useEffect, useState } from 'react';

const Index = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Laboratório de Software
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Carolina e Lays
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sistema completo de autenticação com React, FastAPI, Supabase e Python. 
            </p>
            
            {authenticated === null ? (
              <div className="flex justify-center">
                <div className="h-10 w-32 bg-muted animate-pulse rounded-md" />
              </div>
            ) : authenticated ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/perfil">
                    <User className="mr-2 h-5 w-5" />
                    Ver Perfil
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Entrar
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Criar Conta
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Segurança</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Autenticação JWT com tokens seguros e proteção de rotas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Gestão de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cadastro, login e gerenciamento completo de perfis de usuário.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <LogIn className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Interface Moderna</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                 Seguro, moderno e responsivo.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
