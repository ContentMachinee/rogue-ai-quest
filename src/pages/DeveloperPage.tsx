
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { toast } from 'sonner';
import { 
  BrainCircuitIcon, 
  Layout, 
  Code2Icon, 
  PuzzleIcon, 
  Settings2Icon,
  EyeIcon,
  PlayIcon,
  SaveIcon,
  LogOutIcon 
} from 'lucide-react';
import ComponentLibrary from '@/components/developer/ComponentLibrary';
import CanvasArea from '@/components/developer/CanvasArea';
import PropertiesPanel from '@/components/developer/PropertiesPanel';
import PreviewPanel from '@/components/developer/PreviewPanel';

const DeveloperPage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [canvasItems, setCanvasItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'components' | 'functions'>('components');

  useEffect(() => {
    // Check if the developer is authenticated
    const devAuth = localStorage.getItem('devAuth');
    if (devAuth !== 'true') {
      toast.error('Developer authentication required');
      navigate('/developer');
      return;
    }
    
    setIsAuthorized(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('devAuth');
    toast.info('Logged out from developer mode');
    navigate('/developer');
  };

  const handleSave = () => {
    toast.success('Changes saved successfully');
    // In a real implementation, this would save to Supabase
  };

  const handleComponentDrop = (item: any, position: { x: number, y: number }) => {
    setCanvasItems([
      ...canvasItems,
      {
        ...item,
        id: `${item.type}-${Date.now()}`,
        position
      }
    ]);
    toast.info(`Added ${item.name} to canvas`);
  };

  const handleSelectComponent = (component: any) => {
    setSelectedComponent(component);
  };

  const handleUpdateComponent = (id: string, updates: any) => {
    setCanvasItems(
      canvasItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  if (!isAuthorized) {
    return null; // Don't render anything while checking auth
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex flex-col bg-black">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
            <div className="flex items-center">
              <BrainCircuitIcon className="text-neon-purple h-6 w-6 mr-2" />
              <h1 className={cn(typography.h3, "text-white")}>ROGUE AI PROTOCOL: DEVELOPER MODE</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent border-purple-500/30 text-purple-400 hover:bg-purple-950/30"
                onClick={handleSave}
              >
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent border-blue-500/30 text-blue-400 hover:bg-blue-950/30"
                onClick={() => navigate('/game')}
              >
                <PlayIcon className="h-4 w-4 mr-2" />
                Test Game
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white/70 hover:text-white"
                onClick={handleLogout}
              >
                <LogOutIcon className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main workspace */}
        <div className="flex-grow flex">
          <ResizablePanelGroup direction="horizontal">
            {/* Left panel: Component & function libraries */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <div className="h-full flex flex-col bg-gray-900/50 border-r border-white/10">
                <div className="border-b border-white/10 p-2">
                  <div className="flex">
                    <Button
                      variant={activeTab === 'components' ? 'default' : 'ghost'}
                      className={cn(
                        "flex-1 justify-start",
                        activeTab === 'components' ? "bg-purple-950/50" : "hover:bg-gray-800"
                      )}
                      onClick={() => setActiveTab('components')}
                    >
                      <PuzzleIcon className="h-4 w-4 mr-2" />
                      Components
                    </Button>
                    <Button
                      variant={activeTab === 'functions' ? 'default' : 'ghost'}
                      className={cn(
                        "flex-1 justify-start",
                        activeTab === 'functions' ? "bg-blue-950/50" : "hover:bg-gray-800"
                      )}
                      onClick={() => setActiveTab('functions')}
                    >
                      <Code2Icon className="h-4 w-4 mr-2" />
                      Functions
                    </Button>
                  </div>
                </div>
                
                <div className="flex-grow overflow-y-auto p-4">
                  <ComponentLibrary activeTab={activeTab} />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Middle panel: Canvas */}
            <ResizablePanel defaultSize={50}>
              <div className="h-full flex flex-col">
                <div className="p-2 border-b border-white/10 flex items-center bg-gray-900/50">
                  <h3 className={cn(typography.h4, "text-white/80")}>Canvas</h3>
                </div>
                <div className="flex-grow overflow-hidden">
                  <CanvasArea 
                    items={canvasItems}
                    onDrop={handleComponentDrop}
                    onSelectComponent={handleSelectComponent}
                  />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Right panel: Properties & Preview */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={60}>
                  <div className="h-full flex flex-col bg-gray-900/50 border-l border-white/10">
                    <div className="p-2 border-b border-white/10 flex items-center">
                      <Settings2Icon className="h-4 w-4 mr-2 text-white/80" />
                      <h3 className={cn(typography.h4, "text-white/80")}>Properties</h3>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4">
                      <PropertiesPanel 
                        selectedComponent={selectedComponent}
                        onUpdateComponent={handleUpdateComponent}
                      />
                    </div>
                  </div>
                </ResizablePanel>
                
                <ResizableHandle />
                
                <ResizablePanel defaultSize={40}>
                  <div className="h-full flex flex-col bg-gray-900/50 border-l border-t border-white/10">
                    <div className="p-2 border-b border-white/10 flex items-center">
                      <EyeIcon className="h-4 w-4 mr-2 text-white/80" />
                      <h3 className={cn(typography.h4, "text-white/80")}>Preview</h3>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4">
                      <PreviewPanel 
                        selectedComponent={selectedComponent}
                        canvasItems={canvasItems}
                      />
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </DndProvider>
  );
};

export default DeveloperPage;
