import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserOut } from '@/lib/api';
import { getCurrentUser, isAuthenticated, logout } from '@/lib/auth';
import { User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState<UserOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated()) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Erro ao carregar usuário:', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const isCurrentPath = (path: string) => location.pathname === path;

  const NavLink = ({ to, children, onClick }: { to?: string; children: React.ReactNode; onClick?: () => void }) => {
    const baseClasses = "text-sm font-medium transition-colors hover:text-primary";
    const activeClasses = "text-primary";
    const inactiveClasses = "text-muted-foreground";
    
    if (onClick) {
      return (
        <button
          onClick={onClick}
          className={`${baseClasses} ${inactiveClasses}`}
        >
          {children}
        </button>
      );
    }

    return (
      <Link
        to={to!}
        className={`${baseClasses} ${
          isCurrentPath(to!) ? activeClasses : inactiveClasses
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">PCS-3643</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {loading ? (
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            ) : user ? (
              <>
                <NavLink to="/perfil">Perfil</NavLink>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">
                    Olá, <span className="font-medium text-foreground">{user.name}</span>
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login">Entrar</NavLink>
                <Button asChild>
                  <Link to="/register">Criar Conta</Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-3">
              {loading ? (
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              ) : user ? (
                <>
                  <div className="pb-2 border-b">
                    <span className="text-sm text-muted-foreground">
                      Olá, <span className="font-medium text-foreground">{user.name}</span>
                    </span>
                  </div>
                  <NavLink to="/perfil">Perfil</NavLink>
                  <NavLink onClick={handleLogout}>Sair</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login">Entrar</NavLink>
                  <NavLink to="/register">Criar Conta</NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;