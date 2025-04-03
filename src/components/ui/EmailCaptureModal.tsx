
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CircleXIcon, LoaderIcon, UserCircle2Icon, MailIcon, ShieldIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { 
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
});

type EmailCaptureFormValues = z.infer<typeof formSchema>;

interface EmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

const EmailCaptureModal = ({ open, onOpenChange, onComplete }: EmailCaptureModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeScanEffect, setCodeScanEffect] = useState(false);

  // Initialize form
  const form = useForm<EmailCaptureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: EmailCaptureFormValues) => {
    try {
      setIsSubmitting(true);
      setCodeScanEffect(true);
      
      // Insert data into email_subscriptions table
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ 
          name: data.name,
          email: data.email 
        }]);

      if (error) throw error;
      
      // Simulate processing for visual effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Neural Interface registration complete!");
      
      // Call onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
      
      // Close modal
      onOpenChange(false);
      
    } catch (error: any) {
      console.error("Subscription error:", error);
      
      // Check for duplicate email error
      if (error.code === "23505") {
        toast.error("Neural signature already exists in database.");
      } else {
        toast.error("Registration failed. System error detected.");
      }
    } finally {
      setIsSubmitting(false);
      setCodeScanEffect(false);
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-neon-blue/50 bg-space/95 backdrop-blur-md p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-space via-neon-blue/20 to-space p-4 border-b border-neon-blue/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShieldIcon className="w-5 h-5 text-neon-blue mr-2" />
              <h2 className={cn(typography.h3, "text-neon-blue")}>NEURAL INTERFACE REGISTRATION</h2>
            </div>
            <button 
              onClick={() => onOpenChange(false)}
              className="text-white/70 hover:text-white"
            >
              <CircleXIcon className="w-5 h-5" />
            </button>
          </div>
          <p className={cn(typography.bodySmall, "text-white/70 mt-1")}>
            Security clearance required for Nebula City access
          </p>
        </div>

        {/* Form content */}
        <div className="p-6 relative">
          {/* Data scan effect */}
          {codeScanEffect && (
            <div className="absolute inset-0 bg-gradient-scan opacity-30 pointer-events-none animate-scanning"></div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center">
                      <UserCircle2Icon className="w-4 h-4 mr-2 text-neon-blue" />
                      Neural Interface Specialist
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        className="bg-space border-neon-blue/30 focus:border-neon-blue text-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-neon-red" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 flex items-center">
                      <MailIcon className="w-4 h-4 mr-2 text-neon-blue" />
                      Quantum Communication Channel
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        className="bg-space border-neon-blue/30 focus:border-neon-blue text-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-neon-red" />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full neon-button relative group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Initialize Neural Interface</span>
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  )}
                </Button>
              </div>
              
              <p className={cn(typography.caption, "text-white/50 text-center")}>
                All data protected by Nebula City encryption protocols
              </p>
            </form>
          </Form>
          
          {/* Circuit lines decoration */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-neon-blue/30 -ml-1 -mt-1 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-neon-blue/30 -mr-1 -mb-1 pointer-events-none"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCaptureModal;
