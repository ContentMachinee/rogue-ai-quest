
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon } from 'lucide-react';

const PropertiesPanel = ({ 
  selectedComponent,
  onUpdateComponent
}: { 
  selectedComponent: any;
  onUpdateComponent: (id: string, updates: any) => void;
}) => {
  const [localState, setLocalState] = useState<any>(null);
  
  // Update local state when selected component changes
  useEffect(() => {
    setLocalState(selectedComponent);
  }, [selectedComponent]);
  
  if (!selectedComponent || !localState) {
    return (
      <div className="flex items-center justify-center h-full text-center p-6">
        <div>
          <p className={cn(typography.bodyLarge, "text-white/50 mb-2")}>
            No component selected
          </p>
          <p className={cn(typography.bodySmall, "text-white/30")}>
            Select a component on the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (key: string, value: any) => {
    setLocalState({
      ...localState,
      [key]: value
    });
    
    onUpdateComponent(selectedComponent.id, {
      [key]: value
    });
  };

  const handleTemplateChange = (key: string, value: any) => {
    const updatedTemplate = {
      ...localState.template,
      [key]: value
    };
    
    setLocalState({
      ...localState,
      template: updatedTemplate
    });
    
    onUpdateComponent(selectedComponent.id, {
      template: updatedTemplate
    });
  };

  const handleOptionsChange = (index: number, field: string, value: any) => {
    if (!localState.template?.options) return;
    
    const updatedOptions = [...localState.template.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value
    };
    
    const updatedTemplate = {
      ...localState.template,
      options: updatedOptions
    };
    
    setLocalState({
      ...localState,
      template: updatedTemplate
    });
    
    onUpdateComponent(selectedComponent.id, {
      template: updatedTemplate
    });
  };

  const addOption = () => {
    if (!localState.template) return;
    
    const newOption = {
      id: `option_${Date.now()}`,
      text: 'New Option',
      traits: {}
    };
    
    const updatedOptions = localState.template.options 
      ? [...localState.template.options, newOption]
      : [newOption];
    
    const updatedTemplate = {
      ...localState.template,
      options: updatedOptions
    };
    
    setLocalState({
      ...localState,
      template: updatedTemplate
    });
    
    onUpdateComponent(selectedComponent.id, {
      template: updatedTemplate
    });
  };

  const removeOption = (index: number) => {
    if (!localState.template?.options) return;
    
    const updatedOptions = [...localState.template.options];
    updatedOptions.splice(index, 1);
    
    const updatedTemplate = {
      ...localState.template,
      options: updatedOptions
    };
    
    setLocalState({
      ...localState,
      template: updatedTemplate
    });
    
    onUpdateComponent(selectedComponent.id, {
      template: updatedTemplate
    });
  };

  // Render different properties based on component type
  return (
    <div className="space-y-5">
      <div>
        <h3 className={cn(typography.h4, "text-white/90 mb-3")}>
          {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Properties
        </h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={localState.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="bg-gray-800/50 border-white/10"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={localState.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="bg-gray-800/50 border-white/10"
            rows={2}
          />
        </div>
        
        {/* Scenario template specific properties */}
        {selectedComponent.type === 'scenario' && localState.template && (
          <>
            <div>
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input
                id="scenario-name"
                value={localState.template.name || ''}
                onChange={(e) => handleTemplateChange('name', e.target.value)}
                className="bg-gray-800/50 border-white/10"
              />
            </div>
            
            <div>
              <Label htmlFor="scenario-description">Scenario Description</Label>
              <Textarea
                id="scenario-description"
                value={localState.template.description || ''}
                onChange={(e) => handleTemplateChange('description', e.target.value)}
                className="bg-gray-800/50 border-white/10"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="scenario-phase">Game Phase</Label>
              <Select 
                value={localState.template.phase} 
                onValueChange={(value) => handleTemplateChange('phase', value)}
              >
                <SelectTrigger className="bg-gray-800/50 border-white/10">
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infiltration">Infiltration</SelectItem>
                  <SelectItem value="systems">Systems Recovery</SelectItem>
                  <SelectItem value="ethical">Ethical Dilemmas</SelectItem>
                  <SelectItem value="counter">Counteroffensive</SelectItem>
                  <SelectItem value="final">Final Assault</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {/* Question specific properties */}
        {selectedComponent.type === 'question' && localState.template && (
          <>
            <div>
              <Label htmlFor="question-text">Question Text</Label>
              <Textarea
                id="question-text"
                value={localState.template.question_text || ''}
                onChange={(e) => handleTemplateChange('question_text', e.target.value)}
                className="bg-gray-800/50 border-white/10"
                rows={3}
              />
            </div>
            
            {localState.template.question_type === 'coding_challenge' && (
              <>
                <div>
                  <Label htmlFor="code-template">Code Template</Label>
                  <Textarea
                    id="code-template"
                    value={localState.template.code_template || ''}
                    onChange={(e) => handleTemplateChange('code_template', e.target.value)}
                    className="bg-gray-800/50 border-white/10 font-mono text-sm"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="expected-output">Expected Output</Label>
                  <Input
                    id="expected-output"
                    value={localState.template.expected_output || ''}
                    onChange={(e) => handleTemplateChange('expected_output', e.target.value)}
                    className="bg-gray-800/50 border-white/10"
                  />
                </div>
              </>
            )}
            
            {localState.template.options && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center h-7 px-2 text-xs bg-purple-950/30 border-purple-500/30 text-purple-400 hover:bg-purple-950/50"
                    onClick={addOption}
                  >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Add Option
                  </Button>
                </div>
                
                {localState.template.options.map((option: any, index: number) => (
                  <div key={option.id} className="space-y-2 p-3 rounded border border-white/10 bg-gray-800/30">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`option-${index}-text`} className="text-xs">Option {index + 1}</Label>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-400 hover:bg-red-950/20"
                        onClick={() => removeOption(index)}
                      >
                        <TrashIcon className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Input
                      id={`option-${index}-text`}
                      value={option.text || ''}
                      onChange={(e) => handleOptionsChange(index, 'text', e.target.value)}
                      className="bg-gray-800/50 border-white/10"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`option-${index}-trait`} className="text-xs">Primary Trait</Label>
                        <Select 
                          value={Object.keys(option.traits || {})[0] || ''} 
                          onValueChange={(value) => {
                            const newTraits = { [value]: 2 };
                            handleOptionsChange(index, 'traits', newTraits);
                          }}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-white/10 h-8 text-xs">
                            <SelectValue placeholder="Select trait" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="codingProficiency">Coding Proficiency</SelectItem>
                            <SelectItem value="problemSolving">Problem Solving</SelectItem>
                            <SelectItem value="analytical">Analytical</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="integrity">Integrity</SelectItem>
                            <SelectItem value="adaptability">Adaptability</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`option-${index}-value`} className="text-xs">Value</Label>
                        <Select 
                          value={Object.values(option.traits || {})[0]?.toString() || '2'} 
                          onValueChange={(value) => {
                            const trait = Object.keys(option.traits || {})[0] || 'analytical';
                            const newTraits = { [trait]: parseInt(value) };
                            handleOptionsChange(index, 'traits', newTraits);
                          }}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-white/10 h-8 text-xs">
                            <SelectValue placeholder="Select value" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {/* UI component specific properties */}
        {selectedComponent.type === 'ui' && localState.template && (
          <>
            <div>
              <Label htmlFor="component-title">Title</Label>
              <Input
                id="component-title"
                value={localState.template.title || ''}
                onChange={(e) => handleTemplateChange('title', e.target.value)}
                className="bg-gray-800/50 border-white/10"
              />
            </div>
            
            {localState.template.type === 'radar-chart' && (
              <div>
                <Label htmlFor="chart-datapoints">Data Points</Label>
                <Input
                  id="chart-datapoints"
                  value={localState.template.dataPoints?.join(', ') || ''}
                  onChange={(e) => handleTemplateChange('dataPoints', e.target.value.split(', '))}
                  className="bg-gray-800/50 border-white/10"
                />
                <p className={cn(typography.caption, "text-white/50 mt-1")}>
                  Comma-separated list of metrics to display
                </p>
              </div>
            )}
            
            {localState.template.type === 'badge' && (
              <>
                <div>
                  <Label htmlFor="badge-description">Badge Description</Label>
                  <Textarea
                    id="badge-description"
                    value={localState.template.description || ''}
                    onChange={(e) => handleTemplateChange('description', e.target.value)}
                    className="bg-gray-800/50 border-white/10"
                    rows={2}
                  />
                </div>
                
                <div>
                  <Label htmlFor="badge-icon">Badge Icon</Label>
                  <Select 
                    value={localState.template.icon || 'trophy'} 
                    onValueChange={(value) => handleTemplateChange('icon', value)}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-white/10">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trophy">Trophy</SelectItem>
                      <SelectItem value="star">Star</SelectItem>
                      <SelectItem value="medal">Medal</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
