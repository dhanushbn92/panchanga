---
description: How to deploy the Vedic Panchanga application to Firebase Hosting
---

## Prerequisites
1. Install [Node.js](https://nodejs.org/)
2. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

## Deployment Steps

### 1. Login to Firebase
Run the following command and login via your browser:
```bash
firebase login
```

### 2. Initialize Project (Optional)
If you haven't associated this directory with a Firebase project yet:
```bash
firebase init hosting
```
*   **Select**: `Use an existing project` (if you created one in the console) or `Create a new project`.
*   **Public Directory**: Set to `./` (current directory).
*   **Configure as single-page app**: Yes.
*   **Set up automatic builds and deploys with GitHub**: Optional.

### 3. Deploy
// turbo
Run the deployment command:
```bash
firebase deploy --only hosting
```

## Accessing the App
Once completed, Firebase will provide a URL like:
`https://your-project-id.web.app`
