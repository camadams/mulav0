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
import { Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import type { Spending } from "./SpendingsList";
import { updateSpending } from "../lib/actions";
import { categoryColors, getCategoryColor } from "../lib/getCategoryColors";

export default function EditSpendingForm({ spending }: { spending: Spending }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(spending.date);
  const [description, setDescription] = useState(spending.description);
  const [amount, setAmount] = useState(spending.amount.toString());
  const [category, setCategory] = useState(spending.category);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateSpending({
      id: spending.id,
      date,
      description,
      amount: parseFloat(amount),
      category,
    });
    if (result.success) {
      setOpen(false);
      toast({
        title: "Success",
        description: "Spending updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update spending",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Spending</DialogTitle>
          <DialogDescription>
            Make changes to your spending entry.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
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
                <SelectValue placeholder="Select a category">
                  {category && (
                    <div className="flex items-center">
                      <span
                        className={cn(
                          "inline-block w-3 h-3 rounded-full mr-2",
                          getCategoryColor(category).bg
                        )}
                      />
                      {category}
                    </div>
                  )}
                </SelectValue>
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
            Update Spending
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
