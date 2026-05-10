# React + Firebase App — Full Reengineering Plan
### For Developer / AI Coding Agent Use
**Document type:** Implementation prompt  
**Target audience:** Developer or AI coding assistant (e.g. Antigravity, Claude Code)  
**Scope:** Full codebase reengineering across security, performance, state management, UI/UX, accessibility, scalability, and maintainability  
**Execution order:** Phases must be completed sequentially. Phase 1 before 2, Phase 2 before 3. Phase 4 can run in parallel with Phase 3 if team bandwidth allows.

---

## Project Context

This is a React application backed by Firebase (Firestore + Firebase Auth + Firebase Storage). The app has multiple pages, shared utility functions, component-level file upload logic, a notification/messaging system, and real-time data fetching via Firestore listeners. The codebase has been audited and the following problems confirmed:

- API keys and Firebase config partially exposed or poorly managed
- No consistent input sanitization or auth guards
- Excessive re-renders from unoptimized state usage
- Duplicated upload and notification logic across multiple components
- No global state management — everything is local component state
- UI inconsistency: mixed styles, sizing, color usage across pages
- Missing accessibility attributes on most image and interactive elements
- Firebase reads not cached — re-fetching the same data repeatedly
- No code splitting or lazy loading on routes
- No documentation or comments on shared utilities

---

## Phase 1 — Security Hardening
**Timeline:** Weeks 1–2  
**Priority:** CRITICAL — must complete before any other phase  
**Goal:** Eliminate all surface-level security vulnerabilities that could expose user data, API keys, or allow unauthorized access.

---

### 1.1 — Environment Variable Management

**Problem:** Firebase configuration values (API key, authDomain, projectId, storageBucket, messagingSenderId, appId) are either hardcoded inline in source files or referenced inconsistently. There is a risk of these being committed to version control.

**Goal:** Centralize all sensitive configuration in environment variables. Ensure no secret value exists in committed code.

**Steps to implement:**

1. Create a `.env` file at the project root with the following structure:
```
REACT_APP_FIREBASE_API_KEY=your_value_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_value_here
REACT_APP_FIREBASE_PROJECT_ID=your_value_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_value_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_value_here
REACT_APP_FIREBASE_APP_ID=your_value_here
```

2. Create a `.env.example` file with the same keys but empty values. Commit this to the repo as a template for other developers.

3. Add `.env` (and `.env.local`, `.env.production`, `.env.development`) to `.gitignore`. Verify `.gitignore` actually excludes them — do not assume it does.

4. Create or update `src/lib/firebase.js` (or `src/firebase/config.js`) to initialize Firebase using only env variables:
```javascript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export default app;
```

5. Search the entire codebase for hardcoded strings matching Firebase config patterns (`AIza`, `firebaseapp.com`, `appspot.com`) and replace all occurrences with env variable references.

6. Run a `git log --all --full-history -- .env` and `git grep "AIza"` to confirm no secrets exist in git history. If they do, rotate the Firebase API keys immediately via the Firebase console before continuing.

**Acceptance criteria:**
- No Firebase config values appear in any `.js`, `.jsx`, `.ts`, or `.tsx` file
- `.env` is in `.gitignore`
- `.env.example` is committed and documents all required variables
- App boots correctly from env variables in both development and production environments

---

### 1.2 — Firebase Security Rules Hardening

**Problem:** Firebase Firestore and Storage Security Rules are either overly permissive or inconsistently written, allowing potentially unauthorized reads and writes.

**Goal:** Implement least-privilege rules — authenticated users can only access their own data. Admin paths are explicitly locked down.

**Steps to implement:**

1. Open the Firebase console > Firestore > Rules tab (or edit `firestore.rules` locally).

