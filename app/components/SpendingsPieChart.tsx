"use client";

import CanvasPieChart from "./CanvasPieChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Spending = {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
};

const categoryColors: { [key: string]: string } = {
  Food: "#66c2a5",
  Transportation: "#fc8d62",
  Entertainment: "#8da0cb",
  Housing: "#e78ac3",
  Health: "#a6d854",
  Other: "#ffd92f",
};

export default function SpendingsPieChart({
  spendings,
}: {
  spendings: Spending[];
}) {
  const data = Object.entries(
    spendings.reduce((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as { [key: string]: number })
  ).map(([category, amount]) => ({
    category,
    amount,
    color:
      categoryColors[category as keyof typeof categoryColors] ||
      categoryColors.Other,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex justify-center items-center">
          <CanvasPieChart data={data} width={300} height={300} />
        </div>
      </CardContent>
    </Card>
  );
}
