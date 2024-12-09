import { useEffect, useState } from "react";
import Tarea from "./components/Tarea";
import CrearTarea from "./components/CrearTarea";

function App() {
    const [tareas, setTareas] = useState([]);
    const backUrl = import.meta.env.VITE_BACK_URL;

    async function getTasks() {
        try {
            const res = await fetch(backUrl);
            const data = await res.json();
            setTareas(data);
        } catch (error) {
            console.log("Error:", error);
        }
    }
    useEffect(() => {
        getTasks();
    }, []);
    return (
        <div className="w-full min-h-screen flex flex-wrap bg-[url('https://plus.unsplash.com/premium_photo-1727363542778-269c2812bb55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover">
            <CrearTarea getTasks={getTasks} />
            {tareas.map((tarea) => (
                <Tarea
                    key={tarea._id}
                    tarea={tarea}
                    tareas={tareas}
                    setTareas={setTareas}
                    getTasks={getTasks}
                />
            ))}
        </div>
    );
}

export default App;