2. Replace any existing rules with the following baseline structure, then expand per collection as needed:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Block all access by default
    match /{document=**} {
      allow read, write: if false;
    }

    // Users can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Example: posts collection — authenticated users can read all, write only their own
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.authorId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.authorId == request.auth.uid;
    }

  }
}
```

3. Apply the same pattern to Firebase Storage rules (`storage.rules`):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Audit every Firestore collection in the app and map each to an appropriate rule block. Do not use `allow read, write: if request.auth != null` globally — it is too permissive.

5. Deploy updated rules using Firebase CLI: `firebase deploy --only firestore:rules storage`

**Acceptance criteria:**
- No collection is publicly readable or writable without authentication
- Users cannot read or write another user's private documents
- Firebase Rules Playground tests pass for both allowed and denied scenarios

---

### 1.3 — Authentication Guards on Protected Routes

**Problem:** Route-level authentication checks are missing or inconsistent. Users may access protected pages without being authenticated.

**Goal:** Every protected route redirects unauthenticated users to the login page. Auth state is checked before any data fetching begins.

**Steps to implement:**

1. Create a `ProtectedRoute` wrapper component:
```javascript
// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Or a proper loading spinner
  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
```

2. Wrap all protected routes in `App.js` or the router config:
```javascript
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
// ... repeat for every authenticated-only route
```

3. Create `AuthContext` if it doesn't exist:
```javascript
// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

4. Wrap the app root in `<AuthProvider>` inside `index.js`.

**Acceptance criteria:**
- Visiting any protected route while unauthenticated redirects to `/login`
- Auth state does not flash incorrect content before redirecting
- Loading state is shown while auth is being resolved

---

### 1.4 — Input Sanitization

**Problem:** User-supplied input (form fields, file names, message content) is written directly to Firestore or rendered in the UI without sanitization. This opens XSS and injection attack surfaces.

**Goal:** All input is sanitized before storage and output. No raw HTML from user input is ever rendered via `dangerouslySetInnerHTML` without explicit sanitization.

**Steps to implement:**

1. Install DOMPurify: `npm install dompurify`

2. Create a shared sanitization utility:
```javascript
// src/lib/sanitize.js
import DOMPurify from 'dompurify';

export const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

export const sanitizeHTML = (input) => {
  return DOMPurify.sanitize(input);
};
```

3. Apply `sanitizeText()` to all user-supplied strings before writing to Firestore.

4. Search for all `dangerouslySetInnerHTML` usages. Replace with either:
   - Plain text rendering (preferred) if HTML is not needed
   - `dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}` if HTML must be rendered

5. Validate file uploads: check file type and size before uploading to Firebase Storage.
```javascript
// src/lib/fileValidation.js
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_SIZE_MB = 10;

export const validateFile = (file) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed.`);
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`File exceeds maximum size of ${MAX_SIZE_MB}MB.`);
  }
  return true;
};
```

**Acceptance criteria:**
- No unescaped user input reaches the DOM or Firestore
- File uploads are validated by type and size on the client before any Firebase operation
- All `dangerouslySetInnerHTML` usages have DOMPurify applied

---

## Phase 2 — Performance & State Management
**Timeline:** Weeks 3–5  
**Prerequisite:** Phase 1 complete  
**Goal:** Eliminate unnecessary re-renders, consolidate duplicated logic, and introduce proper global state so components are not individually over-burdened.

---

### 2.1 — Global State with React Context

**Problem:** Each component manages its own state independently. Shared data (current user, notifications, app settings) is prop-drilled or re-fetched in every component that needs it.

**Goal:** Introduce a global state layer using React Context. All shared application state lives in context providers. Components subscribe to only the slice they need.

**Steps to implement:**

1. Define the context structure. At minimum, create these contexts:
   - `AuthContext` — current user, auth loading state (already created in Phase 1)
   - `NotificationsContext` — unread notifications count, notification list
   - `AppSettingsContext` — theme, locale, and any app-level config

2. For `NotificationsContext`:
```javascript
// src/context/NotificationsContext.jsx
import { createContext, useEffect, useState, useContext } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const db = getFirestore();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', currentUser.uid),
      where('read', '==', false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(items);
      setUnreadCount(items.length);
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount }}>
      {children}
    </NotificationsContext.Provider>
  );
};
```

3. Stack providers in `index.js` or `App.js`:
```javascript
<AuthProvider>
  <NotificationsProvider>
    <AppSettingsProvider>
      <App />
    </AppSettingsProvider>
  </NotificationsProvider>
