import { Link } from "react-router-dom"
import React from "react";
import img from "../assets/img/WhatsApp_Image_2025-11-28_à_15.15.57_64409da9-removebg-preview.png";
import img1 from "../assets/img/WhatsApp_Image_2025-11-28_à_15.17.53_c49425cf-removebg-preview.png"


export default function Login() {
  return (
    
    <>
  <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50 ">
    
    {/* --- Conteneur principal avec image + formulaire --- */}
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full mx-auto p-8 bg-gray-50   rounded-lg">
      {/* IMAGE */}
      <div className="flex items-center  justify-center " >
        <img
          src={img}
          alt="login illustration"
          className="w-full h-100  object-contain rounded-lg"
        />
      </div>

      {/* FORMULAIRE */}
      <div className="flex flex-col justify-center w-sm  p-3">
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
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-md border-gray-300 px-3 text-white py-2 bg-blue-900 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 hover:bg-blue-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-md border-gray-300 px-3 bg-blue-900 text-white py-2 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
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
  </div>
</>

  )
}
