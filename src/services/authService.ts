
import { supabase, customQuery } from '@/integrations/supabase/client';

/**
 * Subscribe user email to newsletter
 */
export async function subscribeEmail(email: string, name: string) {
  try {
    const { data, error } = await customQuery('email_subscriptions')
      .insert([{ name, email }])
      .select();
      
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Error subscribing email:', error);
    return { 
      success: false, 
      error: error.message,
      // Check for duplicate email error
      isDuplicate: error.code === '23505'
    };
  }
}

/**
 * Check if email is already subscribed
 */
export async function checkEmailSubscribed(email: string) {
  try {
    const { data, error } = await customQuery('email_subscriptions')
      .select('*')
      .eq('email', email)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw error;
    }
    
    return { 
      success: true, 
      isSubscribed: !!data
    };
  } catch (error) {
    console.error('Error checking email subscription:', error);
    return { success: false };
  }
}

/**
 * Get all email subscriptions
 */
export async function getEmailSubscriptions() {
  try {
    const { data, error } = await customQuery('email_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false });
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error getting email subscriptions:', error);
    return { success: false };
  }
}
