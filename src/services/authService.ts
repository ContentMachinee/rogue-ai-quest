
import { customQuery, supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Interface for user signup
export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: string;
}

// Interface for user login
export interface LoginData {
  email: string;
  password: string;
}

// Interface for email subscription
export interface EmailSubscriptionData {
  name: string;
  email: string;
}

/**
 * Handles user signup with Supabase
 */
export const signupUser = async (data: SignupData): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: data.role
        }
      }
    });

    if (error) {
      toast.error(error.message);
      console.error("Signup error:", error);
      return false;
    }

    // Create profile entry in users table (if needed)
    // Using full_name instead of name to match the profiles table schema
    await supabase.from("profiles").upsert({
      id: (await supabase.auth.getUser()).data.user?.id,
      full_name: data.name,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      created_at: new Date().toISOString()
    });

    toast.success("ID Deployed—Grid Engineer Activated!");
    return true;
  } catch (error) {
    console.error("Signup process error:", error);
    toast.error("Failed to deploy engineer ID. Please try again.");
    return false;
  }
};

/**
 * Handles user login with Supabase
 */
export const loginUser = async (data: LoginData): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });

    if (error) {
      toast.error(error.message);
      console.error("Login error:", error);
      return false;
    }

    toast.success("Terminal access granted! Initializing grid connection...");
    return true;
  } catch (error) {
    console.error("Login process error:", error);
    toast.error("Terminal access denied. Please check credentials and try again.");
    return false;
  }
};

/**
 * Handles email subscription
 */
export const subscribeEmail = async (data: EmailSubscriptionData): Promise<boolean> => {
  try {
    // Store email subscription using customQuery helper for tables not in types
    const { error } = await customQuery('email_subscriptions').insert({
      name: data.name,
      email: data.email,
      subscribed_at: new Date().toISOString()
    });

    if (error) {
      toast.error(error.message);
      console.error("Email subscription error:", error);
      return false;
    }

    toast.success("Clearance Transmitted—Grid Access Granted!", {
      duration: 3000,
    });
    return true;
  } catch (error) {
    console.error("Email subscription process error:", error);
    toast.error("Transmission failed. Please try again.");
    return false;
  }
};

/**
 * Logs out the current user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      console.error("Logout error:", error);
      return;
    }
    toast.info("Terminal disconnected. Grid access revoked.");
  } catch (error) {
    console.error("Logout process error:", error);
    toast.error("Failed to disconnect from terminal.");
  }
};

/**
 * Gets the current logged-in user
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Get user error:", error);
      return null;
    }
    return data.user;
  } catch (error) {
    console.error("Get user process error:", error);
    return null;
  }
};
