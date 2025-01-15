"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { addSpending } from "../lib/actions";
import { categoryColors } from "../lib/getCategoryColors";
import { cn } from "@/lib/utils";
import AddClient from "./AddClient";
import { Spending } from "./SpendingsTracker";

export default function AddSpendingForm({
  addOptimisticSpending,
  setSpendings,
}: {
  addOptimisticSpending: (
    action: Spending[] | ((pendingState: Spending[]) => Spending[])
  ) => void;
  setSpendings: React.Dispatch<React.SetStateAction<Spending[]>>;
}) {
  const [open, setOpen] = useState(false);

  return (
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
        <AddClient
          addOptimisticSpending={addOptimisticSpending}
          setSpendings={setSpendings}
        />
        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              defaultValue={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
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
          <Button type="submit" className="w-full">
            Add Spending
          </Button>
        </form> */}
      </DialogContent>
    </Dialog>
  );
}