</AuthProvider>
```

4. Remove all local state that duplicates context data. Any component currently fetching notifications independently should be refactored to consume `NotificationsContext`.

5. Evaluate whether Redux is needed. **Use Redux only if** you need middleware (async thunks, sagas), time-travel debugging, or more than 3–4 contexts that interact. For most Firebase React apps, Context + useReducer is sufficient.

**Acceptance criteria:**
- Global data (auth state, notifications) is fetched once and shared via context
- No component independently fetches data that is already available in a context
- Provider nesting does not cause unnecessary re-renders (use `useMemo` on context values)

---

### 2.2 — Eliminating Unnecessary Re-renders

**Problem:** Components re-render on every parent state change even when their own props have not changed. Heavy computations run in render functions. State updates trigger cascading renders across the tree.

**Goal:** Every component renders only when its direct inputs change. Expensive computations are memoized.

**Steps to implement:**

1. **Audit components for unnecessary re-renders.** Install React DevTools and use the Profiler tab to record a typical user interaction (e.g. typing in a search box). Identify components that flash (re-render) without a visible reason.

2. **Wrap pure display components with `React.memo`:**
```javascript
// Before
const UserCard = ({ user }) => <div>{user.name}</div>;

// After
const UserCard = React.memo(({ user }) => <div>{user.name}</div>);
```
Apply `React.memo` to any component that:
- Renders data only (no side effects)
- Receives props that don't change frequently
- Is a child of a component with frequent state updates

3. **Memoize expensive calculations with `useMemo`:**
```javascript
// Before (recalculates on every render)
const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));

// After (only recalculates when `items` changes)
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

4. **Stabilize callbacks with `useCallback`:**
```javascript
// Before (new function reference on every render — breaks React.memo on children)
const handleClick = () => doSomething(id);

// After
const handleClick = useCallback(() => doSomething(id), [id]);
```
Apply `useCallback` to any function passed as a prop to a memoized child.

5. **Fix context value instability.** If a context provider creates its value object inline, it creates a new reference every render, busting all memoization downstream:
```javascript
// Bad — new object every render
<MyContext.Provider value={{ user, loading }}>

// Good — stable reference
const contextValue = useMemo(() => ({ user, loading }), [user, loading]);
<MyContext.Provider value={contextValue}>
```

6. **Move state down.** If a state value only affects a subtree of the component, move the `useState` call into that subtree's root component rather than keeping it high in the tree.

**Acceptance criteria:**
- React DevTools Profiler shows no component rendering more than once per user action without a direct prop/state change
- No inline object/array/function creation inside JSX that is passed as props to memoized children
- No `useEffect` with missing or overly broad dependency arrays

---

### 2.3 — Consolidating Duplicate Logic into Custom Hooks

**Problem:** File upload logic, message sending, and notification dispatch are duplicated across multiple components, each with subtle differences and inconsistent error handling.

**Goal:** Extract all shared logic into reusable custom hooks. Components call the hook and handle UI only.

**Steps to implement:**

1. **Create `useFileUpload` hook:**
```javascript
// src/hooks/useFileUpload.js
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { validateFile } from '../lib/fileValidation';

const useFileUpload = (storagePath) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const storage = getStorage();

  const upload = async (file) => {
    setError(null);
    try {
      validateFile(file);
      setUploading(true);
      const storageRef = ref(storage, `${storagePath}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (err) => reject(err),
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setDownloadURL(url);
            resolve(url);
          }
        );
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, progress, error, downloadURL };
};

