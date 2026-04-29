/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";

export default function ChartBar({
  chart,
}: {
  card: { totalUsers: string; activeUsers: string };
  chart: any;
}) {
  const updateSearchParams = useUpdateSearchParams();
  
  const data = chart?.map((item: any) => ({
    month: item?.month,
    count: item?.count,
    active: true,
  }));

  const currentYear = new Date().getFullYear();
  const last3years = Array.from(
    { length: 3 },
    (_, index) => currentYear - index,
  );

  return (
    <div className="rounded-xl border border-sky-500/30 bg-linear-to-b from-[#062A44] to-[#041C2D] p-6 mt-5">
      {/* Stats */}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">User Growth</h2>
        <Select onValueChange={(year) => updateSearchParams({ year })}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder={currentYear.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {last3years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#8FBAD6" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#8FBAD6"
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => `${v / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFB020",
                borderRadius: "10px",
                border: "none",
                color: "#000",
                fontWeight: 600,
              }}
              formatter={(value) => [
                value !== undefined ? `${value.toLocaleString()}` : "",
                "",
              ]}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#00E5FF"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke="#FF8A00"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
