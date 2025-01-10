"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Spending = {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
};

type DailySpending = {
  date: string;
  total: number;
};

export default function SpendingsBarChart({
  spendings,
}: {
  spendings: Spending[];
}) {
  const dailySpendings: DailySpending[] = spendings.reduce(
    (acc: DailySpending[], spending) => {
      const existingDay = acc.find((day) => day.date === spending.date);
      if (existingDay) {
        existingDay.total += spending.amount;
      } else {
        acc.push({ date: spending.date, total: spending.amount });
      }
      return acc;
    },
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: "Total",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <BarChart data={dailySpendings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
