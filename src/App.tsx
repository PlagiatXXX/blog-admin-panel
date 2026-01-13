import { Route, Routes } from "react-router-dom";
import { PermanentLayout } from "./layouts/PermanentLayout";
import { Dashboard } from "./pages/Dashboard";
import { Posts } from "./pages/Posts";
import { Users } from "./pages/Users";
import { Comments } from "./pages/Comments";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PostFormPage } from "./pages/PostFormPage";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<PermanentLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/posts">
            <Route index element={<Posts />} />
            <Route path="new" element={<PostFormPage />} />
            <Route path="edit/:id" element={<PostFormPage />} />
          </Route>
          <Route path="/users" element={<Users />} />
          <Route path="/comments" element={<Comments />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
