import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import type { EmotionalEntry } from "@/data/emotionalData";

const chartConfig: ChartConfig = {
  score: {
    label: "Emotional Stability",
    color: "hsl(145, 30%, 55%)",
  },
};

interface Props {
  data: EmotionalEntry[];
  onDayClick: (entry: EmotionalEntry) => void;
  selectedDay: EmotionalEntry | null;
}

const EmotionalChart = ({ data, onDayClick, selectedDay }: Props) => {
  const handleDotClick = (dotData: any) => {
    if (dotData?.payload) {
      onDayClick(dotData.payload);
    }
  };

  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold" style={{ fontFamily: "Quicksand" }}>
          Stability Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs text-primary font-medium">↑ Stable / Calm</span>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(145, 40%, 50%)" stopOpacity={1} />
                <stop offset="100%" stopColor="hsl(0, 50%, 65%)" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(80, 15%, 88%)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "hsl(150, 8%, 50%)" }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              domain={[40, 100]}
              tick={{ fontSize: 11, fill: "hsl(150, 8%, 50%)" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <ReferenceLine y={70} stroke="hsl(145, 20%, 75%)" strokeDasharray="6 4" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="url(#lineGradient)"
              strokeWidth={2.5}
              dot={(props: any) => {
                const isSelected = selectedDay?.date === props.payload?.date;
                return (
                  <circle
                    key={props.key}
                    cx={props.cx}
                    cy={props.cy}
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? "hsl(145, 40%, 45%)" : "hsl(145, 30%, 55%)"}
                    stroke="hsl(80, 25%, 97%)"
                    strokeWidth={2}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDotClick(props)}
                  />
                );
              }}
              activeDot={{
                r: 6,
                fill: "hsl(145, 30%, 55%)",
                stroke: "hsl(80, 25%, 97%)",
                strokeWidth: 2,
                cursor: "pointer",
                onClick: (_: any, payload: any) => handleDotClick(payload),
              }}
            />
          </LineChart>
        </ChartContainer>

        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-xs text-destructive/70 font-medium">↓ Stressed / Unstable</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionalChart;
