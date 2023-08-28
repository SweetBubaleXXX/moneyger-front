import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type TransactionType = "IN" | "OUT";

export default function Home() {
  const [tab, setTab] = useState<TransactionType>("OUT");

  return (
    <>
      <div className="sticky my-5 w-screen">
        <Tabs defaultValue="OUT" onValueChange={setTab}>
          <TabsList className="grid w-4/5 max-w-lg grid-cols-2 mx-auto">
            <TabsTrigger value="OUT">Expenses</TabsTrigger>
            <TabsTrigger value="IN">Income</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Card className="flex flex-col text-4xl space-y-2 text-center w-min py-3 px-8 mx-auto my-5">
        <CardTitle className="mb-4">August</CardTitle>
        <div className="px-2 text-green-400">+<b>123</b></div>
        <div className="px-2 text-rose-500">−<b>321</b></div>
        <Separator className="" />
        <div className="text-2xl text-neutral-400">−<i>98</i></div>
      </Card>
      <Select defaultValue="month">
        <SelectTrigger className="w-24 mx-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="year">Year</SelectItem>
          <SelectSeparator />
          <SelectItem value="all">All time</SelectItem>
          <SelectSeparator />
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      {
        new Array(20).fill(<Skeleton className="w-4/5 h-[60px] mx-auto my-6" />)
      }
      <div className="fixed bottom-6 w-screen">
        <Button size="icon" className="flex mx-auto rounded-full">
          <Plus />
        </Button>
      </div>
    </>
  );
}