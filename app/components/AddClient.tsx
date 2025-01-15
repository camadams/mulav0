"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FieldApi, useForm } from "@tanstack/react-form";

import { insertSpendingSchema, NewSpending } from "../lib/db/schema";
import { cn } from "@/lib/utils";

import { categoryColors } from "../lib/getCategoryColors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spending } from "./SpendingsTracker";

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

export default function AddClient({
  addOptimisticSpending,
  setSpendings,
}: {
  addOptimisticSpending: (
    action: Spending[] | ((pendingState: Spending[]) => Spending[])
  ) => void;
  setSpendings: React.Dispatch<React.SetStateAction<Spending[]>>;
}) {
  const defaultValues: Spending = {
    id: 10,
    description: "",
    price: 123,
    date: new Date().toISOString().split("T")[0],
    categoryId: "Food",
  };
  const form = useForm({
    defaultValues,
    onSubmit: async (values) => {
      //   await fetch("/api/expense", {
      //     method: "POST",
      //     body: JSON.stringify(values),
      //   });

      const spending = values.value;

      console.log({ here52: "here52", values });
      addOptimisticSpending((prev) => [
        ...prev,
        { ...spending, sending: true },
      ]);

      // setSpendings(spending);
      toast.success("test");
      // form.reset();
    },
  });

  return (
    <div className="p-2">
      <h2>Create Expense</h2>
      <form
        onSubmit={(e) => {
          console.log({ here64: "64" });
          e.preventDefault();
          e.stopPropagation();
          console.log({ here64: "67" });
          void form.handleSubmit();
          console.log({ here64: "69" });
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
                onChange={(e) => field.handleChange(Number(e.target.value))}
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
              /> */}
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
  );
}
