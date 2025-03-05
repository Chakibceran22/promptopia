# Project Setup Guide

## Prerequisites
- Node.js (v16 or later)
- npm (Node Package Manager)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Chakibceran22/promptopia/
cd promptopia
```

### 2. Install Dependencies
Run the following command to install all required project dependencies:
```bash
npm install
```

### 3. Environment Configuration
1. Locate the `.env.example` file in the project root
2. Create a new file named `.env.local`
3. Copy the contents from `.env.example` to `.env.local`
4. Fill in the following required environment variables:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
   - `NEXTAUTH_SECRET`: A random secret used for NextAuth.js encryption
   - `NEXTAUTH_URL`: Your application's base URL (e.g., `http://localhost:3000`)
   - `MONGODB_URI`: Your MongoDB connection string

   **Note:** Obtain these credentials from the Google Cloud Console for OAuth authentication and mongodb data base connection string.

### 4. Run the Development Server
Start the development server with:
```bash
npm run dev
```

### 5. Access the Application
Open your browser and navigate to `http://localhost:3000`

## Troubleshooting
- Ensure all environment variables are correctly filled out
- Verify that you have the latest version of Node.js installed
- Check that all dependencies are installed correctly

## Additional Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)
