# Build Fast - Next.js Application

A modern application built with Next.js 15, React 19, Supabase for authentication and database, and TailwindCSS for styling.

## Features

- User authentication with Supabase (login, registration, password reset)
- Protected routes requiring authentication
- Server-side rendering and components
- Server actions for data manipulation
- Movie catalog management system

## Getting Started
### Create Next.js app
```bash
pnpm dlx create-next-app@latest 
# or
npx create-next-app@latest
```
### Add UI Library and Auth
```bash
pnpm dlx shadcn@latest init
# or
npx shadcn@latest init
```

```bash
pnpm dlx shadcn@latest add https://supabase.com/ui/r/password-based-auth-nextjs.json
# or
npm shadcn@latest add https://supabase.com/ui/r/password-based-auth-nextjs.json
```

### Prerequisites

- Node.js 20+
- pnpm (preferred) or npm/yarn

#### Sample Database Populate
```sql
DROP TABLE IF EXISTS movies;

-- Create the movies table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY, -- Auto-incrementing unique ID
    title VARCHAR(255) NOT NULL, -- Movie title
    director VARCHAR(255), -- Movie director
    release_year INTEGER, -- Year of release
    genre VARCHAR(100) -- Movie genre
);

-- Insert some movies
INSERT INTO movies (title, director, release_year, genre) VALUES
('Inception', 'Christopher Nolan', 2010, 'Action, Adventure, Sci-Fi'),
('Parasite', 'Bong Joon Ho', 2019, 'Drama, Thriller'),
('Dune', 'Denis Villeneuve', 2021, 'Action, Adventure, Drama'),
('Spider-Man: Into the Spider-Verse', 'Bob Persichetti, Peter Ramsey, Rodney Rothman', 2018, 'Animation, Action, Adventure'),
('Avengers: Endgame', 'Anthony and Joe Russo', 2019, 'Action, Adventure, Sci-Fi');
```

### Database RLS
```sql
-- Enable RLS on the movies table
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to select, insert, update, and delete movies
CREATE POLICY "Users can view all movies" 
ON movies FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Users can insert movies" 
ON movies FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update movies" 
ON movies FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Users can delete movies" 
ON movies FOR DELETE 
TO authenticated
USING (true);
```


### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy the environment template:
   ```bash
   cp env.template .env.local
   ```
4. Update `.env.local` with your Supabase credentials
5. Run the development server:
   ```bash
   pnpm dev
   ```

## Project Structure

- `/src/app`: Main application pages using the App Router
- `/src/components`: Reusable components
- `/src/lib`: Utility libraries and Supabase configuration

## Next.js Server Components

This project leverages Next.js Server Components, a powerful feature that allows components to be rendered on the server. Here's how they're used in this project:

### How Server Components Work

Server Components render on the server and send HTML to the client, reducing the JavaScript bundle size. They can:

- Access the backend directly (databases, file systems)
- Keep sensitive data on the server, not exposing it to the client
- Improve initial page load and SEO

### Examples in This Project

1. **Protected Pages**: The `src/app/protected/page.tsx` is a server component that:
   - Accesses Supabase directly on the server
   - Verifies user authentication
   - Redirects unauthenticated users
   - Renders user-specific content

2. **Movie List Component**: The `MoviesContainer` in `src/app/protected/movies/page.tsx`:
   - Fetches data from the database on the server
   - Passes the data to client components
   - Supports Suspense for improved loading states

## Next.js Server Actions

Server Actions are async functions that run on the server, allowing forms and client components to perform server-side operations.

### How Server Actions Work

- Marked with `'use server'` directive
- Can be called from client components
- Enable direct data mutations without creating API endpoints
- Support progressive enhancement (forms work even without JavaScript)

### Examples in This Project

1. **Movie Management Actions** (`src/app/protected/movies/action.ts`):
   - `getMovies()`: Fetches movies from the database
   - `addMovie()`: Adds a new movie to the database
   - `deleteMovie()`: Removes a movie by ID

2. **Inline Server Actions**:
   The delete functionality in the movies page uses an inline server action:
   ```tsx
   <form action={async () => {
     'use server'
     await deleteMovie(movie.id)
     revalidatePath('/protected/movies')
   }}>
     <button type="submit">Delete</button>
   </form>
   ```

3. **Form Handling**:
   The add movie form demonstrates server actions with forms:
   ```tsx
   async function handleAddMovie(formData: FormData) {
     'use server'
     await addMovie(formData)
     revalidatePath('/protected/movies')
   }
   ```

## Authentication Flow

This project implements a complete authentication system using Supabase:

1. Middleware (`src/middleware.ts`) checks authentication on every request
2. Unauthenticated users are redirected to the login page
3. After successful login, users are redirected to protected routes
4. Client and server components work together to maintain auth state

## Development

- Use `pnpm dev` to start the development server with Turbopack
- Use `pnpm build` for production builds
- Use `pnpm lint` to run linting

## Technologies

- Next.js 15
- React 19
- Supabase (Authentication & Database)
- TailwindCSS 4
- TypeScript
