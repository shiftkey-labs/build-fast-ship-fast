'use server'

import { createClient } from '@/lib/supabase/server'

export async function getMovies() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('id')
  
  if (error) {
    console.error('Error fetching movies:', error)
    throw new Error('Failed to fetch movies')
  }
  
  return data
}

export async function addMovie(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const director = formData.get('director') as string
  const releaseYear = parseInt(formData.get('release_year') as string)
  const genre = formData.get('genre') as string
  
  const { error } = await supabase
    .from('movies')
    .insert([{ 
      title, 
      director, 
      release_year: releaseYear, 
      genre 
    }])
  
  if (error) {
    console.error('Error adding movie:', error)
    throw new Error('Failed to add movie')
  }
}

export async function deleteMovie(id: number) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting movie:', error)
    throw new Error('Failed to delete movie')
  }
}
