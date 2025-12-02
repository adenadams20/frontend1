import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MotdepassOublier() {

  // State pour le formulaire
  const [formData, setFormData] = useState({
    email: "",
  });

  // Mise à jour du champ
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    if (!formData.email) {
      alert("Veuillez entrer un email !");
      return;
    }

    alert("Email de réinitialisation envoyé !");
  };

  return (
    <div className="min-h-screen pt-30 bg-[#312c85] border-y-5 border-purple-400">
      <div className="max-w-md mx-auto bg-purple-200 p-8 mt-20 rounded-xl shadow-lg ">
                <div className="flex justify-center mb-4 ">
          {/* Using a descriptive ARIA label for accessibility */}
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
            aria-label="Send icon"
          >
            {/* SVG paths were slightly incorrect in original source, using correct standard paths here for a 'Send' icon */}
            <path d="m22 2-7 20-4-9-9-4 20-7Z" />
            <path d="M22 2 11 13" />
          </svg>
        </div>

        <h4 className="text-2xl font-bold text-[#312c85] text-center mb-6">
          Réinitialisation du mot de passe
        </h4>

        <form id="formulaire" onSubmit={handleSubmit}>
          <div className="mb-4">

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre Email"
              required
              className="w-full px-4 py-2 border rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            id="envoyerbtn"
            className="w-full bg-[#312c85] text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Réinitialiser le mot de passe
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          <p>
            Vous n’avez pas de compte ? 
            <Link to="/register" className="text-blue-600 hover:underline">
              Inscrivez-vous
            </Link>
          </p>

          <p>
            Déjà inscrit ? 
            <Link to="/login" className="text-blue-600 hover:underline">
              Se connecter
            </Link>
          </p>  
        </div>
      </div>
    </div>
  );
}
