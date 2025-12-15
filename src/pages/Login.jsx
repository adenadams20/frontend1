import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";//ajouter


export default function Login() {
  const navigate = useNavigate();

   const { login } = useAuth(); // ⬅️ on vient chercher login() du contexte

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); //ajouter


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
      const res = await fetch("http://localhost:5000/api/auth/login", {
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

      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));
      
       // ✅ on informe le contexte qu'on est connecté
      // data.token et data.user viennent du backend
      login(data.token, data.user);

      navigate("/dashboard");

      // ✅ Forcer un rechargement pour que Navbar relise le token
      // window.location.reload();


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

        <h4 className="text-2xl font-bold text-[#312c85] text-center mb-6">
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
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre Email"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
    Mot de passe
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}   // 👈 ici
      id="password"
      name="password"
      placeholder="Entrez votre mot de passe"
      required
      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 pr-10"
      value={form.password}
      onChange={handleChange}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
</div>


          <p className="text-right mb-2">
            <Link to="/motdepassOublier" className="text-blue-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-[#312c85] text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
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