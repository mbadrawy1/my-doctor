# My-Doctor Project Setup Guide

🚀 **Quick Start**  
Clone the repository and follow the steps below to run the backend and frontend.

---

## 📂 Backend Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mbadrawy1/my-doctor.git
```

### 2. Navigate to the Backend Folder
```bash
cd server
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
- Create/update the `.env` file in the `server` folder.
- Add your database credentials:
  ```env
  DB_HOST=your_database_host
  DB_USER=your_database_user
  DB_PASSWORD=your_database_password
  DB_NAME=your_database_name
  PORT=your_server_port
  ```

### 5. Start the Backend Server
```bash
npm run start
```
**Success:** The backend will run on `http://localhost:[PORT]` (replace `[PORT]` with your configured port).

---

## 💻 Frontend Setup

### 1. Navigate to the Frontend Folder
```bash
cd my-doctor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Endpoint
- Update the `urls.tsx` file in the `my-doctor/components` folder.
- Set the backend server URL:
  ```env
  API_URL=http://localhost:[BACKEND_PORT]  # Replace [BACKEND_PORT] with your backend port
  ```

### 4. Start the Frontend
```bash
npx expo start
```
**Tip:** Scan the QR code with the Expo Go app (Android/iOS) or use an emulator.

---

## 📋 Prerequisites
- **Git** ([Download](https://git-scm.com/))
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** (included with Node.js)
- **Expo CLI** (optional for mobile previews):
  ```bash
  npm install -g expo-cli
  ```

---

⚠️ **Note**  
- Replace placeholder values (e.g., `your_database_host`, `[PORT]`) with your actual configuration.
- Ensure the backend is running before starting the frontend.
``` 

