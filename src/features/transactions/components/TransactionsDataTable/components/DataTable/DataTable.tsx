import type { JSX } from 'react';
import { useEffect, useId, useMemo, useState } from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLayoutColumns,
  IconLoader,
  IconTrendingUp,
} from '@tabler/icons-react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { z } from 'zod';

import { TransactionStatus } from '@/api';
import { useIsMobile } from '@/hooks';
import {
  Badge,
  Button,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/ui';
import { formatCurrency } from '@/utils';

import type { schema } from './constants';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const ALL_MONTHS = 'All';
const ALL_YEARS = 'All';

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: 'note',
    header: () => <div className="w-full pl-4">Note</div>,
    cell: ({ row }) => {
      return (
        <div className="w-full pl-4">
          <TableCellViewer item={row.original} />
        </div>
      );
    },
    enableHiding: false,
    size: Number.MAX_SAFE_INTEGER,
    minSize: 200,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const hasParent = row.original.categoryParent;
      return (
        <div className="flex flex-col gap-0.5">
          {hasParent && (
            <span className="text-muted-foreground text-xs">
              {row.original.categoryParent}
            </span>
          )}
          <span className="font-medium">{row.original.category}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'facility',
    header: 'Facility',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="border-primary/30 bg-primary/5 text-foreground font-normal"
      >
        {row.original.facility || '-'}
      </Badge>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const isExpense = row.original.type === 'expense';
      const colorClasses = isExpense
        ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900'
        : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900';

      return (
        <Badge
          variant="outline"
          className={`px-1.5 min-w-[80px] ${colorClasses}`}
        >
          {row.original.type.charAt(0).toUpperCase() +
            row.original.type.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === TransactionStatus.Completed ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status.charAt(0).toUpperCase() +
          row.original.status.slice(1)}
      </Badge>
    ),
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {formatCurrency(row.original.amountDecimal)}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      if (!row.original.date) return '-';
      const date = new Date(row.original.date);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.toLocaleDateString('en-US', { day: '2-digit' });
      const year = date.toLocaleDateString('en-US', { year: 'numeric' });
      return (
        <div className="flex">
          <span className="inline-block w-[60px]">
            {month} {day},
          </span>
          <span>{year}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { isDragging, setNodeRef, transform, transition } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => {
        const isNoteColumn = cell.column.id === 'note';
        const isCategoryColumn = cell.column.id === 'category';
        const isFacilityColumn = cell.column.id === 'facility';
        const isTypeColumn = cell.column.id === 'type';
        const isStatusColumn = cell.column.id === 'status';
        const isAmountColumn = cell.column.id === 'amount';
        const isDateColumn = cell.column.id === 'date';

        let style: React.CSSProperties = { width: 'auto' };
        if (isNoteColumn) {
          style = { width: '100%' };
        } else if (isCategoryColumn) {
          style = { minWidth: '160px', width: 'auto' };
        } else if (isFacilityColumn) {
          style = { minWidth: '160px', width: 'auto' };
        } else if (isTypeColumn) {
          style = { minWidth: '120px', width: 'auto' };
        } else if (isStatusColumn) {
          style = { minWidth: '120px', width: 'auto' };
        } else if (isAmountColumn) {
          style = { minWidth: '100px', width: 'auto' };
        } else if (isDateColumn) {
          style = { minWidth: '120px', width: 'auto' };
        }

        return (
          <TableCell key={cell.id} style={style}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export function DataTable({
  data: initialData,
  showFilters,
}: {
  data: z.infer<typeof schema>[];
  showFilters: boolean;
}): JSX.Element {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  /**
   * Extract unique years from transactions and get current year
   */
  const availableYears = useMemo(() => {
    const years = new Set<string>();

    initialData.forEach((transaction) => {
      if (transaction.date) {
        const year = new Date(transaction.date).getFullYear().toString();
        years.add(year);
      }
    });

    return Array.from(years).sort((a, b) => a.localeCompare(b));
  }, [initialData]);

  const currentYear = new Date().getFullYear().toString();

  const [selectedYear, setSelectedYear] = useState<string>(
    availableYears.includes(currentYear)
      ? currentYear
      : availableYears[0] || ALL_YEARS,
  );

  const [selectedMonth, setSelectedMonth] = useState<string>(ALL_MONTHS);

  /**
   * Get months that have transactions for the selected year
   */
  const availableMonths = useMemo(() => {
    const monthsSet = new Set<number>();

    initialData.forEach((transaction) => {
      if (!transaction.date) {
        return;
      }

      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate.getFullYear().toString();

      // If "All" years selected, include all months with transactions
      if (selectedYear === ALL_YEARS) {
        monthsSet.add(transactionDate.getMonth()); // 0-11
      } else if (transactionYear === selectedYear) {
        monthsSet.add(transactionDate.getMonth()); // 0-11
      }
    });

    return monthsSet;
  }, [initialData, selectedYear]);

  /**
   * Reset month to "All" when year changes
   */
  useEffect(() => {
    setSelectedMonth(ALL_MONTHS);
  }, [selectedYear]);

  /**
   * Filter data by selected year and month, then sort by date (oldest first)
   */
  const filteredDataByYear = useMemo(() => {
    const filtered = initialData.filter((transaction) => {
      if (!transaction.date) {
        return false;
      }

      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate.getFullYear().toString();
      const transactionMonth = transactionDate.getMonth();

      // Filter by year (if not "All")
      if (selectedYear !== ALL_YEARS && transactionYear !== selectedYear) {
        return false;
      }

      // Filter by month (if not "All")
      if (selectedMonth !== ALL_MONTHS) {
        const monthIndex = MONTHS.indexOf(
          selectedMonth as (typeof MONTHS)[number],
        );
        if (monthIndex !== transactionMonth) {
          return false;
        }
      }

      return true;
    });

    // Sort by date from old to new (ascending)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }, [initialData, selectedYear, selectedMonth]);

  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => filteredDataByYear?.map(({ id }) => id) || [],
    [filteredDataByYear],
  );

  const table = useReactTable({
    data: filteredDataByYear,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
    },
    columnResizeMode: 'onChange',
  });

  return (
    <div className="flex w-full flex-col gap-4">
      {showFilters && (
        <>
          {/* Year Filter Section */}
          <Tabs
            value={selectedYear}
            onValueChange={setSelectedYear}
            className="w-full"
          >
            <div className="flex items-center justify-between px-4 lg:px-6">
              <Label htmlFor="year-selector-mobile" className="sr-only">
                Filter by Year
              </Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger
                  className="flex w-fit @4xl/main:hidden"
                  size="sm"
                  id="year-selector-mobile"
                >
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_YEARS}>{ALL_YEARS} year(s)</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                <TabsTrigger value={ALL_YEARS}>{ALL_YEARS}</TabsTrigger>
                {availableYears.map((year) => (
                  <TabsTrigger key={year} value={year}>
                    {year}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>

          {/* Month Filter Section */}
          <Tabs
            value={selectedMonth}
            onValueChange={setSelectedMonth}
            className="w-full"
          >
            <div className="flex items-center justify-between px-4 lg:px-6">
              <Label htmlFor="month-selector-mobile" className="sr-only">
                Filter by Month
              </Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger
                  className="flex w-fit @4xl/main:hidden"
                  size="sm"
                  id="month-selector-mobile"
                >
                  <SelectValue placeholder="Select a month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_MONTHS}>
                    {ALL_MONTHS} month(s)
                  </SelectItem>
                  {MONTHS.map((month, index) => {
                    const isDisabled = !availableMonths.has(index);
                    return (
                      <SelectItem
                        key={month}
                        value={month}
                        disabled={isDisabled}
                      >
                        {month}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                <TabsTrigger value={ALL_MONTHS}>{ALL_MONTHS}</TabsTrigger>
                {MONTHS.map((month, index) => {
                  const isDisabled = !availableMonths.has(index);
                  return (
                    <TabsTrigger
                      key={month}
                      value={month}
                      disabled={isDisabled}
                    >
                      {month}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </Tabs>
        </>
      )}

      {/* Customize Columns */}
      <div className="flex items-center justify-end gap-2 px-4 lg:px-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span className="hidden lg:inline">Customize Columns</span>
              <span className="lg:hidden">Columns</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide(),
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Transactions Table */}
      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            sensors={sensors}
            id={sortableId}
          >
            <Table className="w-full">
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const isNoteColumn = header.column.id === 'note';
                      const isCategoryColumn = header.column.id === 'category';
                      const isFacilityColumn = header.column.id === 'facility';
                      const isTypeColumn = header.column.id === 'type';
                      const isStatusColumn = header.column.id === 'status';
                      const isAmountColumn = header.column.id === 'amount';
                      const isDateColumn = header.column.id === 'date';

                      let style: React.CSSProperties = { width: 'auto' };
                      if (isNoteColumn) {
                        style = { width: '100%' };
                      } else if (isCategoryColumn) {
                        style = { minWidth: '160px', width: 'auto' };
                      } else if (isFacilityColumn) {
                        style = { minWidth: '160px', width: 'auto' };
                      } else if (isTypeColumn) {
                        style = { minWidth: '120px', width: 'auto' };
                      } else if (isStatusColumn) {
                        style = { minWidth: '120px', width: 'auto' };
                      } else if (isAmountColumn) {
                        style = { minWidth: '100px', width: 'auto' };
                      } else if (isDateColumn) {
                        style = { minWidth: '120px', width: 'auto' };
                      }

                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          style={style}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {(() => {
              const totalFiltered = table.getFilteredRowModel().rows.length;
              const pageSize = table.getState().pagination.pageSize;
              const pageIndex = table.getState().pagination.pageIndex;
              const startRow =
                totalFiltered === 0 ? 0 : pageIndex * pageSize + 1;
              const endRow = Math.min(
                (pageIndex + 1) * pageSize,
                totalFiltered,
              );

              return `Showing ${startRow}-${endRow} of ${totalFiltered} transaction(s)`;
            })()}
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.note}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.note}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{' '}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="note">Header</Label>
              <Input id="note" defaultValue={item.note} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" defaultValue={item.amount} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="date">Date</Label>
                <Input id="date" defaultValue={item.date} />
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
