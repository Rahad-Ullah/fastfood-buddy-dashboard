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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChartBar({
  chart,
}: {
  card: { totalUsers: string; activeUsers: string };
  chart: any;
}) {
  const data = chart?.map((item: any) => ({
    month: item?.month,
    count: item?.count,
    active: true,
  }));

  return (
    <div className="rounded-xl border border-sky-500/30 bg-linear-to-b from-[#062A44] to-[#041C2D] p-6 mt-5">
      {/* Stats */}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">User Growth</h2>
        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="2025" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
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
              dataKey="users"
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