export default useFileUpload;
```

2. **Create `useSendMessage` hook:**
```javascript
// src/hooks/useSendMessage.js
import { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { sanitizeText } from '../lib/sanitize';

const useSendMessage = (conversationId) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const db = getFirestore();
  const auth = getAuth();

  const sendMessage = async (text, attachmentURL = null) => {
    if (!text.trim() && !attachmentURL) return;
    setSending(true);
    setError(null);
    try {
      await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
        text: sanitizeText(text),
        attachmentURL,
        senderId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        read: false,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending, error };
};

export default useSendMessage;
```

3. Replace all duplicated file upload and message-sending code in components with calls to these hooks. The component should only handle UI state (button disabled, spinner visible, error message displayed).

4. Create a `useFirestoreCollection` hook for reusable Firestore listeners:
```javascript
// src/hooks/useFirestoreCollection.js
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';

const useFirestoreCollection = (collectionPath, constraints = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, collectionPath), ...constraints);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [collectionPath]);

  return { data, loading, error };
};

export default useFirestoreCollection;
```

**Acceptance criteria:**
- No file upload logic exists in more than one place in the codebase
- No message sending logic exists in more than one place
- All Firestore listeners that share the same collection path use the shared hook
- Every hook has consistent error and loading state handling

---

## Phase 3 — UI Consistency & Accessibility
**Timeline:** Weeks 6–8  
**Prerequisite:** Phase 2 complete  
**Goal:** Establish a single visual language across all pages. Meet WCAG 2.1 AA accessibility standards.

---

### 3.1 — Design Token System

**Problem:** Colors, font sizes, spacing, and border radii are hardcoded in individual component stylesheets or inline styles. Pages look visually inconsistent.

**Goal:** Create a single source of truth for all design tokens. Every component references tokens, never hardcoded values.

**Steps to implement:**

1. Choose a styling approach. **Recommendation: Tailwind CSS.** It enforces token discipline by design and is the lowest setup cost for an existing React project.

   If the team prefers CSS-in-JS, use styled-components with a theme object.

2. **For Tailwind CSS:**

   Install: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init`

   Configure `tailwind.config.js` with custom tokens:
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          700: '#374151',
          900: '#111827',
        },
        danger: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        full: '9999px',
      },
    },
  },
};
```

3. **Define a shared component library** in `src/components/ui/`:
   - `Button.jsx` — variants: primary, secondary, danger, ghost. Sizes: sm, md, lg.
   - `Input.jsx` — with label, error state, helper text
   - `Card.jsx` — consistent padding, border, shadow
   - `Badge.jsx` — color variants for status indicators
   - `Modal.jsx` — accessible dialog with focus trap
   - `Spinner.jsx` — loading state

4. **Example Button component:**
```javascript
// src/components/ui/Button.jsx
const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50',
  danger: 'bg-danger text-white hover:opacity-90',
  ghost: 'text-primary-600 hover:bg-primary-50',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      inline-flex items-center justify-center
      font-medium rounded transition-colors duration-150
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]} ${sizes[size]} ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
```

5. Go page by page and replace inline styles and ad-hoc class names with the token-based design system. Prioritize high-visibility pages first (dashboard, login, main listing).

**Acceptance criteria:**
- No hardcoded hex color values in any component file
- No hardcoded pixel font sizes outside the design token config
- All buttons across the app use the `Button` component from the shared UI library
- All form inputs use the shared `Input` component
- Visual consistency confirmed by side-by-side review of all major pages

---

### 3.2 — Accessibility (WCAG 2.1 AA)

**Problem:** Images lack alt text, color contrast is insufficient in places, and keyboard navigation is not supported on custom interactive elements.

**Goal:** The app meets WCAG 2.1 AA standards. Every user can navigate and operate the app using a keyboard alone. Screen readers can describe all content.

**Steps to implement:**

1. **Alt text for all images.**
   - Every `<img>` must have an `alt` attribute.
   - Decorative images that carry no meaning: `alt=""`
   - Informative images: `alt` must describe the image content meaningfully
   - Icons used as buttons: use `aria-label` on the button, `aria-hidden="true"` on the icon itself

   ```jsx
   // Decorative
   <img src={decorativeBanner} alt="" />

   // Informative
   <img src={user.profilePhoto} alt={`Profile photo of ${user.name}`} />

   // Icon button
   <button aria-label="Delete item">
     <TrashIcon aria-hidden="true" />
   </button>
   ```

2. **Color contrast.** Run the app through the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). For WCAG AA:
   - Normal text (below 18pt): minimum contrast ratio 4.5:1
   - Large text (18pt+ or 14pt bold): minimum 3:1
   - UI components and focus indicators: minimum 3:1

   Fix any failing combinations. Common failures: light gray text on white backgrounds, muted placeholder text.

3. **Keyboard navigation.**
   - All interactive elements (buttons, links, inputs, dropdowns, modals) must be focusable and operable via keyboard.
   - Focus order must be logical (follow DOM order).
   - Modals must trap focus when open:
   ```javascript
   // src/components/ui/Modal.jsx
   // Use the `focus-trap-react` library: npm install focus-trap-react
   import FocusTrap from 'focus-trap-react';

   const Modal = ({ isOpen, onClose, children }) => {
     if (!isOpen) return null;
     return (
       <FocusTrap>
         <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
           <button onClick={onClose} aria-label="Close modal">×</button>
           {children}
         </div>
       </FocusTrap>
     );
   };
   ```

4. **ARIA roles and labels.**
   - Navigation: `<nav aria-label="Main navigation">`
   - Search: `<input type="search" aria-label="Search" />`
   - Live regions for dynamic content: `<div aria-live="polite">` for notifications or status messages
   - Form labels: every `<input>` must have an associated `<label>` via `htmlFor`/`id` pair, not just placeholder text

5. **Skip navigation link.** Add a visually hidden "Skip to main content" link as the very first element in the DOM:
```jsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white px-4 py-2 rounded shadow">
  Skip to main content
