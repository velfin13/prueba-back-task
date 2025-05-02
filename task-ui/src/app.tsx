import { Routes as RoutesEnum } from "@/models";
import { Layout, NotFoundPage, TaskPage } from "@/pages";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/auth/auth.page";
import { PublicRoute } from "@/components";


function App() {
  return (
    <>
      <Routes>
        <Route path={RoutesEnum.AUTH} element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } />

        <Route path={RoutesEnum.TASK} element={<Layout />}>
          <Route index element={<TaskPage />} />
        </Route>

        <Route path="/" element={<Navigate to={RoutesEnum.AUTH} replace />} />

        <Route path={RoutesEnum.NOT_FOUND} element={<NotFoundPage />} />
        <Route path={RoutesEnum.ALL} element={<Navigate replace to={RoutesEnum.NOT_FOUND} />} />
      </Routes>

      <Toaster
        toastOptions={{
          position: "top-right",
        }}
      />
    </>
  );
}



export default App;
