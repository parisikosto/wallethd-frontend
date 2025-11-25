import { type JSX } from 'react';

import { Card, CardContent, CardHeader, Skeleton } from '@/ui';

export const LoadingSkeleton = (): JSX.Element => {
  return (
    <div className="px-4 lg:px-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Monthly Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="pt-0 shadow-none rounded-none">
            <CardHeader className="py-3 text-center">
              <Skeleton className="h-6 w-32 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-0 p-0 pt-3">
              <div className="px-6 py-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="px-6 py-3">
                <Skeleton className="h-5 w-20 mb-3" />
                <Skeleton className="h-16 w-full" />
              </div>
              <div className="px-6 py-3">
                <Skeleton className="h-5 w-20 mb-3" />
                <Skeleton className="h-16 w-full" />
              </div>
              <div className="px-6 py-3">
                <Skeleton className="h-5 w-20 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-6 w-20 mt-3 ml-auto" />
              </div>
              <div className="px-6 py-3">
                <Skeleton className="h-5 w-20 mb-3" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
              <div className="border-t pt-3 px-6">
                <Skeleton className="h-6 w-24 ml-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
