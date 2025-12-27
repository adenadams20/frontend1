import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MotdepassOublier() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de la demande.");
      } else {
        setMessage("Un email de réinitialisation a été envoyé !");
      }

    } catch (err) {
      setError("Erreur de connexion au serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center px-4 ">
      
      <div className="w-full max-w-md bg-[#022b53] p-8 rounded-xl shadow-lg">

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
            className="lucide lucide-send w-9 h-10 text-white"
          >
            <path d="m22 2-7 20-4-9-9-4 20-7Z" />
            <path d="M22 2 11 13" />
          </svg>
        </div>

        <h4 className="text-2xl font-bold text-white text-center mb-6">
          Réinitialisation du mot de passe
        </h4>

        {message && (
          <p className="text-green-700 text-center mb-3 font-semibold">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-700 text-center mb-3 font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Entrez votre Email"
              required
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Réinitialiser le mot de passe"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-50">

          <p>
            Vous n’avez pas de compte ?
            <Link to="/register" className="text-blue-400 hover:underline">
              {" "}Inscrivez-vous
            </Link>
          </p>

          <p>
            Déjà inscrit ?
            <Link to="/login" className="text-blue-400 hover:underline">
              {" "}Se connecter
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}