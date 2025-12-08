import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const res = await fetch("http://localhost:3000/auth/login", {
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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (err) {
      setError("Erreur de connexion au serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#312c85] flex justify-center items-center px-4  border-y-5 border-purple-400">

      <div className="w-full max-w-md bg-purple-200 p-6 sm:p-8 rounded-xl shadow-lg">
        
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
            className="lucide lucide-send w-6 h-6 text-blue-700"
          >
            <path d="m22 2-7 20-4-9-9-4 20-7Z" />
            <path d="M22 2 11 13" />
          </svg>
        </div>
        <div className="text-center mt-5 ">
            <p className="text-blue-900 font-bold">Connecter vous <br /> a votre compte banckaire</p>
          </div>

        <h4 className="text-2xl font-bold text-blue-900 text-center mb-6">
          Connexion
        </h4>

        {error && (
          <div className="text-red-700 text-center mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <InputField
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre Email"
              required
              className="w-full px-4 py-2  rounded-md focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Mot de passe
            </label>
            <InputField
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              required
              className="w-full px-4 py-2  rounded-md focus:ring-blue-500"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <p className="text-right mb-2">
            <Link to="/motdepassoublier" className="text-blue-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </p>

          <Button
            type="submit"
            className="w-full  text-white py-2 rounded-md  transition"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          <p>
            Vous n’avez pas de compte ?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
