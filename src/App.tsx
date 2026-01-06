import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import LoginPage from "./features/auth/LoginPage";
import { TodoList } from "./features/todos/component/TodoList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/todos" element={<TodoList />} />
    </Routes>
  );
}
