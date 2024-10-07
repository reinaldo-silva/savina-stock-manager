"use client";
import { SquarePlus } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export default function Home() {
  return (
    <div className="flex h-full w-full gap-4">
      <div className="flex-1 border bg-zinc-100 p-4">
        <h2 className="text-2xl">Registros geral</h2>
        <span className="font-light text-zinc-700">
          Ultimas movimentacoes de produtos
        </span>

        <ul className="py-4">
          <DayHistory />
          <ItemHistory />
          <ItemHistory />
          <ItemHistory />
          <DayHistory />
          <ItemHistory />
          <ItemHistory />
          <ItemHistory />
          <ItemHistory />
        </ul>
      </div>

      <div className="h-full flex-1 border bg-zinc-100">
        <ChartBar />
      </div>
    </div>
  );
}

function DayHistory() {
  return (
    <li className="mb-2">
      <span>Hoje</span>
    </li>
  );
}

function ItemHistory() {
  return (
    <li className="flex justify-between gap-2 border border-transparent p-2 hover:border-zinc-200 hover:bg-white">
      <SquarePlus />
      <div className="flex flex-col">
        <span>Produto adicionado</span>
        <p className="text-sm text-zinc-500">Joia de prata</p>
      </div>

      <div className="mx-2 mt-3 flex-1 border-t-2 border-dashed border-zinc-500" />

      <small>12:00</small>
    </li>
  );
}

const salesData = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 2100 },
  { month: "Mar", sales: 800 },
  { month: "Apr", sales: 1600 },
  { month: "May", sales: 900 },
  { month: "Jun", sales: 1700 },
  { month: "Jul", sales: 2500 },
  { month: "Aug", sales: 1900 },
  { month: "Sep", sales: 3000 },
  { month: "Oct", sales: 2200 },
  { month: "Nov", sales: 2700 },
  { month: "Dec", sales: 3400 },
];

function ChartBar() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="mb-4 text-2xl font-bold">Monthly Sales</h2>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <Tooltip />

            <Bar dataKey="sales" fill="#4F46E5" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
