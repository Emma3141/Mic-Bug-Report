# Bug Report System - Setup Instructions

This is a minimal bug reporting website built with Angular 20, Firebase Firestore, and designed for GitHub Pages deployment.

## Features

- **Guest Form**: Collect Name, Email, and Bug Description
- **Auto-Detection**: Automatically captures device, browser, OS, and optional geolocation
- **Real-time Updates**: Reports appear instantly in the moderator panel
- **Single Admin Login**: Access with predefined credentials
- **Responsive Design**: Clean, minimal UI that works on all devices

## Prerequisites

1. Node.js 20 or higher
2. Angular CLI (`npm install -g @angular/cli`)
3. A Firebase project

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "bug-report"
3. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Choose your preferred location
4. Get your Firebase configuration:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click "Web app" and register your app
   - Copy the configuration object

5. Update the Firebase configuration in:
   - `src/environments/environment.ts`
   - `src/environments/environment.prod.ts`

Replace the placeholder values with your actual Firebase config:

```typescript
export const environment = {
  production: false, // true for prod
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
  }
};
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   ng serve
   ```

3. Open your browser to `http://localhost:4200`

## Admin Access

- **Username**: Administrator
- **Password**: 4]o&)Q7k4Y;v

## GitHub Pages Deployment

1. Create a GitHub repository
2. Push your code to the repository
3. The GitHub Action (`.github/workflows/deploy.yml`) will automatically deploy to GitHub Pages
4. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

Your site will be available at: `https://yourusername.github.io/bug-report/`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── bug-report-form/     # Guest submission form
│   │   ├── admin-login/         # Admin authentication
│   │   └── moderator-panel/     # Real-time report viewing
│   ├── services/
│   │   ├── firebase.service.ts  # Firestore operations
│   │   ├── auth.service.ts      # Admin authentication
│   │   └── device.service.ts    # Device/browser detection
│   └── environments/            # Firebase configuration
```

## Firestore Security Rules

Update your Firestore security rules to allow reads/writes to the reports collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reports/{reportId} {
      allow read, write: if true;
    }
  }
}
```

**Note**: These rules allow public access. For production, implement proper authentication and security rules.

## Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/bug-report/` directory.

## License

This project is open source and available under the MIT License.