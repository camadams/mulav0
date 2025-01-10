"use server";

// import { db, spendings } from './db';
import { revalidatePath } from "next/cache";

export async function addSpending(spending: {
  date: string;
  description: string;
  amount: number;
  category: string;
}) {
  try {
    // await db.insert(spendings).values({
    //   ...spending,
    //   amount: Math.round(spending.amount * 100), // Convert to cents
    // });
    // revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Failed to add spending:", error);
    return { success: false, error: "Failed to add spending" };
  }
}

export async function updateSpending(spending: {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
}) {
  try {
    //   await db.update(spendings)
    //     .set({
    //       date: spending.date,
    //       description: spending.description,
    //       amount: Math.round(spending.amount * 100), // Convert to cents
    //       category: spending.category,
    //     })
    //     .where(eq(spendings.id, spending.id));
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update spending:", error);
    return { success: false, error: "Failed to update spending" };
  }
}
