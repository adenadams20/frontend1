import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangementMdp() {

  const navigate = useNavigate();
  const { token } = useParams(); // token depuis le lien email

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Vérification du token dès le montage
  useEffect(() => {
    if (!token) {
      setError("Lien invalide ou manquant.");
    }
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.password || !form.confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!token) {
      setError("Token manquant !");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/ChangementMdp/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Lien invalide ou expiré");
        setLoading(false);
        return;
      }

      setSuccess("Mot de passe modifié avec succès ✅");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#312c85] flex justify-center items-center px-4">
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
          Réinitialiser le mot de passe
        </h4>

        {error && <div className="text-red-700 text-center mb-4 font-medium">{error}</div>}
        {success && <div className="text-green-700 text-center mb-4 font-medium">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nouveau mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Nouveau mot de passe"
              className="w-full px-4 py-2 border rounded-md"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              className="w-full px-4 py-2 border rounded-md"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#312c85] text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading || !token}
          >
            {loading ? "Modification..." : "Changer le mot de passe"}
          </button>
        </form>
      </div>
    </div>
  );
}
