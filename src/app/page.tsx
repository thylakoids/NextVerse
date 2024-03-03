import { prisma } from "@/db";
import TodoItem from "@/components/TodoItem";
import Link from "next/link";

export const dynamic = "force-dynamic";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { complete },
  });
}


export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded
        hover:bg-slate-700 hover:text-slate-800 focus-within:bg-slate-700 focus-within:text-slate-800 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
