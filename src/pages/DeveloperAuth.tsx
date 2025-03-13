
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuitIcon, ShieldIcon, LockIcon, KeyIcon, CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

const DeveloperAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatedID, setGeneratedID] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
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

  // Generate a secure developer ID and key
  const generateCredentials = () => {
    // Generate a secure random ID (12 characters)
    const id = 'DEV_' + Array.from(window.crypto.getRandomValues(new Uint8Array(6)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Generate a secure random key (32 characters)
    const key = 'RAP_' + Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    setGeneratedID(id);
    setGeneratedKey(key);
    
    // Store in local storage for this browser session
    localStorage.setItem('devID', id);
    localStorage.setItem('devKey', key);
    
    toast.success('New developer credentials generated');
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${type} copied to clipboard`);
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard');
      });
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
        {!showGenerator ? (
          <>
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
                className="text-white/70 hover:text-white hover:bg-white/10 mx-2"
                onClick={() => navigate('/')}
              >
                Return to Main Interface
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/70 hover:text-white hover:bg-white/10 mx-2"
                onClick={() => setShowGenerator(true)}
              >
                <KeyIcon className="h-4 w-4 mr-2" />
                Generate New Credentials
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              <KeyIcon className="w-8 h-8 text-neon-green mr-3" />
              <h1 className={cn(typography.h2, "text-glow")}>
                CREDENTIAL GENERATOR
              </h1>
            </div>
            
            <div className="w-32 h-1 bg-neon-green mx-auto my-6 shadow-neon"></div>
            
            <p className={cn(typography.bodyLarge, "mb-8 text-white/90")}>
              Generate secure developer credentials for accessing the creation tools.
            </p>
            
            <Button
              onClick={generateCredentials}
              className="neon-button-green w-full text-lg py-6 group mb-8"
            >
              <span className="flex items-center justify-center">
                Generate New Credentials
                <ShieldIcon className="ml-2 h-4 w-4" />
              </span>
            </Button>
            
            {generatedID && generatedKey && (
              <div className="space-y-6 mt-8">
                <div className="bg-black/50 border border-neon-green/30 rounded-md p-4 relative">
                  <h3 className={cn(typography.h3, "text-neon-green mb-2")}>Developer ID</h3>
                  <div className="flex items-center">
                    <code className="bg-black/80 rounded py-1 px-3 text-white/90 font-mono w-full overflow-x-auto">
                      {generatedID}
                    </code>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="ml-2 text-neon-green"
                      onClick={() => copyToClipboard(generatedID, "Developer ID")}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-black/50 border border-neon-green/30 rounded-md p-4 relative">
                  <h3 className={cn(typography.h3, "text-neon-green mb-2")}>Access Key</h3>
                  <div className="flex items-center">
                    <code className="bg-black/80 rounded py-1 px-3 text-white/90 font-mono w-full overflow-x-auto">
                      {generatedKey}
                    </code>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="ml-2 text-neon-green"
                      onClick={() => copyToClipboard(generatedKey, "Access Key")}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-red-950/30 border border-red-500/30 rounded-md p-4 mt-6">
                  <p className={cn(typography.bodySmall, "text-red-400")}>
                    <span className="font-bold">IMPORTANT:</span> Store these credentials securely. They will only be shown once and grant full access to the game creation tools.
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-4 border-t border-white/10">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setShowGenerator(false)}
              >
                Back to Login
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeveloperAuth;
