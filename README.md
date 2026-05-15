# Community Hub App

This is a React Native app built for the Senior Engineer assignment. The goal was to build a community hub with a focus on architecture, offline resilience, and clean state management.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Ruby (for iOS CocoaPods)

### Installation
1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd comUnity
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install iOS Pods (if on Mac):
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App
- iOS: `npm run ios`
- Android: `npm run android`

*(Note: No `.env` is required since the API and Auth are completely mocked locally for this exercise).*

---

## Architecture Overview

I decided to go with a **Feature-Based Architecture**. Instead of grouping files by type (like putting all hooks in one folder and all screens in another), I grouped them by domain (`auth`, `communities`, `profile`, `posts`). I've found this scales much better and makes it easier to navigate as the codebase grows.

### State Management
- **Client State (Zustand):** Used for lightweight global state (like the active theme and auth token). I chose Zustand over Redux because it has way less boilerplate, and over the Context API to avoid unnecessary app-wide re-renders.
- **Server State (React Query):** Handles all the async data fetching. It automatically gives us caching, retries, and pagination (`useInfiniteQuery`), which made implementing the infinite scroll feed clean and robust.

### Data Flow & API Integration
Because there is no real backend, I built a simulated API layer using Promises and timeouts. 
- **Optimistic UI:** When a user interacts with the app (e.g., joining a community or creating a post), I use React Query's `onMutate` to instantly update the UI cache. This provides a premium, zero-latency user experience. If the mock API fails, it automatically rolls back the cache to its previous state to maintain data integrity.

### Offline Strategy & Error Handling
- **Caching:** Using `react-native-mmkv` combined with React Query's persist plugin. If you open the app without a network connection, it immediately serves the stale data from the MMKV cache instead of throwing network errors.
- **Draft Persistence:** Text inputs in the global Create Post modal are directly bound to MMKV. If a user loses connection or force-closes the app while typing, their draft is perfectly restored when they return.
- **Global Error Boundary:** The root navigator is wrapped in a custom `ErrorBoundary` component to catch any unexpected render-phase JavaScript errors, preventing a fatal crash and offering the user a recovery option.

---

## Key Decisions & Tradeoffs

1. **Storage Choice (`react-native-mmkv`):** I went with MMKV instead of `AsyncStorage` because it is completely synchronous and significantly faster. It prevents the UI flickers you typically get when reading auth tokens on app startup and makes draft auto-saving seamless.
2. **Global Post Creation Flow:** Instead of burying the "Create Post" button deep inside a community screen, I added a global `+` action on the Tab Bar. The user selects a community from a dropdown, which is strictly filtered to communities they have joined (`isJoined === true`). This prevents cross-posting, handles validation at the UI layer, and feels much more modern.
3. **Performance Awareness:** 
   - I used `React.memo` on list components (`CommunityCard`, `PostCard`) to prevent the entire feed from re-rendering when a single piece of global state changes.
   - Heavy rendering functions passed to list items are wrapped in `useCallback`.
4. **Mocking the Backend:** Rather than spinning up a quick Express server, I spent the time building a simulated API layer in-memory. This let me focus entirely on the frontend architecture, performance, and offline resilience as requested by the assignment constraints.

---

## Future Improvements
If I had a bit more time, here's what I would tackle next:
1. **E2E Testing:** Add Detox to properly test the navigation flows, optimistic rollbacks, and offline states.
2. **Micro interactions:** Micro interations using react native reanimated to give a better user experience
3. **Analytics:** Add analytics to track user behavior and engagement

---