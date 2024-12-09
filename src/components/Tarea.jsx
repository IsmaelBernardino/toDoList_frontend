import { useRef, useState } from "react";
import Draggable from "react-draggable";

function Tarea({ tarea, setTareas, getTasks }) {
    const [edit, setEdit] = useState(false);
    const nodeRef = useRef();
    const form = useRef();
    const backUrl = import.meta.env.VITE_BACK_URL;

    async function handleDescriptionChange(e) {
        const updatedDescription = e.target.value;
        const updatedTask = { ...tarea, description: updatedDescription };
        setTareas((prevTareas) =>
            prevTareas.map((t) => (t._id === tarea._id ? updatedTask : t))
        );
    }

    async function handleCheckboxChange() {
        const updatedTask = { ...tarea, isCompleted: !tarea.isCompleted };
        setTareas((prevTareas) =>
            prevTareas.map((t) => (t._id === tarea._id ? updatedTask : t))
        );
    }

    async function deleteTask() {
        try {
            const res = await fetch(`${backUrl}/${tarea._id}`, {
                method: "DELETE",
            });
            if (!res) {
                throw new Error("Error al eliminar la tarea");
            }
            await getTasks();
        } catch (error) {
            console.log(error.message);
        }
    }

    async function editTask(e) {
        e.preventDefault();
        let title = form.current.title.value;
        let description = form.current.description.value;
        let isCompleted = form.current.isCompleted.checked;
        let dueDate = e.target[3].value;

        const task = {
            title: title,
            description: description,
            isCompleted: isCompleted,
            dueDate: dueDate,
        };

        try {
            const res = await fetch(`${backUrl}/${tarea._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
            if (!res.ok) throw new Error("Error al enviar la tarea");
            await getTasks();
            setEdit(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Draggable nodeRef={nodeRef} bounds="parent">
            <div
                ref={nodeRef}
                className="bg-yellow-300 w-[200px] h-[250px] p-2 m-2 flex flex-col justify-between gap-2 cursor-grab"
            >
                {edit ? (
                    <form
                        onSubmit={editTask}
                        ref={form}
                        className="h-full flex flex-col justify-between gap-2"
                    >
                        <input
                            type="text"
                            name="title"
                            value={tarea?.title}
                            disabled={true}
                        />
                        <textarea
                            name="description"
                            value={tarea?.description}
                            placeholder="Descripción"
                            className="flex-grow outline-none"
                            onChange={handleDescriptionChange} // Actualiza y envía al backend
                        ></textarea>
                        <label htmlFor="isComplete">
                            <p className="inline">Check</p>
                            <input
                                name="isCompleted"
                                type="checkbox"
                                checked={tarea?.isCompleted}
                                onChange={handleCheckboxChange} // Actualiza y envía al backend
                            />
                        </label>

                        {tarea.dueDate ? (
                            <input
                                type="date"
                                disabled={true}
                                value={tarea?.dueDate.slice(0, 10)}
                            />
                        ) : null}
                        <button className="bg-blue-500 text-white">
                            Actualizar
                        </button>
                    </form>
                ) : (
                    <>
                        <div className="relative flex justify-between after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-slate-400 after:-bottom-1">
                            <button onClick={() => setEdit(true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="size-5"
                                >
                                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                </svg>
                            </button>
                            <h1 className="w-full text-center">
                                {tarea?.title}
                            </h1>
                            <button
                                className="cursor-pointer"
                                onClick={deleteTask}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="size-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="flex-grow">{tarea?.description}</p>
                        <p>
                            Completado:
                            <input
                                type="checkbox"
                                checked={tarea?.isCompleted}
                                disabled={true}
                            />
                        </p>
                        {tarea?.dueDate ? (
                            <p>{tarea?.dueDate.slice(0, 10)}</p>
                        ) : null}
                    </>
                )}
            </div>
        </Draggable>
    );
}

export default Tarea;
