import { useEffect, useState } from "react";
import { useLogin } from "./hooks";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (login.isSuccess) {
      navigate("/todos");
    }
  }, [login.isSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate({ email, password });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-indigo-950 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 p-6 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-blue-500/30 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-blue-400 mb-2">Login Page</h1>

        <div className="space-y-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Masukan Email Anda"
            className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white focus:outline-none"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Masukan Password Anda"
            className="w-full px-4 py-3 bg-slate-900/50 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white focus:outline-none"
          />
        </div>

        <button
          disabled={login.isPending}
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          {login.isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
