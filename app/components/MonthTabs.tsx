import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type MonthTabsProps = {
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
}

const months = [
  { value: '2023-07', label: 'July 2023' },
  { value: '2023-08', label: 'August 2023' },
  { value: '2023-09', label: 'September 2023' },
]

export default function MonthTabs({ selectedMonth, onSelectMonth }: MonthTabsProps) {
  return (
    <Tabs value={selectedMonth} onValueChange={onSelectMonth} className="w-full fixed bottom-0 left-0 right-0 bg-background z-10 p-4 border-t">
      <TabsList className="grid w-full grid-cols-3">
        {months.map((month) => (
          <TabsTrigger key={month.value} value={month.value}>
            {month.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

