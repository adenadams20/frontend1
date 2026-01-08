import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/img/WECCOO.jpeg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erreur lors de l'inscription");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Erreur serveur, vérifiez votre connexion.");
    }

    setLoading(false);
  };

  return (
    // ✅ scroll global autorisé
    <div className="min-h-screen bg-gray-300 flex justify-center items-start px-4 py-6 ">
      
      {/* ✅ card scrollable si écran petit */}
      <div className="w-full max-w-md bg-[#022b53] p-4 sm:p-8 rounded-xl shadow-lg ">

        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={logo} alt="WECCOO" className="w-16 h-16 rounded-full" />
          <h2 className="text-xl font-bold text-gray-100 mt-1">WECCOO</h2>
        </div>

        <h4 className="text-2xl font-bold text-white text-center mb-4">
          Inscription
        </h4>

        {error && (
          <div className="text-red-400 mb-4 text-center font-medium text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Nom complet */}
          <div>
            <label className="block text-white font-medium mb-1">
              Nom complet
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-100 border rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-100 border rounded-md"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-white font-medium mb-1">
              Téléphone
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-100 border rounded-md"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-white font-medium mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-100 border rounded-md"
            />
          </div>

          {/* Confirmation */}
          <div className="col-span-2">
            <label className="block text-white font-medium mb-1">
              Confirmation
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-100 border rounded-md"
            />
          </div>

          {/* Bouton */}
          <div className="col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              {loading ? "Création du compte..." : "S'inscrire"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-gray-100 text-sm">
          <p>
            Déjà inscrit ?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Se connecter
            </Link>
          </p>

          <p className="mt-3">
            En vous inscrivant, vous acceptez{" "}
            <Link
              to="/ConditiondUtilisation"
              className="text-blue-400 hover:underline"
            >
              nos Conditions générales, notre Politique de confidentialité
            </Link>
            .
          </p>
        </div>

      </div>
    </div>
  );
}
