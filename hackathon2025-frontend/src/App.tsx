import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import ChatUI from "./components/chat-ui"

import './App.css'
import RootPage from "./routes/root-page"
import ErrorPage from "./routes/error-page"
import LoadingPage from "./routes/loading-page"
import { chatAction } from "./functions/actions"
import { chatUILoader, rootLoader } from "./functions/loaders"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        hydrateFallbackElement={<LoadingPage />}
        element={<RootPage />}
        loader={rootLoader}
        errorElement={<ErrorPage />}
      >
        <Route index element={<ChatUI />} action={chatAction} loader={chatUILoader} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App



