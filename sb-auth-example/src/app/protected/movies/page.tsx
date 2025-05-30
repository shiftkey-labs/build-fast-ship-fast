import { getMovies, addMovie, deleteMovie } from './action'
import { revalidatePath } from 'next/cache'
import { Suspense } from 'react'

// Movie Type
type Movie = {
  id: number
  title: string
  director: string
  release_year: number
  genre: string
}

// Movie Table Component
function MovieTable({ movies }: { movies: Movie[] }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Director</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movies.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movie.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.director}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.release_year}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.genre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <form action={async () => {
                  'use server'
                  await deleteMovie(movie.id)
                  revalidatePath('/protected/movies')
                }}>
                  <button 
                    type="submit"
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Add Movie Form Component
function AddMovieForm() {
  async function handleAddMovie(formData: FormData) {
    'use server'
    await addMovie(formData)
    revalidatePath('/protected/movies')
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Movie</h2>
      <form action={handleAddMovie} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="director" className="block text-sm font-medium text-gray-700">Director</label>
          <input
            type="text"
            id="director"
            name="director"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="release_year" className="block text-sm font-medium text-gray-700">Release Year</label>
          <input
            type="number"
            id="release_year"
            name="release_year"
            min="1900"
            max="2099"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  )
}

// Movies Container that fetches data
async function MoviesContainer() {
  const movies = await getMovies()
  
  return (
    <>
      <MovieTable movies={movies} />
      <AddMovieForm />
    </>
  )
}

// Main Page Component
export default function MoviesPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading movies...</div>}>
        <MoviesContainer />
      </Suspense>
    </div>
  )
}
