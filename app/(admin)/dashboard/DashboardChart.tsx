'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Static mock data – replace with real data from Supabase if needed
const data = [
  { day: 'Sen', users: 4 },
  { day: 'Sel', users: 7 },
  { day: 'Rab', users: 3 },
  { day: 'Kam', users: 9 },
  { day: 'Jum', users: 12 },
  { day: 'Sab', users: 6 },
  { day: 'Min', users: 8 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barSize={32}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis 
          dataKey="day" 
          tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} 
          axisLine={false} 
          tickLine={false} 
          dy={10}
        />
        <YAxis 
          tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 600 }} 
          axisLine={false} 
          tickLine={false} 
        />
        <Tooltip
          contentStyle={{ 
            backgroundColor: '#1A1A1A', 
            borderRadius: 16, 
            border: '1px solid rgba(212,175,55,0.2)', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
            fontSize: 12,
            color: '#FFF'
          }}
          itemStyle={{ color: '#D4AF37' }}
          cursor={{ fill: 'rgba(212,175,55,0.05)' }}
        />
        <Bar 
          dataKey="users" 
          fill="#D4AF37" 
          radius={[8, 8, 0, 0]} 
          name="User Baru" 
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
