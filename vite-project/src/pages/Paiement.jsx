import React, { useState } from "react";
import { FaDroplet } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { PiDeviceMobileCamera } from "react-icons/pi";
import Button from "../components/Button";
import InputField from "../components/InputField";



export default function Paiement() {
  const [activeTab, setActiveTab] = useState("eau");

  const tabs = [
  { id: "eau", label: "Eau", icon: FaDroplet },  // ✅ utiliser WaterDropIcon ici aussi
  { id: "electricite", label: "Électricité", icon: MdElectricBolt  },
  { id: "internet", label: "Internet", icon: FaWifi },
  { id: "mobile", label: "Mobile", icon: PiDeviceMobileCamera },
];



  return (
    <div className="w-full mt-15 bg-gray-100 p-2">
      {/* --- TABS CARDS --- */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tabs.map((t) => (
          <li
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`cursor-pointer text-center shadow-2xl p-5 w-full rounded-xl   
              flex flex-col items-center gap-2
              transition duration-200
              ${
                activeTab === t.id
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <t.icon className="w-8 h-8" />
            <span className="font-semibold">{t.label}</span>
          </li>
        ))}
      </ul>

      {/* --- CONTENT --- */}
      <div className="mt-6 p-5 rounded-xl ">
        {activeTab === "eau" && (
          <div className=" py-4">
            <h4 className="font-bold text-lg mb-4">Détails du paiement</h4>

            <div className="flex flex-col md:flex-row gap-6 p-4 w-full">

              {/* FORMULAIRE */}
              <div className="md:w-2/3 w-full shadow p-4 bg-white rounded-lg">
                <form>
                    <h4>Payer depuis</h4>
                  
                  <div className="mt-4">
                    <select
                      name=""
                      className="p-3 w-full  "
                      id="eau"
                    >
                      <option className="rounded border shadow-2xl bg-white">Choisir un service</option>
                      <option selected>Eau</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label>Référence / Fournisseur</label>
                    <InputField  />
                  </div>

                  <div className="mt-4">
                    <label>Montant</label>
                    <InputField
                      type="number"
                      
                      placeholder="F"
                    />
                  </div>

                  <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded-lg w-full">
                    Payer maintenant
                  </Button>
                </form>
              </div>

              {/* RÉCAP */}
              <div className="md:w-1/3 w-full bg-white shadow-2xl p-4 rounded-lg">
                <p className="font-semibold mb-4">Récapitulatif</p>

                <div className="flex justify-between mb-2">
                  <span>Montant</span>
                  <span>F</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Frais de service</span>
                  <span className="text-green-500">Gratuit</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>F</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "electricite" && (

          <div className=" py-4">
            <h4 className="font-bold text-lg mb-4">Détails du paiement</h4>

            <div className="flex flex-col md:flex-row gap-6 p-4 w-full">

              {/* FORMULAIRE */}
              <div className="md:w-2/3 w-full  shadow-2xl p-4 bg-white rounded-lg">
              
                <form>
                  <h4>Payer depuis</h4>
                  <div className="mt-4">
                    <select
                      name=""
                      className="p-3 w-full  rounded-2xl"
                      id=""
                    >
                      <option >Choisir un service</option>
                      <option selected="selected">electricite</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label>Référence / Fournisseur</label>
                    <InputField type="text" className="w-full mt-2  rounded p-2" />
                  </div>

                  <div className="mt-4">
                    <label>Montant</label>
                    <InputField
                      type="number"
                      placeholder="F"
                    />
                  </div>

                  <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded-lg w-full">
                    Payer maintenant
                  </Button>
                </form>
              </div>

              {/* RÉCAP */}
              <div className="md:w-1/3 w-full bg-white shadow-2xl p-4 rounded-lg">
                <p className="font-semibold mb-4">Récapitulatif</p>

                <div className="flex justify-between mb-2">
                  <span>Montant</span>
                  <span>F</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Frais de service</span>
                  <span className="text-green-500">Gratuit</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>F</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "internet" && (
          <div className=" py-4">
            <h4 className="font-bold text-lg mb-4">Détails du paiement</h4>

            <div className="flex flex-col md:flex-row gap-6 p-4 w-full">

              {/* FORMULAIRE */}
              <div className="md:w-2/3 w-full  shadow-2xl p-4 bg-white rounded-lg">
                <form>
                  <h4>Payer depuis</h4>
                  <div className="mt-4">
                    <select
                      name=""
                      className="p-3 w-full rounded-2xl"
                      id=""
                    >
                      <option selected="Choisir un service">Choisir un service</option>
                      <option value="" selected="">internet</option>
                    </select>
                  </div>

                  <div className="mt-4 ">
                    <label>Référence / Fournisseur</label>
                    <input type="text" className="w-full mt-2 border rounded p-2" />
                  </div>

                  <div className="mt-4">
                    <label>Montant</label>
                    <InputField
                      type="number"
                      
                      className=" placeholder: text-end "
                      placeholder="XOF"
                    />
                  </div>

                  <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded-lg w-full">
                    Payer maintenant
                  </Button>
                </form>
              </div>

              {/* RÉCAP */}
              <div className="md:w-1/3 w-full bg-white shadow-2xl p-4 rounded-lg">
                <p className="font-semibold mb-4">Récapitulatif</p>

                <div className="flex justify-between mb-2">
                  <span>Montant</span>
                  <span>F</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Frais de service</span>
                  <span className="text-green-500">Gratuit</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>F</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "mobile" && (
<div className=" py-4">
            <h4 className="font-bold text-lg mb-4">Détails du paiement</h4>

            <div className="flex flex-col md:flex-row gap-6 p-4 w-full">

              {/* FORMULAIRE */}
              <div className="md:w-2/3 w-full  shadow-2xl p-4 bg-white rounded-lg">
                <form>
                  <h4>Payer depuis</h4>
                  <div className="mt-4">
                    <select
                      name=""
                      className="p-3 w-full border rounded-2xl"
                      id=""
                    >
                      <option selected>Choisir un service</option>
                      <option selected="selected">mobile</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label>Référence / Fournisseur</label>
                    <InputField type="text" className="w-full mt-2 border rounded p-2" />
                  </div>

                  <div className="mt-4">
                    <label>Montant</label>
                    <InputField
                      type="number"
                      placeholder="F"
                    />
                  </div>

                  <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded-lg w-full">
                    Payer maintenant
                  </Button>
                </form>
              </div>

              {/* RÉCAP */}
              <div className="md:w-1/3 w-full bg-white shadow-2xl p-4 rounded">
                <p className="font-semibold mb-4">Récapitulatif</p>

                <div className="flex justify-between mb-2">
                  <span>Montant</span>
                  <span>F</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Frais de service</span>
                  <span className="text-green-500">Gratuit</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>F</span>
                </div>
              </div>

            </div>
          </div>      
        
        )}
      </div>
    </div>
  );
}
