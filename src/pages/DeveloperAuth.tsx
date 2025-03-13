
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuitIcon, ShieldIcon, LockIcon } from 'lucide-react';
import { toast } from 'sonner';

const DeveloperAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // For demo purposes, we'll use a hardcoded credential
  // In a real app, this would connect to Supabase auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple credential check - would be replaced with proper auth
    if (username === 'admin' && password === 'devmode') {
      // Store auth in localStorage for persistence
      localStorage.setItem('devAuth', 'true');
      
      setTimeout(() => {
        setIsLoading(false);
        toast.success('Developer mode access granted');
        navigate('/developer/dashboard');
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast.error('Invalid developer credentials');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen starry-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
        <div className="absolute top-3/4 left-2/3 w-3 h-3 rounded-full bg-neon-purple animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-neon-green animate-pulse delay-700"></div>
        
        {/* Data streams */}
        <div className="absolute h-full w-px left-1/3 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent"></div>
        <div className="absolute h-full w-px left-2/3 bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent"></div>
        
        {/* Circuit pattern effect */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      </div>
      
      {/* Main content */}
      <div className="glass-panel p-8 w-full max-w-md text-center z-10">
        <div className="flex items-center justify-center mb-4">
          <LockIcon className="w-8 h-8 text-neon-purple mr-3" />
          <h1 className={cn(typography.h2, "text-glow")}>
            DEVELOPER ACCESS
          </h1>
        </div>
        
        <div className="w-32 h-1 bg-neon-purple mx-auto my-6 shadow-neon"></div>
        
        <p className={cn(typography.bodyLarge, "mb-8 text-white/90")}>
          Enter developer credentials to access the game creation tools.
        </p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Developer ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-secondary/30 border-white/10 focus:border-neon-purple/50"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary/30 border-white/10 focus:border-neon-purple/50"
              required
            />
          </div>
          
          <Button 
            type="submit"
            disabled={isLoading}
            className="neon-button-purple w-full text-lg py-6 group"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Access Developer Mode
                <ShieldIcon className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
        
        <div className="mt-8 pt-4 border-t border-white/10">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            Return to Main Interface
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperAuth;
