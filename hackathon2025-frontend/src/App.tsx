import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoadingPage from "./routes/loading-page"
import RootPage from "./routes/root-page"
import ErrorPage from "./routes/error-page"
import { rootLoader } from "./functions/loaders"
import { chatAction } from "./functions/actions"
import ChatUI from "./components/chat-ui"

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
        <Route errorElement={<ErrorPage />}>
          <Route index element={<ChatUI />} action={chatAction} />
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App