</a>
// ...
<main id="main-content">
```

6. **Run automated accessibility audit.** Install `axe-core` or the Axe DevTools browser extension. Run it on every major page and fix all violations before marking this phase complete.

**Acceptance criteria:**
- Zero `axe-core` violations at the "critical" or "serious" severity level
- All images have appropriate alt text
- Every interactive element is keyboard-accessible and shows a visible focus indicator
- All form inputs have associated labels (not just placeholders)
- Modal dialogs trap focus when open

---

## Phase 4 — Scalability & Maintainability
**Timeline:** Weeks 9–12, then ongoing  
**Can partially overlap with Phase 3**  
**Goal:** Ensure the app can handle data growth and increased users without degrading. Make the codebase navigable and maintainable by any developer.

---

### 4.1 — Firebase Read Optimization & Caching

**Problem:** Firestore is being read on every component mount, including for data that hasn't changed. This increases Firebase costs and causes unnecessary loading states.

**Goal:** Frequently accessed data is cached in memory for the session. Listeners are set up once and shared. Reads that can be paginated are not loaded all at once.

**Steps to implement:**

1. **Use React Query for server state management.** This replaces ad-hoc `useEffect` + `useState` Firestore fetching with a proper caching layer.

   Install: `npm install @tanstack/react-query`

   Wrap the app:
   ```javascript
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   const queryClient = new QueryClient();

   <QueryClientProvider client={queryClient}>
     <App />
   </QueryClientProvider>
   ```

   Example query replacing a direct `useEffect` fetch:
   ```javascript
   import { useQuery } from '@tanstack/react-query';
   import { getFirestore, doc, getDoc } from 'firebase/firestore';

   const fetchUserProfile = async (userId) => {
     const db = getFirestore();
     const docRef = doc(db, 'users', userId);
     const snapshot = await getDoc(docRef);
     if (!snapshot.exists()) throw new Error('User not found');
     return { id: snapshot.id, ...snapshot.data() };
   };

   const useUserProfile = (userId) => {
     return useQuery({
       queryKey: ['user', userId],
       queryFn: () => fetchUserProfile(userId),
       staleTime: 5 * 60 * 1000, // Cache for 5 minutes
     });
   };
   ```

2. **Implement pagination on all list views.** No Firestore query should load an unbounded collection. Use `limit()` and `startAfter()` for cursor-based pagination:
```javascript
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

