"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpendingsList from "./SpendingsList";
import SpendingsPieChart from "./SpendingsPieChart";
import SpendingsBarChart from "./SpendingsBarChart";
import MonthTabs from "./MonthTabs";
import AddSpendingForm from "./AddSpendingForm";
import Navbar from "./Navbar";

// Sample data structure
type Spending = {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
};

const initialSpendings: Spending[] = [
  {
    id: 1,
    date: "2023-07-01",
    description: "Groceries",
    amount: 50.0,
    category: "Food",
  },
  {
    id: 2,
    date: "2023-07-02",
    description: "Gas",
    amount: 30.0,
    category: "Transportation",
  },
  {
    id: 3,
    date: "2023-07-03",
    description: "Movie tickets",
    amount: 25.0,
    category: "Entertainment",
  },

  {
    id: 7,
    date: "2023-07-07",
    description: "Movie tickets",
    amount: 25.0,
    category: "Entertainment",
  },
  {
    id: 4,
    date: "2023-08-01",
    description: "Rent",
    amount: 1000.0,
    category: "Housing",
  },
  {
    id: 5,
    date: "2023-08-05",
    description: "Dinner",
    amount: 60.0,
    category: "Food",
  },
  {
    id: 6,
    date: "2023-09-01",
    description: "Gym membership",
    amount: 50.0,
    category: "Health",
  },
];

export default function SpendingsTracker() {
  const [spendings, setSpendings] = useState<Spending[]>(initialSpendings);
  const [selectedMonth, setSelectedMonth] = useState<string>("2023-07");

  const filteredSpendings = spendings.filter((spending) =>
    spending.date.startsWith(selectedMonth)
  );

  const handleAddSpending = (newSpending: Omit<Spending, "id">) => {
    const id = Math.max(...spendings.map((s) => s.id), 0) + 1;
    setSpendings([...spendings, { ...newSpending, id }]);
  };

  const content = [
    {
      title: "List",
      component: <SpendingsList spendings={filteredSpendings} />,
    },
    {
      title: "Pie Chart",
      component: <SpendingsPieChart spendings={filteredSpendings} />,
    },
    {
      title: "Bar Chart",
      component: <SpendingsBarChart spendings={filteredSpendings} />,
    },
  ];

  return (
    <div className="pb-20">
      {/* Mobile view with tabs */}
      <div className="md:hidden">
        <Tabs defaultValue="List" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {content.map((item) => (
              <TabsTrigger key={item.title} value={item.title}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {content.map((item) => (
            <TabsContent key={item.title} value={item.title}>
              {item.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Desktop view with vertical layout */}
      <div className="hidden md:block space-y-8">
        <SpendingsList spendings={filteredSpendings} />
        <div className="flex space-x-4">
          <div className="w-1/2">
            <SpendingsPieChart spendings={filteredSpendings} />
          </div>
          <div className="w-1/2">
            <SpendingsBarChart spendings={filteredSpendings} />
          </div>
        </div>
        {/* {content.map((item) => (
          <div key={item.title}>
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            {item.component}
          </div>
        ))} */}
      </div>

      {/* Add Spending Form */}
      <AddSpendingForm />

      {/* Month tabs at the bottom for all screen sizes */}
      <MonthTabs
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
      />
    </div>
  );
}
