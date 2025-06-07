import { Dispatch } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import type { ActivityActions } from "../reducers/activity-reducers";

type ActivityListProps = {
    activities: Activity[];
    dispatch: Dispatch<ActivityActions>;
};

export default function ActivityList({ activities, dispatch }: ActivityListProps) {
    // Helper para nombre de categoría
    const categoryName = (category: Activity['category']) =>
        categories.find(cat => cat.id === category)?.name || '';

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center my-10 flex items-center justify-center gap-3 animate-fade-in-down">
                <UserIcon className="h-10 w-10 text-blue-500 animate-bounce" />
                Clientes y Servicios
            </h2>

            {activities.length === 0 ? (
                <p className="text-center my-5 text-gray-500 animate-fade-in">No hay registros aún...</p>
            ) : (
                activities.map((activity, idx) => (
                    <div
                        key={activity.id}
                        className={`px-5 py-10 bg-gradient-to-r from-blue-100 to-blue-200 mt-5 flex justify-between shadow-2xl rounded-2xl border-l-8 ${activity.category === 1 ? 'border-lime-500' : 'border-orange-500'} animate-slide-in-${idx % 2 === 0 ? 'left' : 'right'}`}
                    >
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-xl shadow-lg flex items-center gap-2 ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"} animate-bounce`}
                            >
                                {activity.category === 1 ? <ArrowDownCircleIcon className="h-6 w-6 text-white animate-spin" /> : <ArrowUpCircleIcon className="h-6 w-6 text-white animate-spin" />}
                                {categoryName(activity.category)}
                            </p>
                            <p className="text-2xl font-bold pt-5 text-blue-900 animate-fade-in">{activity.name}</p>
                            <p className="font-black text-4xl text-lime-500 animate-fade-in-up">
                                Placas del Vehículo
                                <span className="text-sm text-gray-500 ml-2">{activity.calories || '0'}</span>
                            </p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button
                                onClick={() => dispatch({
                                    type: "set-activeId",
                                    payload: { id: activity.id }
                                })}
                                className="transition-transform duration-300 hover:scale-125"
                            >
                                <PencilSquareIcon className="h-6 w-6 text-blue-700 animate-pulse" />
                            </button>
                            <button
                                onClick={() => dispatch({
                                    type: "delete-activity",
                                    payload: { id: activity.id }
                                })}
                                className="transition-transform duration-300 hover:scale-125"
                            >
                                <XCircleIcon className="h-6 w-6 text-red-500 animate-pulse" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}