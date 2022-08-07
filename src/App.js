import { Route, Routes, useLocation } from "react-router-dom";
import { Products } from "./pages/Products";
import { Login } from "./pages/Login";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Analytics } from "./pages/Analytics";
import { Categories } from "./pages/Categories";
import { useAuth } from "./context/authContext";
import { Loading } from "./components/Loading";
import { ProtectedRoute, ProtectedRouteAdmin } from "./utils/ProtectedRoute";

function App() {
  const { pathname } = useLocation();
  const [loadingUser] = useAuth().loadingUser;
  return (
    <>
      {loadingUser ? (
        <Loading />
      ) : (
        <>
          {pathname.includes("admin") ? <Sidebar /> : null}
          <Routes>
            <Route element={<ProtectedRouteAdmin />}>
              <Route path="/" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/categories" element={<Categories />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
