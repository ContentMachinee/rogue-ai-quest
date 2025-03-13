
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { 
  FileTextIcon, 
  TerminalIcon, 
  BrainCircuitIcon,

  SplitIcon,
  BarChart4Icon,
  BadgeIcon
} from 'lucide-react';

// Canvas component for dropping dragged items
const CanvasArea = ({ 
  items, 
  onDrop, 
  onSelectComponent 
}: { 
  items: any[]; 
  onDrop: (item: any, position: { x: number, y: number }) => void;
  onSelectComponent: (component: any) => void;
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Set up drop target
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: any, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const containerRect = document.getElementById('canvas-container')?.getBoundingClientRect();
      
      if (offset && containerRect) {
        // Calculate position relative to the container
        const x = offset.x - containerRect.left;
        const y = offset.y - containerRect.top;
        onDrop(item, { x, y });
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  // Get icon for component type
  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'scenario': return <FileTextIcon className="h-4 w-4" />;
      case 'question': 
        if (item.template?.question_type === 'coding_challenge') {
          return <TerminalIcon className="h-4 w-4" />;
        } else if (item.template?.question_type === 'ai_ml_task') {
          return <BrainCircuitIcon className="h-4 w-4" />;
        } else {
          return <SplitIcon className="h-4 w-4" />;
        }
      case 'ui':
        if (item.template?.type === 'radar-chart') {
          return <BarChart4Icon className="h-4 w-4" />;
        } else {
          return <BadgeIcon className="h-4 w-4" />;
        }
      default: return <FileTextIcon className="h-4 w-4" />;
    }
  };

  // Handle component click to select
  const handleComponentClick = (component: any) => {
    setSelectedId(component.id);
    onSelectComponent(component);
  };

  return (
    <div 
      ref={drop}
      id="canvas-container"
      className={cn(
        "relative w-full h-full",
        "bg-gray-950 bg-dot-white/[0.2]",
        isOver && canDrop ? "bg-purple-950/20" : ""
      )}
    >
      {/* Canvas guide message */}
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-md">
            <p className={cn(typography.bodyLarge, "text-white/50 mb-2")}>
              Drag components from the library to this canvas
            </p>
            <p className={cn(typography.bodySmall, "text-white/30")}>
              Components can be arranged, configured, and connected to build your game experience
            </p>
          </div>
        </div>
      )}
      
      {/* Dropped components */}
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "absolute p-3 rounded-md border",
            "cursor-pointer transition-all",
            selectedId === item.id
              ? "border-purple-500 bg-purple-950/30 shadow-lg shadow-purple-500/20"
              : "border-white/10 bg-gray-900/70 hover:border-purple-500/50"
          )}
          style={{ 
            left: `${item.position.x}px`, 
            top: `${item.position.y}px`,
            minWidth: '200px'
          }}
          onClick={() => handleComponentClick(item)}
        >
          <div className="flex items-center">
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full mr-2",
              selectedId === item.id ? "bg-purple-950 text-purple-400" : "bg-gray-800 text-white/70"
            )}>
              {getComponentIcon(item.type)}
            </div>
            <div>
              <p className={cn(typography.bodySmall, "font-medium")}>{item.name}</p>
              <p className={cn(typography.caption, "text-white/60")}>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CanvasArea;
