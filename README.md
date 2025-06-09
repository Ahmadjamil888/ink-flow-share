
# The Daily Herald - Blog Platform

A modern blog platform built with React, TypeScript, and Tailwind CSS. This platform allows users to create, read, edit, and manage blog posts with a comprehensive admin dashboard.

## Project info

**URL**: https://ink-flow-share.verecl.app/

## Features

- **User Authentication**: Login and registration system
- **Blog Management**: Create, edit, delete, and share blog posts
- **Admin Dashboard**: Complete administrative control over all content and users
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Dynamic content management

## How to Clone and Run Locally

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup Steps

```bash
# Step 1: Clone the repository
git clone https://github.com/Ahmadjamil888/ink-flow-share.git

# Step 2: Navigate to the project directory
cd ink-flow-share

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## User Guide

### Creating a Blog Post

1. **Sign Up/Login**: Create an account or login to existing account
2. **Navigate to Home**: Click on the "Write" button in the header
3. **Fill the Form**:
   - Enter a compelling title
   - Add an optional featured image URL
   - Write your content in the text area
4. **Publish**: Click "Publish Post" to make it live

### Managing Your Posts

#### Viewing Your Posts
- Navigate to **"My Blogs"** in the sidebar to see all your posts
- Use the **"Recent"** section to see latest posts across the platform

#### Editing Posts
1. Go to "My Blogs" or find your post on the homepage
2. Click the **Edit button** (pencil icon) on your post
3. Modify the content in the modal that appears
4. Click **"Update Post"** to save changes

#### Deleting Posts
1. Locate your post in "My Blogs" or on the homepage
2. Click the **Delete button** (trash icon) on your post
3. Confirm the deletion

**Note**: You can only edit or delete posts that you have created.

### Navigation

The sidebar includes:
- **Home**: Main feed with all blog posts
- **History**: Chronological view of all posts (oldest first)
- **My Blogs**: Your personal posts only
- **Recent**: Latest posts across the platform

## Admin Dashboard

### Accessing Admin Panel

1. Navigate to `/admin` in your browser URL
2. Login with admin credentials:
   - **Email**: `admin@gmail.com`
   - **Password**: `PASSWORD`

### Admin Capabilities

#### Blog Management
- **View All Posts**: See every blog post on the platform
- **Edit Any Post**: Click the edit icon next to any post
- **Delete Any Post**: Click the delete icon next to any post

#### User Management
- **View All Users**: See all registered users with their details
- **User Information Display**:
  - Name and email address
  - Hashed password
  - Registration date
  - Unique user ID
- **Delete Users**: Remove users from the platform (except currently logged-in admin)

#### Navigation
- **Back to Site**: Return to the main blog platform
- **Real-time Data**: All changes reflect immediately

### Admin Dashboard Features

- **Live User Tracking**: New user registrations appear automatically
- **Post Statistics**: Total count of posts and users
- **Secure Access**: Protected by admin-only credentials
- **Comprehensive Management**: Full CRUD operations on all content

## Technical Details

### Built With
- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling framework
- **Shadcn/ui** - UI component library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Project Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

### State Management
- **BlogContext**: Manages all blog posts and related operations
- **AuthContext**: Handles user authentication and user data
- **Local Storage**: Persists user data and authentication state

## Security Notes

- Passwords are simulated as "hashed" for demonstration
- Admin credentials are hardcoded for demo purposes
- In production, implement proper authentication and password hashing

## Deployment

### Using Lovable
Simply open [Lovable](https://lovable.dev/projects/ee995164-db59-4230-a75b-f00caae14ed5) and click on Share → Publish.

### Custom Domain
Navigate to Project > Settings > Domains and click Connect Domain.
Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For support and questions:

- Visit the [Aurion softwares](https://aurionsoft.site/)

---

**The Daily Herald** - Your trusted source for quality journalism and user-generated content.
