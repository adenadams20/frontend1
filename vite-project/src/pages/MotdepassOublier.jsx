import React from 'react'
import { Link } from 'react-router-dom'

export default function MotdepassOubler() {
  return (
    <div className=''>
        <h1 className='text-center text-2xl'>veuilez reinitialiser votre mot de passe</h1>
        <div className='p-3 mt-10 bg-white shadow-2xl w-auto mx-40'>
            <form action="submit">
              <div>    
                    <label htmlFor="email">Email:</label>
             </div>
             <div>
                <input type="email" id="email" className='bg-gray-300 mt-2 w-full py-1.5 rounded-md' name="email" required />

             </div>
               <div className='flex justify-center mt-5'>
                 <button type="submit" className='bg-indigo-900 px-3 py-1.5 rounded-md text-white'>Envoyer</button>
               </div>
            </form>
            <p><Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 mt-8">
              Retour à la connexion
            </Link></p>
        </div>
    </div>
  )
}
