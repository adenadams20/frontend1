import { Link } from "react-router-dom";
// Import the useState hook from React to manage form state
import { useState } from "react";

export default function Login() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default browser form submission
    console.log("Form submitted with data:", formData);

    // Add your registration logic here (e.g., API call)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Registration successful! Check console for data.");
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
          Connexion
        </h4>

        {/* Use onSubmit on the form tag */}
        <form id="formulaire" onSubmit={handleSubmit}>


          <div className="mb-4">
            {/* Standardized 'htmlFor', 'id', and 'name' */}
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            {/* Standardized 'htmlFor', 'id', and 'name' to 'password' */}
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

            <p className="text-right mb-2">
            
            {/* Use the imported React Router Link component for navigation */}
            <Link to="/motdepassoublier" className="text-blue-600 hover:underline">
             mot de passe oublié ? 
            </Link>
          </p>
          
        

          <button
            type="submit"
            id="envoyerbtn"
            className="w-full bg-[#312c85] text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          <p>
            Vous n’avez pas de compte ? 
            {/* Use the imported React Router Link component for navigation */}
            <Link to="/register" className="text-blue-600 hover:underline">
             Inscrivez vous
            </Link>
          </p>


        </div>
      </div>
    </div>
  );
}
  