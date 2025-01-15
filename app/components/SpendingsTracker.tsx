"use client";

import { startTransition, useOptimistic, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpendingsList from "./SpendingsList";
import SpendingsPieChart from "./SpendingsPieChart";
import SpendingsBarChart from "./SpendingsBarChart";
import MonthTabs from "./MonthTabs";
import AddClient from "./AddClient";
import AddSpendingForm from "./AddSpendingForm";
import { cn } from "@/lib/utils";

import { setDate } from "date-fns";
import { Plus } from "lucide-react";
import { date } from "zod";
import { categoryColors } from "../lib/getCategoryColors";

import { toast } from "sonner";
import { FieldApi, useForm } from "@tanstack/react-form";

import { insertSpendingSchema, NewSpending } from "../lib/db/schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Sample data structure
export type Spending = {
  id: number;
  date: string;
  description: string;
  price: number;
  categoryId: string;
  sending?: boolean;
};

const initialSpendings: Spending[] = [
  // {
  //   id: 1,
  //   date: "2023-07-01",
  //   description: "Groceries Groceries Groceries Groceries",
  //   price: 50.0,
  //   categoryId: "Food",
  // },
  // {
  //   id: 2,
  //   date: "2023-07-02",
  //   description: "Gas",
  //   price: 30.0,
  //   categoryId: "Transportation",
  // },
  // {
  //   id: 3,
  //   date: "2023-07-03",
  //   description: "Movie tickets",
  //   price: 25.0,
  //   categoryId: "Entertainment",
  // },
  // {
  //   id: 7,
  //   date: "2023-07-07",
  //   description: "Movie tickets",
  //   price: 25.0,
  //   categoryId: "Entertainment",
  // },
  // {
  //   id: 4,
  //   date: "2023-08-01",
  //   description: "Rent",
  //   price: 1000.0,
  //   categoryId: "Housing",
  // },
  // {
  //   id: 5,
  //   date: "2023-08-05",
  //   description: "Dinner",
  //   price: 60.0,
  //   categoryId: "Food",
  // },
  // {
  //   id: 6,
  //   date: "2023-09-01",
  //   description: "Gym membership",
  //   price: 50.0,
  //   categoryId: "Health",
  // },
];

export default function SpendingsTracker() {
  const [spendings, setSpendings] = useState<Spending[]>(initialSpendings);
  // Using useOptimistic
  const [optimisticSpendings, addOptimisticSpending] = useOptimistic(spendings);

  const [selectedMonth, setSelectedMonth] = useState<string>("2023-07");

  const [open, setOpen] = useState(false);

  const filteredOptimisticSpendings = optimisticSpendings.filter(
    (optimisticSpending) => optimisticSpending.date.startsWith(selectedMonth)
  );

  const addSpending = async (optimisticSpending: Spending) => {
    console.log({ here92: "hi" });
    console.log({ optimisticSpending });
    console.log({ optimisticSpendings });

    startTransition(() => {
      addOptimisticSpending((prev) => [...prev, optimisticSpending]);
    });
    console.log({ optimisticSpending });
    console.log({ optimisticSpendings });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
      console.log("Item added successfully");
    } catch (error) {
      setSpendings(
        optimisticSpendings.filter((item) => item.id !== optimisticSpending.id)
      );
      console.error("Failed to add item:", error);
    }
  };

  async function addSpending2(spending: Spending) {
    await new Promise((res) => setTimeout(res, 1000));
    setSpendings((prevSpendings) => [...prevSpendings, spending]);
  }

  // const content = [
  //   {
  //     title: "List",
  //     component: <SpendingsList spendings={spendings} />,
  //   },
  //   {
  //     title: "Pie Chart",
  //     component: <SpendingsPieChart spendings={filteredOptimisticSpendings} />,
  //   },
  //   {
  //     title: "Bar Chart",
  //     component: <SpendingsBarChart spendings={filteredOptimisticSpendings} />,
  //   },
  // ];

  const defaultValues: Spending = {
    id: 10,
    description: "",
    price: 123,
    date: new Date().toISOString().split("T")[0],
    categoryId: "Food",
  };
  const form = useForm({
    defaultValues,
    // onSubmit: async (values) => {
    //   //   await fetch("/api/expense", {
    //   //     method: "POST",
    //   //     body: JSON.stringify(values),
    //   //   });

    //   const spending = values.value;

    //   console.log({ here52: "here52", values });
    //   addOptimisticSpending((prev) => [
    //     ...prev,
    //     { ...spending, sending: true },
    //   ]);

    //   // setSpendings((prev) spending);
    //   toast.success("test");
    //   // form.reset();
    // },
  });

  return (
    <div className="pb-20">
      {/* Mobile view with tabs */}
      {/* <div className="md:hidden">
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
      </div> */}

      {/* Desktop view with vertical layout */}
      {/* <pre className="bg-red-400 text-xs">
        {JSON.stringify(optimisticSpendings, null, 2)}
      </pre>
      <pre className="bg-red-100 text-xs">
        {JSON.stringify(spendings, null, 2)}
      </pre> */}
      <div className="hidden md:block space-y-8">
        <SpendingsList spendings={optimisticSpendings} />
        <div className="flex space-x-4">
          <div className="w-1/2">
            <SpendingsPieChart spendings={filteredOptimisticSpendings} />
          </div>
          <div className="w-1/2">
            <SpendingsBarChart spendings={filteredOptimisticSpendings} />
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
      {/* <AddSpendingForm
        addOptimisticSpending={addOptimisticSpending}
        setSpendings={setSpendings}
      /> */}
      {/* <AddClient addSpending={addSpending} /> */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-20 right-4 rounded-full w-12 h-12 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Spending</DialogTitle>
            <DialogDescription>
              Enter the details of your new spending entry.
            </DialogDescription>
          </DialogHeader>

          <div className="p-2">
            <h2>Create Expense</h2>
            <form
              action={async (formData) => {
                // setOpen((prev) => false);
                const newSpending = {
                  description: formData.get("description") as string,
                  price: parseFloat(formData.get("price") as string),
                  date: formData.get("date") as string,
                  categoryId: formData.get("categoryId") as string,
                  id: 123,
                };
                addOptimisticSpending((prev) => [
                  ...prev,
                  { ...newSpending, sending: true },
                ]);
                await new Promise((res) => setTimeout(res, 4000));
                setSpendings((prev) => [...prev, newSpending]);
              }}
              onSubmit={(e) => {
                // console.log({ here64: "64" });
                // e.preventDefault();
                // e.stopPropagation();
                // console.log({ here64: "67" });
                // void form.handleSubmit();
                // console.log({ here64: "69" });
                setOpen((prev) => !prev);
              }}
              className="flex flex-col gap-y-4 max-w-xl m-auto"
            >
              <form.Field
                name="description"
                validators={{
                  onChange: insertSpendingSchema.shape.description,
                }}
                children={(field) => (
                  <div>
                    <Label htmlFor={field.name} className="capitalize">
                      {field.name}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="categoryId"
                validators={{
                  onChange: insertSpendingSchema.shape.categoryId,
                }}
                children={(field) => (
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select name={field.name} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryColors).map(([cat, colors]) => (
                          <SelectItem
                            key={cat}
                            value={cat}
                            className="flex items-center"
                          >
                            <span
                              className={cn(
                                "inline-block w-3 h-3 rounded-full mr-2",
                                colors.bg
                              )}
                            />
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <form.Field
                name="price"
                // validators={{
                //   onChange: insertSpendingSchema.shape.price,
                // }}
                children={(field) => (
                  <div>
                    <Label htmlFor={field.name} className="capitalize">
                      {field.name}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      type="number"
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Field
                name="date"
                validators={{
                  onChange: insertSpendingSchema.shape.date,
                }}
                children={(field) => (
                  <div>
                    <Label htmlFor={field.name} className="capitalize">
                      {field.name}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={new Date().toISOString().split("T")[0]}
                      onBlur={field.handleBlur}
                      type="date"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {/* <Calendar
                mode="single"
                selected={new Date(field.state.value)}
                onSelect={(date) =>
                  field.handleChange((date ?? new Date()).toISOString())
                }
                className="rounded-md border"
              />  */}
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button className="mt-4" type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "..." : "Submit"}
                  </Button>
                )}
              />
            </form>
          </div>

          {/* Month tabs at the bottom for all screen sizes */}
        </DialogContent>
      </Dialog>
      <MonthTabs
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
      />
    </div>
  );
}
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
