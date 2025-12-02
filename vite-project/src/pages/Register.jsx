import React from 'react'
import { Link } from "react-router-dom";

export default function Register() {

  // Function to handle form submission (optional, but good practice in React)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Form submitted!");
  };

  return (
    <div className="min-h-screen sm:pt-20 bg-[#312c85]  border-y-5 border-purple-400 ">
      <div className="max-w-md mx-auto  bg-purple-200  p-8 rounded-xl shadow-lg d-flex justify-center items-center">
        <div className="flex justify-center mb-4 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send w-6 h-6 text-blue-700" aria-hidden="true"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
        </div>
        
        <h4 className="text-2xl font-bold text-[#312c85] text-center mb-6">Inscription</h4>

        {/* Use onSubmit on the form tag and htmlFor for labels */}
        <form id="formulaire" onSubmit={handleSubmit} >
          <div className="mb-4">
            <label htmlFor="Nom" className="block text-gray-700 font-medium mb-2">Nom complet</label>
            <input 
              type="text" 
              id="fullname" 
              name="fullname" 
              placeholder="Entrez votre Prenom et votre Nom" 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500" 
            />
          </div>
      
          <div className="mb-4">
            <label htmlFor="Email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="Email" 
              name="Email" // Changed name to match the field purpose
              placeholder="Entrez votre Email" 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500" 
            />
          </div>


              <div className="mb-4">
            {/* Note: The 'name' attribute here was "Competence" in the original, but the label says "Mot de passe". I've corrected the label text for clarity. */}
            <label htmlFor="Password" className="block text-gray-700 font-medium mb-2">Mot de passe</label>
            <input 
              type="password" 
              id="Password" 
              name="Password" // Changed name to match the field purpose
              placeholder="Entrez votre mot de passe" 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500" 
            />
          </div>



          
              <div className="mb-4">
            {/* Note: The 'name' attribute here was "Competence" in the original, but the label says "Mot de passe". I've corrected the label text for clarity. */}
            <label htmlFor="Password" className="block text-gray-700 font-medium mb-2">Confirmation</label>
            <input 
              type="password" 
              id="Password" 
              name="Password" // Changed name to match the field purpose
              placeholder="Confirmez votre mot de passe" 
              required 
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500" 
            />
          </div>


          
          <button 
            type="submit" 
            id="envoyerbtn" 
            className="w-full bg-[#312c85] text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            S'inscrire
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          <p>
            Déjà inscrit ? 
            {/* Use the imported React Router Link component for navigation */}
            <Link to="/login" className="text-blue-600 hover:underline">
              Se connecter
            </Link>

          <br/>
          <br/>
        <p classname="text-center ">
         En vous inscrivant, vous acceptez  
         
        <Link to="/conditiondutilisation" className="text-blue-600 hover:underline"> 
          nos Conditions générales, notre Politique de confidentialité
         </Link>

          et notre Politique d’utilisation des cookies.
        </p>
          </p>
        </div>

      </div>
    </div>
  );
}
