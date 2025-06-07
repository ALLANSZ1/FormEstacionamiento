import { useState, useEffect } from "react";
import type { Dispatch, ChangeEvent, FormEvent } from "react";
import { categories } from "../data/categories";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducers";
import { UserIcon, IdentificationIcon, KeyIcon } from '@heroicons/react/24/outline';

// Animación simple con Tailwind
const inputAnim = "transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:scale-105";

const initialState = {
    id: '',
    category: 0,
    name: "",
    calories: "" as string | number,
};

type FormProps = {
    dispatch: Dispatch<ActivityActions>;
    state: ActivityState;
};

export default function Form({ dispatch, state }: FormProps) {
    const [activity, setActivity] = useState(initialState);
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.find(
                activity => activity.id === state.activeId
            ) || initialState;
            setActivity(selectedActivity);
        }
    }, [state.activeId, state.activities]);

    const handleChange = (
        e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => {
        const { id, value } = e.target;
        setActivity({ ...activity, [id]: id === "category" ? +value : value });
    };

    const isValidActivity = () => {
        return activity.category !== 0 && 
               activity.name.trim() !== "" && 
               activity.calories.toString().trim() !== "";
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidActivity() || apellido.trim() === "" || telefono.trim() === "") {
            console.error("❌ Error: Datos incompletos o inválidos", activity, apellido, telefono);
            return;
        }
        // Enviar a backend
        try {
            const res = await fetch("/api/clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: activity.name,
                    apellido,
                    telefono
                })
            });
            if (res.ok) {
                const data = await res.json();
                console.log("✅ Guardado en base de datos:", data);
                // Mostrar mensaje en terminal del backend
                fetch('/api/clients/log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre: activity.name, apellido, telefono })
                });
            } else {
                const err = await res.json();
                console.error("❌ Error al guardar en base de datos:", err);
            }
        } catch (err) {
            console.error("❌ Error de red:", err);
        }
        dispatch({
            type: "save-activity",
            payload: { newActivity: { ...activity, calories: activity.calories.toString() } },
        });
        setActivity(initialState);
        setApellido("");
        setTelefono("");
    };

    return (
        <form 
            className="space-y-8 bg-gradient-to-br from-blue-100 to-blue-300 shadow-2xl p-10 rounded-2xl animate-fade-in"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-5">
                <label htmlFor="category" className="font-bold flex items-center gap-2 text-blue-900">
                    <KeyIcon className="h-6 w-6 text-blue-500 animate-bounce" /> Servicio:
                </label>
                <select
                    id="category"
                    className={`border border-blue-300 p-3 rounded-xl w-full bg-white ${inputAnim}`}
                    value={activity.category}
                    onChange={handleChange}
                >
                    <option value={0}>-- Seleccionar --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-5">
                <label htmlFor="name" className="font-bold flex items-center gap-2 text-blue-900">
                    <UserIcon className="h-6 w-6 text-blue-500 animate-pulse" /> Cliente:
                </label>
                <input
                    id="name"
                    type="text"
                    className={`border border-blue-300 p-3 rounded-xl ${inputAnim}`}
                    placeholder="Nombre del cliente"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-5">
                <label htmlFor="apellido" className="font-bold flex items-center gap-2 text-blue-900">
                    <UserIcon className="h-6 w-6 text-blue-500 animate-pulse" /> Apellido:
                </label>
                <input
                    id="apellido"
                    type="text"
                    className={`border border-blue-300 p-3 rounded-xl ${inputAnim}`}
                    placeholder="Apellido del cliente"
                    value={apellido}
                    onChange={e => setApellido(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-5">
                <label htmlFor="calories" className="font-bold flex items-center gap-2 text-blue-900">
                    <IdentificationIcon className="h-6 w-6 text-blue-500 animate-spin" /> Placas:
                </label>
                <input
                    id="calories"
                    type="text"
                    className={`border border-blue-300 p-3 rounded-xl ${inputAnim}`}
                    placeholder="Placas del Vehículo"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-5">
                <label htmlFor="telefono" className="font-bold flex items-center gap-2 text-blue-900">
                    <IdentificationIcon className="h-6 w-6 text-blue-500 animate-spin" /> Teléfono:
                </label>
                <input
                    id="telefono"
                    type="text"
                    className={`border border-blue-300 p-3 rounded-xl ${inputAnim}`}
                    placeholder="Teléfono del cliente"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-700 hover:bg-blue-900 w-full p-3 font-bold uppercase text-white cursor-pointer rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-30"
                value={
                    activity.category === 1 ? "Guardar Estacionamiento" :
                    activity.category === 2 ? "Guardar Pensión" :
                    "Guardar Servicio"
                }
                disabled={!isValidActivity()}
            />
        </form>
    );
}