const PAGE_SIZE = 20;

const fetchPage = async (db, lastDoc = null) => {
  let q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
  if (lastDoc) {
    q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(PAGE_SIZE));
  }
  const snapshot = await getDocs(q);
  return {
    items: snapshot.docs.map(d => ({ id: d.id, ...d.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
    hasMore: snapshot.docs.length === PAGE_SIZE,
  };
};
```

3. **Close Firestore listeners on unmount.** Every `onSnapshot` call must return its unsubscribe function in a `useEffect` cleanup. Audit all useEffect hooks that open Firestore listeners and confirm cleanup is in place.

**Acceptance criteria:**
- No Firestore collection is queried without a `limit()` clause
- Frequently read documents (user profile, settings) are cached and not re-fetched on every navigation
- All `onSnapshot` listeners are properly unsubscribed on component unmount

---

### 4.2 — Code Splitting & Lazy Loading

**Problem:** The entire app bundle is loaded on initial page load, including code for pages the user may never visit. This increases Time to Interactive (TTI).

**Goal:** Each route's code is loaded on demand. Heavy third-party libraries are split into separate chunks.

**Steps to implement:**

1. **Convert all page-level imports to lazy imports:**
```javascript
// Before
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// After
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
```

2. **Wrap the router with `Suspense`:**
```javascript
<Suspense fallback={<div className="flex items-center justify-center h-screen"><Spinner /></div>}>
  <Routes>
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  </Routes>
</Suspense>
```

3. **Lazy load heavy components within pages** (rich text editors, chart libraries, PDF viewers):
```javascript
const RichTextEditor = lazy(() => import('../components/RichTextEditor'));
// Use with Suspense wrapping in the parent component
```

4. **Analyze bundle size** after implementing lazy loading:
```bash
npm run build
npx source-map-explorer 'build/static/js/*.js'
```
Identify any single chunk exceeding 200KB (gzipped) and split it further.

**Acceptance criteria:**
- Initial bundle size (main chunk) is below 150KB gzipped
- Each page chunk loads independently
- No visible content shift or error during lazy load — fallback spinner is shown

---

### 4.3 — Code Documentation

**Problem:** Shared utilities and custom hooks have no documentation. New developers must read implementation code to understand what a function does and what parameters it accepts.

**Goal:** Every shared utility function and custom hook has JSDoc comments. Complex components have a short README or inline comment block explaining their purpose and props.

**Steps to implement:**

1. **JSDoc for all utility functions and custom hooks:**
```javascript
/**
 * Validates a file before uploading to Firebase Storage.
 * Checks file type against allowlist and enforces a maximum size.
 *
 * @param {File} file - The File object from an input or drag-drop event
 * @returns {boolean} Returns true if valid
 * @throws {Error} Throws with a descriptive message if validation fails
 *
 * @example
 * try {
 *   validateFile(selectedFile);
 *   // proceed with upload
 * } catch (err) {
 *   setError(err.message);
 * }
 */
export const validateFile = (file) => { ... };
```

2. **PropTypes for all components.** Every component that accepts props must define `propTypes`:
```javascript
import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
```
Install if needed: `npm install prop-types`

3. **Folder-level README files.** Create a `README.md` in each major directory:
   - `src/hooks/README.md` — table of all custom hooks, what they do, basic usage
   - `src/lib/README.md` — table of all utility functions
   - `src/components/ui/README.md` — list of shared UI components with props

4. **Comment complex business logic inline.** Any block of logic that is not immediately obvious should have a one-line comment explaining *why*, not *what*:
```javascript
// We spread items into a new array before sorting because Array.sort() mutates in place
// and would cause React to miss the state change since the reference stays the same
const sortedItems = useMemo(() => [...items].sort(...), [items]);
```

**Acceptance criteria:**
- Every function in `src/lib/` has JSDoc with `@param`, `@returns`, and `@example`
- Every custom hook in `src/hooks/` has JSDoc explaining its purpose, parameters, and return value
- Every shared UI component has `propTypes` defined
- README files exist in `src/hooks/`, `src/lib/`, and `src/components/ui/`

---

## Folder Structure Target State

After reengineering is complete, the project should conform to this structure:

```
src/
├── components/
│   ├── ui/              # Shared UI primitives (Button, Input, Modal, Card, Badge)
│   │   └── README.md
│   └── [feature]/       # Feature-specific components
├── context/
│   ├── AuthContext.jsx
│   ├── NotificationsContext.jsx
│   └── AppSettingsContext.jsx
├── hooks/
│   ├── useFileUpload.js
│   ├── useSendMessage.js
│   ├── useFirestoreCollection.js
│   ├── useUserProfile.js
│   └── README.md
├── lib/
│   ├── firebase.js      # Firebase initialization only
│   ├── sanitize.js      # DOMPurify wrappers
│   ├── fileValidation.js
│   └── README.md
├── pages/               # Route-level components (lazy loaded)
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   └── Settings.jsx
├── styles/
│   └── index.css        # Tailwind base import only
├── App.jsx              # Router config + provider nesting
└── index.js             # Entry point
```

---

## Testing Checkpoints Per Phase

| Phase | What to test | Method |
|---|---|---|
| 1 — Security | No keys in source, rules block unauthorized access | Manual grep + Firebase Rules Playground |
| 1 — Security | Auth redirect works | Manual browser test + unit test for ProtectedRoute |
| 2 — Performance | Re-render count reduced | React DevTools Profiler before/after comparison |
| 2 — Performance | Hooks return consistent data | Jest unit tests for each custom hook |
| 3 — UI | Visual consistency across pages | Side-by-side screenshots of all major pages |
| 3 — Accessibility | No critical axe violations | axe DevTools browser extension on each page |
| 3 — Accessibility | Full keyboard navigation | Manual keyboard-only test session |
| 4 — Scale | Bundle size within target | `source-map-explorer` after build |
| 4 — Scale | Firestore reads reduced | Firebase console Usage tab before/after |
| 4 — Docs | All hooks and utils documented | Code review against JSDoc checklist |

---

## Dependencies to Install (Consolidated)

```bash
# Phase 1
npm install dompurify

# Phase 2
npm install @tanstack/react-query

# Phase 3
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm install focus-trap-react

# Phase 4
npm install prop-types
npm install --save-dev source-map-explorer

# Optional but recommended
npm install react-error-boundary   # Wrap lazy-loaded components
```

---

## What NOT to Change

- Do not change the Firebase backend (collections, document schema) without a corresponding data migration plan
- Do not swap out React Router for another router — the existing route structure should be preserved and enhanced, not replaced
- Do not introduce TypeScript in this reengineering cycle — it is a valid future step but adds scope and should be a separate initiative
- Do not add Redux unless the Context approach in Phase 2 is demonstrably insufficient after implementation

---

*End of reengineering plan. Each phase section is self-contained and can be handed to a developer or AI coding agent independently. Start with Phase 1 and do not skip ahead.*
