import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";//ajouter


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
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false); //ajouter


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // validations rapides
    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
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

      // stocker token + infos user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirection après succès
      navigate("/dashboard");

    } catch (err) {
      setError("Erreur serveur, vérifiez votre connexion.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center px-4  ">
  
  <div className="w-full max-w-md bg-[#022b53] p-6 sm:p-8 rounded-xl shadow-lg">

    {/* Icon */}
    <div className="flex justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="lucide lucide-send w-9 h-10 text-white">
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
        <path d="m21.854 2.147-10.94 10.939"></path>
      </svg>
    </div>

    <h4 className="text-2xl font-bold text-white text-center mb-6">Inscription</h4>

    {error && (
      <div className="text-red-700 mb-4 text-center font-medium text-sm sm:text-base">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      {/* Nom complet */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-1 sm:mb-2">Nom complet</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Entrez votre prénom et nom"
          required
          className="w-full px-3 py-2 bg-gray-100 border rounded-md text-sm sm:text-base"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-1 sm:mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Entrez votre email"
          required
          className="w-full px-3 py-2 border bg-gray-100 rounded-md text-sm sm:text-base"
        />
      </div>

      {/* Téléphone */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-1 sm:mb-2">Téléphone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Entrez votre numéro"
          className="w-full px-3 py-2 border bg-gray-100 rounded-md text-sm sm:text-base"
        />
      </div>

      {/* Mot de passe */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-1 sm:mb-2">Mot de passe</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe"
          required
          className="w-full px-3 py-2 border bg-gray-100 rounded-md text-sm sm:text-base"
        />
      </div>

      {/* Confirmation */}
      <div className="mb-4">
        <label className="block text-white font-medium mb-1 sm:mb-2">Confirmation</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmez votre mot de passe"
          required
          className="w-full px-3 py-2 border bg-gray-100 rounded-md text-sm sm:text-base"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-gray-900 transition text-sm sm:text-base"
        disabled={loading}
      >
        {loading ? "Création du compte..." : "S'inscrire"}
      </button>
    </form>

    <div className="text-center mt-6 text-gray-100 text-sm sm:text-base">
      <p>
        Déjà inscrit ?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Se connecter
        </Link>
      </p>

      <br />

      <p>
        En vous inscrivant, vous acceptez{" "}
        <Link to="/ConditiondUtilisation" className="text-blue-400 hover:underline">
          nos Conditions générales, notre Politique de confidentialité
        </Link>{" "}
        et notre Politique d’utilisation des cookies.
      </p>
    </div>

  </div>
</div>

  );
}