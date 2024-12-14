'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function logout() {
    const supabase = await createClient();  // Ensure this is awaited

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);  // Log the error for debugging
        redirect('/error');
    } else {
        revalidatePath('/', 'layout');
        redirect('/');
    }
}