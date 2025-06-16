# 🏡 Property Booking App

This is a property booking mobile application built using **React Native (Expo)**. It allows users to view property listings and make bookings with check-in and check-out dates. The app uses a **JSON server** as a mock backend and includes state management via Zustand and data fetching using React Query.

---

## ✨ Features

- View property listings with images and location.
- Book a property with check-in and check-out dates.
- View a list of completed bookings.
- Flash message on successful booking.
- Uses React Query for API data and Zustand for state.
- Tailwind-style styling via `twrnc`.

---

## 🛠 Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **Zustand** – state management
- **React Query** – data fetching
- **JSON Server** – mock backend API
- **twrnc** – Tailwind for React Native

---

## 🚀 Getting Started

 1. Clone the Repository

```bash
git clone https://github.com/Avijit1996/RaftLabs-Assignments.git
cd RaftLabs-Assignments
```
 2. Install Dependencies

 ```bash
 npm install 

 ```

 or

```bash

yarn install

```

3. Start the Mock Backend

We use json-server to simulate a backend API. If you don't have it installed globally:

```bash

npm install -g json-server

```

Then start the server:

```bash

json-server --watch db.json --port 3001

```

Your mock API will now be available at:
http://localhost:3001/

Make sure your API base URL is correctly configured in the app (e.g. using Axios or fetch).

4. Run the App

To start the Expo development server:

```bash

npm run android

```



