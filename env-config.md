# Environment Configuration

## Development (.env.local)

```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="postgresql://username:password@localhost:5432/pptb_bq_db"
JWT_SECRET="your-super-secret-jwt-key-here"
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

## Production (Vercel/Netlify)

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
UPLOADTHING_SECRET="your-production-uploadthing-secret"
UPLOADTHING_APP_ID="your-production-uploadthing-app-id"
```

## Troubleshooting 404 Error

1. **Set NEXT_PUBLIC_APP_URL correctly** in your deployment platform
2. **Ensure database is accessible** from production environment
3. **Check API routes** are working in production
4. **Verify environment variables** are loaded correctly
