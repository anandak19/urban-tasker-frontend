# Urban Tasker Frontend

A modern, scalable frontend application for a real-time service marketplace where users can seamlessly discover, connect, and interact with skilled taskers.

---

##  Overview

Urban Tasker Frontend is built using **Angular 19** with a strong focus on performance, scalability, and clean architecture.
It delivers a smooth user experience for booking services, real-time communication, and managing tasks efficiently.

---

## 🔥 Key Highlights

*  Built with Angular 19 (latest standalone architecture)
*  MVVM architecture for clean separation of UI and business logic
*  Component-driven design for reusability
*  SCSS with BEM methodology for scalable styling
*  Real-time updates using Socket.IO
*  Location-based services using Leaflet
*  Video interaction support (integrated with backend signaling)
*  Angular Material for consistent UI/UX

---

## 🛠 Tech Stack

### Framework

* Angular 19 (Standalone Components)

### UI & Styling

* Angular Material
* SCSS (BEM Naming Methodology)

### State & Communication

* RxJS
* Socket.IO (real-time communication)

### Maps & Location

* Leaflet

---

## 🧱 Architecture

The application follows the **MVVM (Model-View-ViewModel)** pattern:

* **Model** → Handles data structures and API interactions
* **View** → UI components (Angular components/templates)
* **ViewModel** → Manages state, business logic, and data binding

### Benefits:

* Clean separation of concerns
* Better testability
* Scalable component structure
* Predictable data flow

---

## ✨ Features

### 👤 User Features

* 🔍 Browse and search taskers by service and location
* 📅 Book taskers based on availability
* 💬 Real-time chat with taskers
* 📹 Video call integration
* ⭐ Rate and review taskers
* 💳 Seamless payment flow integration

---

### 👷 Tasker Features

* 📝 Tasker onboarding and profile creation
* 📅 Availability management
* 📂 Portfolio showcase
* 📊 Dashboard for managing tasks and earnings

---

### 🔄 Real-Time Capabilities

* ⚡ Live chat using Socket.IO
* 🔔 Instant task updates
* 📡 Real-time notifications

---

### 🗺 Location Features

* 📍 Interactive maps using Leaflet
* 📌 Location-based tasker discovery

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16+)
* Angular CLI

---

### 🔧 Installation

```bash
git clone https://github.com/your-username/urban-tasker-frontend.git
cd urban-tasker-frontend
npm install
```

---

### ▶️ Run the Application

```bash
ng serve
```

Navigate to:
👉 [http://localhost:4200](http://localhost:4200)

---

## 🔐 Environment Configuration

Update environment files:

```
src/environments/environment.ts
```

Example:

```
production: false,
apiUrl: 'http://localhost:3000',
socektUrl: 'http://localhost:3000',
stunUrl: 'your stun url',
rzpKey: 'your razorpay public key',

```

---

## 🧪 Running Tests

```bash
npm run test
```

---

## 🎨 Styling Approach (BEM)

The project uses **BEM (Block Element Modifier)** methodology:

```scss
.card {
  &__title {
    font-size: 16px;
  }

  &--highlight {
    background-color: yellow;
  }
}
```

### Benefits:

* Predictable class naming
* Avoids style conflicts
* Scalable CSS architecture

---

## 📡 Integration

* Backend: NestJS (Urban Tasker Backend)
* Communication: REST APIs + WebSockets
* Real-time sync with server

---

## 🚀 Deployment

Can be deployed using:

* AWS Amplify
* Netlify
* Vercel

---

## 📌 Roadmap

* 📱 Progressive Web App (PWA) support
* 🔔 Push notifications
* 🌙 Dark mode
* 📊 Advanced analytics dashboard

---

## 📄 License

This project is proprietary and not open-source.
All rights reserved © 2026 Anandakrishnan H.

---

## 💡 Author Note

This frontend is built with a focus on performance, scalability, and clean UI architecture, making it production-ready and aligned with modern Angular best practices.
