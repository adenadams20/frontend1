import { Link } from "react-router-dom"
import React from "react";
import img from "../assets/img/WhatsApp_Image_2025-11-28_à_15.15.57_64409da9-removebg-preview.png";
import img1 from "../assets/img/WhatsApp_Image_2025-11-28_à_15.17.53_c49425cf-removebg-preview.png"
import InputField from "../components/InputField";

export default function Login() {
  return (
    
    <>
  <div className="min-h-screen  flex items-center justify-center px-6 py-12 lg:px-8 bg-blue-400 ">
    
    {/* --- Conteneur principal avec image + formulaire --- */}
      {/* IMAGE */}
      

      {/* FORMULAIRE */}
      <div className="flex flex-col bg-gray-50 rounded-2xl  shadow justify-center w-sm  p-3">
        <div className="">
          <img
          src={img1}
          alt="login illustration"
          className="w-full h-15  object-contain rounded-lg"
        />
        </div>
        <div className="text-center mt-5 ">
            <p className="text-blue-900 font-bold">Connecter vous <br /> a votre compte banckaire</p>
          </div>

        <form className="space-y-6 mt-7">
          
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <InputField
              id="email"
              name="email"
              type="email"
              required
              className=""
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <InputField
              id="password"
              name="password"
              type="password"
              required
              className=""
            />
          </div>

          <div className="flex justify-between">
            <Link
              to="/motdepasseoublier"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <div className="text-center">
            <button
            type="submit"
            className="w-40 rounded-lg bg-indigo-900 py-2 text-white font-semibold hover:bg-indigo-500"
          >
            

            <Link to="/dashboard" className="font-semibold text-indigo-600 hover:text-indigo-900">
           se connecter
          </Link>
          </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Vous n'avez pas de compte ?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-900">
            Créer un compte
          </Link>
        </p>
      </div>

      
    </div>
  
</>

  )
}
