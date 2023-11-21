import React, { Fragment, PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PiePendukung() {
  return (
    <Fragment>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex justify-between items-center">
        {/* Warna Kiri */}
        <div className="text-black">
          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          <p className="text-center mt-2 text-sm">17 - 25 tahun</p>
        </div>

        <div className="text-black">
          <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          <p className="text-center mt-2 text-sm">26 - 35 tahun</p>
        </div>

        {/* Warna Kanan */}
        <div className="text-black">
          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
          <p className="text-center mt-2 text-sm">36 - 50 tahun</p>
        </div>

        <div className="text-black">
          <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
          <p className="text-center text-sm mt-2">Di atas 50 tahun</p>
        </div>
      </div>
    </Fragment>
  );
}

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
