import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_URL } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Identifiants incorrects");
        setLoading(false);
        return;
      }

      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-[#022b53] p-6 sm:p-8 rounded-xl shadow-lg">
        
        {/* Icône */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="m22 2-7 20-4-9-9-4 20-7Z" />
            <path d="M22 2 11 13" />
          </svg>
        </div>

        <h4 className="text-2xl font-bold text-white text-center mb-6">
          Connexion
        </h4>

        {error && (
          <div className="text-red-500 text-center mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Entrez votre email"
              className="w-full px-4 py-2 rounded-md bg-gray-100"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">
              Mot de passe
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Entrez votre mot de passe"
                className="w-full px-4 py-2 rounded-md bg-gray-100 pr-10"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <p className="text-right mb-3">
            <Link to="/motdepassOublier" className="text-blue-400 hover:underline">
              Mot de passe oublié ?
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="text-center mt-6 text-white">
          <p>
            Vous n’avez pas de compte ?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
