import { useState } from "react";
import Button from "../components/Button";

export default function Transfer() {
  const [tab, setTab] = useState("interne");

  return (
    <div className="max-w-3xl mx-auto">
      {/* Titre */}
      <h1 className="text-3xl font-bold mb-2">Transfert d'argent</h1>
      <p className="text-gray-600 mb-6">
        Effectuez un transfert entre vos comptes ou vers un bénéficiaire
      </p>

      {/* Onglets */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        <Button
          className={`pb-2 ${
            tab === "interne"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setTab("interne")}
        >
          Transfert interne
        </Button>

        <Button
          className={`pb-2 ${
            tab === "externe"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setTab("externe")}
        >
          Transfert externe
        </Button>
      </div>

      {/* --------------------------------------------- */}
      {/*        FORMULAIRE TRANSFERT INTERNE           */}
      {/* --------------------------------------------- */}

      {tab === "interne" && (
        <div className="space-y-4">
          {/* Depuis le compte */}
          <div>
            <label className="font-medium text-gray-700">Depuis le compte</label>
            <div className="mt-1 p-3 border rounded-lg bg-gray-50">
              Compte Courant (**** 1234) - 12 458,5 €
            </div>
          </div>

          {/* Vers le compte */}
          <div>
            <label className="font-medium text-gray-700">Vers le compte</label>
            <select className="mt-1 w-full p-3 border rounded-lg bg-white">
              <option>Sélectionner un compte</option>
              <option>Compte Épargne (**** 5678)</option>
              <option>Compte Joint (**** 3322)</option>
            </select>
          </div>

          {/* Montant */}
          <div>
            <label className="font-medium text-gray-700">Montant</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                placeholder="0.00"
              />
              <span className="text-gray-700">€</span>
            </div>

            {/* Boutons rapides */}
            <div className="flex gap-2 mt-2">
              {[50, 100, 200, 500].map((value) => (
                <Button
                  key={value}
                  className="px-3 py-2 border rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                  {value}€
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-gray-700">
              Description (optionnel)
            </label>
            <textarea
              className="w-full mt-1 p-3 border rounded-lg"
              placeholder="Ajoutez une note..."
            />
          </div>

          {/* Bouton */}
          <Button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold mt-4 hover:bg-blue-700">
            Effectuer le transfert
          </Button>
        </div>
      )}

      {/* --------------------------------------------- */}
      {/*        FORMULAIRE TRANSFERT EXTERNE           */}
      {/* --------------------------------------------- */}

      {tab === "externe" && (
        <div className="space-y-4">
          {/* Depuis le compte */}
          <div>
            <label className="font-medium text-gray-700">Depuis le compte</label>
            <div className="mt-1 p-3 border rounded-lg bg-gray-50">
              Compte Courant (**** 1234) - 12 458,5 €
            </div>
          </div>

          {/* Bénéficiaire */}
          <div>
            <label className="font-medium text-gray-700">Bénéficiaire</label>
            <input
              type="text"
              placeholder="Nom du bénéficiaire ou IBAN"
              className="mt-1 w-full p-3 border rounded-lg"
            />
          </div>

          {/* Montant */}
          <div>
            <label className="font-medium text-gray-700">Montant</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                placeholder="0.00"
              />
              <span className="text-gray-700">€</span>
            </div>

            <div className="flex gap-2 mt-2">
              {[50, 100, 200, 500].map((value) => (
                <Button
                  key={value}
                  className="px-3 py-2 border rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                  {value}F
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-gray-700">
              Description (optionnel)
            </label>
            <textarea
              className="w-full mt-1 p-3 border rounded-lg"
              placeholder="Ajoutez une note..."
            />
          </div>

          {/* Bouton */}
          <Button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold mt-4 hover:bg-blue-700">
            Effectuer le transfert
          </Button>

          {/* --------------------------------------------- */}
          {/*      CONTACTS RÉCENTS                         */}
          {/* --------------------------------------------- */}

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Contacts récents</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { initials: "MD", name: "Marie Dubois", email: "marie.d@email.com" },
                { initials: "PM", name: "Pierre Martin", email: "pierre.m@email.com" },
                { initials: "SB", name: "Sophie Bernard", email: "sophie.b@email.com" },
                { initials: "LP", name: "Lucas Petit", email: "lucas.p@email.com" },
              ].map((contact) => (
                <div
                  key={contact.email}
                  className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {contact.initials}
                  </div>

                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-sm mt-4">
              💡 Les transferts externes peuvent prendre jusqu'à 24 heures selon la
              banque du bénéficiaire.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
