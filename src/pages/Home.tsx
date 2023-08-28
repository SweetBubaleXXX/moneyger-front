import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

type TransactionType = "IN" | "OUT";

export default function Home() {
  const [tab, setTab] = useState<TransactionType>("OUT");

  return (
    <>
      <div className="sticky my-5 w-screen">
        <Tabs defaultValue="OUT" onValueChange={setTab}>
          <TabsList className="grid w-4/5 grid-cols-2 mx-auto">
            <TabsTrigger value="OUT">Expenses</TabsTrigger>
            <TabsTrigger value="IN">Income</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Select defaultValue="month">
        <SelectTrigger className="w-28 mx-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="year">Year</SelectItem>
          <SelectSeparator></SelectSeparator>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      <div className="fixed bottom-6 w-screen">
        <Button size="icon" className="flex mx-auto rounded-full">
          <Plus />
        </Button>
      </div>
    </>
  );
}