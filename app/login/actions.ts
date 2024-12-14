'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();  // Ensure this is awaited

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    if (error.code === 'email_not_confirmed') {
      // Handle the specific case when the email is not confirmed
      console.log('Please confirm your email address before signing in.');
    } else {
      console.log(error);
    }
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();  // Ensure this is awaited

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.log(error);
    redirect('/error');
  } else {
    console.log('Signup successful. Please check your email to confirm your address.');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
