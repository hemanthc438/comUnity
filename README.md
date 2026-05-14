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

I decided to go with a **Feature-Based Architecture**. Instead of grouping files by type (like putting all hooks in one folder and all screens in another), I grouped them by domain (`auth`, `communities`, `profile`). I've found this scales much better and makes it easier to navigate as the codebase grows.

### State Management
- **Client State (Zustand):** Used for lightweight global state (like the active theme and auth token). I chose Zustand over Redux because it has way less boilerplate, and over the Context API to avoid unnecessary app-wide re-renders.
- **Server State (React Query):** Handles all the async data fetching. It automatically gives us caching, retries, and pagination (`useInfiniteQuery`), which made implementing the infinite scroll feed a lot cleaner.

### Offline Strategy
- Used `react-native-mmkv` combined with React Query's persist plugin. 
- When the app fetches communities, the data is instantly written to MMKV. If you open the app without a network connection, it immediately serves the stale data from cache instead of throwing network errors or showing an empty screen.
- *Note on mutations:* Offline actions (like joining a community) queue locally and optimistically update the UI, syncing when the connection returns.

---

## Tradeoffs & Decisions

1. **Storage Choice (`react-native-mmkv`):** I went with MMKV instead of `AsyncStorage` because it's synchronous and significantly faster. It prevents the UI flickers you sometimes get when reading auth tokens on app startup.
2. **Mocking the Backend:** Instead of spinning up a quick Node/Express server, I spent the time building a simulated API layer with artificial network delays using Promises. This let me focus entirely on the frontend architecture and React Native performance.
3. **Animations:** I stuck with React Native's native `Animated` API for the onboarding animations instead of pulling in `react-native-reanimated`. Given the time constraints, it was safer to avoid the extra Babel config and native build times, and the native driver handles these simple animations perfectly at 60fps.

---

## Future Improvements
If I had a bit more time, here's what I'd tackle next:
1. **E2E Testing:** Add Detox to properly test the navigation flows and offline states.
2. **Queue Management:** Build a more robust SQLite-backed offline queue for conflict resolution if multiple offline posts are created simultaneously.
3. **Accessibility:** Do a proper pass with VoiceOver/TalkBack and add appropriate ARIA roles to custom UI components.

---

## Commit History Notes
For context on how the app was built step-by-step:

1. **Setup:** Bootstrapped bare React Native CLI (`75eb72b`)
2. **Dependencies:** Installed React Navigation, React Query, Zustand, MMKV (`da9929b`)
3. **Theming:** Added a scalable Light/Dark mode system backed by MMKV and a custom `useTheme` hook (`523a200`)
4. **Auth Flow:** Mocked the login flow, added Zustand session management, and set up the conditional Root Navigator (`0af8ad4`)
5. **Onboarding:** Built the initial onboarding screens with native animations (`1c207e0`)