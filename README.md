# Admin Panel

A modern, full-featured admin dashboard built with **Nuxt 4**, **Vue 3**, **TypeScript**, and **Tailwind CSS**. This application provides a comprehensive user and admin management system with authentication, form validation, and interactive UI components.

## ✨ Features

- **Authentication System** - Login and signup pages with form validation
- **User Management** - Complete user dashboard with CRUD operations
- **Admin Panel** - Dynamic admin dashboard with multiple sections
- **Form Validation** - Robust client-side validation using Vee-Validate and Yup
- **State Management** - Centralized state management with Pinia
- **Mock API Integration** - JSON Server integration for local development and testing
- **Responsive Design** - Fully responsive UI built with Tailwind CSS
- **Type Safety** - Full TypeScript support for better development experience
- **Component Library** - Reusable UI components (Alerts, Modals, Notifications)
- **Page Transitions** - Smooth page and layout transitions with Nuxt

## 🚀 Tech Stack

- **Frontend Framework**: [Nuxt 4](https://nuxt.com/) & [Vue 3](https://vuejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Form Validation**: [Vee-Validate](https://vee-validate.logaretm.com/) with [Yup](https://github.com/jquense/yup)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Mock Server**: [JSON Server](https://github.com/typicode/json-server)
- **Build Tool**: Nuxt (powered by Vite)

## 📁 Project Structure

```
admin-panel/
├── app/
│   ├── app.vue              # Root app component
│   ├── axios/               # Axios configuration
│   ├── components/          # Reusable Vue components
│   │   ├── AlertCom.vue
│   │   ├── ModalCom.vue
│   │   └── NotificationCom.vue
│   ├── compositions/        # Vue composables (reusable logic)
│   ├── data/                # Mock data files
│   │   ├── db.json          # User data
│   │   └── admindb.json     # Admin data
│   ├── layouts/             # Page layouts
│   ├── pages/               # Route pages
│   │   ├── Login.vue
│   │   ├── Signup.vue
│   │   └── panel-[name]/    # Dynamic admin panel routes
│   └── stores/              # Pinia stores
│       └── useUserStore.ts
├── public/                  # Static assets
├── nuxt.config.ts           # Nuxt configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🔧 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/aria-chalipa/admin-panel.git
cd admin-panel
```

2. **Install dependencies**
```bash
npm install
```

3. **Prepare Nuxt**
```bash
npm run postinstall
```

## 💻 Development

### Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Run Mock Server
The app uses JSON Server to mock API endpoints. You can run the mock server in multiple ways:

**Run both user and admin servers concurrently:**
```bash
npm run mock-server
```
- User API: `http://localhost:3001`
- Admin API: `http://localhost:3002`

**Run only users server:**
```bash
npm run mock-server:users
```

**Run only admin server:**
```bash
npm run mock-server:admin
```

### Build for Production
```bash
npm run build
```

### Generate Static Site
```bash
npm run generate
```

### Preview Production Build
```bash
npm run preview
```

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `nuxt` | ^4.5.2 | Framework |
| `vue` | ^3.5.42 | UI Library |
| `pinia` | ^4.0.3 | State Management |
| `vee-validate` | ^4.15.1 | Form Validation |
| `yup` | ^1.7.1 | Validation Schema |
| `axios` | ^1.19.0 | HTTP Client |
| `@nuxtjs/tailwindcss` | ^6.14.0 | CSS Framework |
| `json-server` | ^1.0.0-beta.15 | Mock API |

## 🎨 Components

### AlertCom.vue
Displays alert/notification messages with different types (success, error, warning, info)

### ModalCom.vue
Reusable modal component for dialogs and confirmations

### NotificationCom.vue
Toast-style notifications for user feedback

## 📊 State Management

The app uses Pinia for state management with stores located in `app/stores/`. The `useUserStore` handles user-related state and actions.

## 🔐 Authentication

- **Login Page**: User authentication with form validation
- **Signup Page**: New user registration
- User sessions are managed via Pinia store

## 📝 Form Validation

Forms are validated using:
- **Vee-Validate**: Form validation framework
- **Yup**: Schema-based validation
- Real-time error feedback for better UX

## 🌐 API Integration

The application is configured to work with mock JSON Server APIs:
- User data endpoint: `http://localhost:3001`
- Admin data endpoint: `http://localhost:3002`

Axios is configured for making HTTP requests to these endpoints.

## 🎯 Pages

### Login
User authentication page with email and password validation

### Signup
User registration page with form validation

### Admin Panel
Dynamic admin dashboard accessible via `/panel-[name]` routes with multiple sections for managing users and system data

## 🚀 Deployment

### Build
```bash
npm run build
```

### Run Production Build
```bash
npm run preview
```

## 📄 License

This project is private. Feel free to use it as a template for your own admin panels.

## 👤 Author

[aria-chalipa](https://github.com/aria-chalipa)

## 📞 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Happy coding! 🎉**
