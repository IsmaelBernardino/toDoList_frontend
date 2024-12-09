import { useRef } from "react";

function CrearTarea({ getTasks }) {
    const form = useRef();
    const backUrl = import.meta.env.VITE_BACK_URL;

    const handelForm = async (e) => {
        e.preventDefault();
        let title = form.current.title.value;
        let description = form.current.description.value;
        let isCompleted = form.current.isCompleted.value;
        let dueDate = e.target[3].value;
        if (title !== "") {
            const task = {
                title: title,
                description: description,
                isCompleted: isCompleted,
                dueDate: dueDate,
            };
            await createTask(task);
            await getTasks();
            e.target[0].value = "";
            e.target[1].value = "";
            e.target[3].value = null;
        } else console.log("campo requerido");
    };

    async function createTask(task) {
        try {
            const res = await fetch(backUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });
            if (!res.ok) throw new Error("Error al enviar la tarea");
        } catch (error) {
            console.log("error:", error.message);
            console.log(error);
        }
    }
    return (
        <div className="bg-yellow-300 w-[200px] h-[250px] p-2 m-2 ">
            <form
                onSubmit={handelForm}
                ref={form}
                className="w-full h-full flex flex-col justify-between gap-2"
            >
                <input
                    type="text"
                    placeholder="Titulo.."
                    name="title"
                    className="outline-none"
                    required={true}
                />
                <textarea
                    name="description"
                    placeholder="Descripcion"
                    className="flex-grow outline-none"
                ></textarea>
                <input
                    type="checkbox"
                    name="isCompleted"
                    className="hidden"
                    value={false}
                />
                <input type="date" name="duedate" />
                <button>Anotar</button>
            </form>
        </div>
    );
}

export default CrearTarea;
