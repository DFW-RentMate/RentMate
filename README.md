# RentMate

RentMate is a full-stack room rental and roommate matching web application designed for the DFW Korean community. It combines rental listing discovery, interactive map browsing, roommate profile search, authentication, and personalized favorites in one platform.

## Features

### Rental Listings

- Browse available room rental listings
- Search and filter listings by:
  - City
  - Minimum and maximum price
  - Room type
  - Gender preference
  - Parking availability
  - Furnished status
  - Move-in date
- View listing photos, rent prices, room types, locations, and descriptions
- Open detailed listing pages
- Save and remove favorite listings

### Interactive Map Search

- Explore rental listings on an interactive map using React Leaflet
- Display custom price markers based on listing coordinates
- Synchronize listing cards and map markers through hover and selection states
- Automatically scroll to the corresponding listing when a map marker is selected
- Preview listing information directly from map popups

### Roommate Discovery

- Create and manage roommate profiles
- Browse active roommate profiles
- Search roommates by:
  - Desired city
  - Budget range
  - Gender
- Match profiles using overlapping budget ranges and user preferences
- Display profile information such as occupation, budget, location, introduction, and profile photo
- Save roommate profiles as favorites

### Authentication & Personalized Data

- User authentication with NextAuth
- Google OAuth support
- Kakao OAuth support
- Server-side session validation for protected actions
- User-specific rental and roommate favorites
- Login modal for protected client-side actions

### Favorites

- Persistent rental favorites stored in PostgreSQL
- Persistent roommate favorites
- Optimistic UI updates for roommate favorites
- Automatic rollback when a favorite request fails
- Database-level unique constraints to prevent duplicate favorites

### Image Uploads

- Upload listing and profile images
- Store uploaded images using Supabase Storage

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Leaflet
- Leaflet
- Zustand
- Framer Motion
- shadcn
- Base UI
- Lucide React
- React Icons
- React Datepicker
- rc-slider

### Backend

- Next.js App Router
- Next.js Route Handlers / API Routes
- Next.js Server Actions
- NextAuth
- Prisma ORM
- Prisma PostgreSQL Adapter

### Database & Storage

- PostgreSQL
- Supabase
- Supabase Storage
- Prisma

### Deployment & Development

- Vercel
- GitHub
- ESLint

---

## Architecture

```text
Client
  |
  |-- Next.js / React UI
  |     |-- Rental Search
  |     |-- Interactive Map
  |     |-- Roommate Search
  |     |-- Favorites
  |
  |-- Next.js Server Actions / API Routes
          |
          |-- NextAuth Authentication
          |
          |-- Prisma ORM
                  |
                  |-- PostgreSQL
                  |
                  |-- Supabase Storage
```

---

## How It Works

### Rental Search

Rental search conditions are stored in URL search parameters and passed to the server.

```text
URL Search Parameters
        |
        v
Next.js Server Component
        |
        v
Prisma Query
        |
        v
PostgreSQL
        |
        v
Filtered Listings
        |
        +------> Listing Cards
        |
        +------> Interactive Map
```

Filtering is performed using Prisma queries for criteria such as city, price range, room type, gender preference, parking, furnished status, and move-in availability.

### Map and Listing Synchronization

The rental listing page shares the selected listing state between the list and map.

- Hovering over a listing highlights its map marker
- Hovering over a marker highlights its listing card
- Clicking a marker scrolls the listing panel to the corresponding rental
- Custom Leaflet markers display rental prices directly on the map

### Roommate Search

Roommate profiles combine data from the user and roommate profile tables.

Users can filter roommate profiles by city, gender, and budget range. Budget matching checks whether the selected budget range overlaps with each roommate profile's preferred range.

### Favorites

Rental favorites use Next.js Server Actions with server-side session validation.

```text
Favorite Click
    |
    v
Server Action
    |
    v
NextAuth Session
    |
    v
Prisma
    |
    v
PostgreSQL
```

Roommate favorites use API routes with POST and DELETE requests. The UI updates immediately using optimistic updates and rolls back if the server request fails.

---

## Database Design

Main models include:

- `users`
- `listings`
- `listing_photos`
- `favorites`
- `roommate_profiles`
- `roommate_favorites`

The database uses relational constraints and composite unique keys to prevent duplicate favorites for the same user and target listing/profile.

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL / Supabase project

### 1. Clone the Repository

```bash
git clone https://github.com/DFW-RentMate/RentMate.git
cd RentMate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=
DIRECT_URL=

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Do not commit `.env` files or secret credentials to GitHub.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Build

Create a production build with:

```bash
npm run build
```

The build process generates the Prisma Client before running the Next.js production build.

---

## Project Structure

```text
RentMate/
├── app/
│   ├── actions/
│   ├── api/
│   ├── components/
│   ├── favorites/
│   ├── listings/
│   │   ├── [id]/
│   │   ├── conditions/
│   │   ├── lists/
│   │   ├── map/
│   │   └── new/
│   ├── mylists/
│   ├── mypage/
│   ├── roommates/
│   │   ├── [id]/
│   │   ├── components/
│   │   ├── conditions/
│   │   ├── lists/
│   │   └── new/
│   └── types/
├── hooks/
├── lib/
├── prisma/
├── public/
├── package.json
└── README.md
```

---

## Screenshots

Add screenshots here after deployment.

```md
![Home Page]<img width="1708" height="975" alt="Screenshot 2026-09-04 at 10 02 51 PM" src="https://github.com/user-attachments/assets/506b0adc-c5ba-4cbc-a760-2f93f393df8d" />
![Login Page]<img width="1700" height="951" alt="Screenshot 2026-09-04 at 10 04 08 PM" src="https://github.com/user-attachments/assets/bc742813-07ae-4dd4-99b2-e34c5f973dff" />
![Rental Listings and Map Search]<img width="1708" height="954" alt="Screenshot 2026-09-04 at 10 03 07 PM" src="https://github.com/user-attachments/assets/b233a88f-89a3-4de9-8ec6-72abf221ae30" />
![Rental Detail]<img width="1700" height="1037" alt="Screenshot 2026-09-04 at 10 03 26 PM" src="https://github.com/user-attachments/assets/f0739ea1-5128-49f3-8bce-a2ab08093476" />
![Roommate Search]<img width="1694" height="1014" alt="Screenshot 2026-09-04 at 10 03 41 PM" src="https://github.com/user-attachments/assets/2503a68a-9918-46ae-9ee4-03478fc3a7fc" />
![Registering Rental]<img width="1692" height="1063" alt="Screenshot 2026-09-04 at 10 04 30 PM" src="https://github.com/user-attachments/assets/605a104f-b10d-4804-a74d-9beb42dc658b" />
![Registering Roommate Profile]<img width="1702" height="1043" alt="Screenshot 2026-09-04 at 10 06 09 PM" src="https://github.com/user-attachments/assets/a1bbe698-90b7-4d6e-bd8c-6f64a901c568" />



```

---

## Team Project

RentMate was developed as a team project during summer break. The project focuses on building a practical full-stack platform for rental discovery and roommate matching while applying modern web development technologies such as Next.js, Prisma, PostgreSQL, authentication, cloud storage, and interactive maps.

---

## License

This project is licensed under the MIT License.
