import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Palette } from 'lucide-react';
import { usePopularCombinations } from '@/hooks/useDashboardData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const combinationColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function PopularCombinationsCard() {
  const { data: combinations, isLoading } = usePopularCombinations();

  if (isLoading) {
    return <PopularCombinationsSkeleton />;
  }

  const chartData = (combinations || []).map(c => ({
    name: c.combination.length > 20 ? c.combination.slice(0, 20) + '...' : c.combination,
    fullName: c.combination,
    value: c.count,
  }));

  return (
    <Card className="card-interactive">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Popular Style Combinations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 40 }}
                >
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    hide
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                            <p className="font-medium text-sm">{data.fullName}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.value} uses
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={combinationColors[index % combinationColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground">Top 5 this month</p>
          </>
        ) : (
          <div className="flex h-[180px] flex-col items-center justify-center gap-3 text-center">
            <Palette className="h-10 w-10 text-muted-foreground/50" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">No style data yet</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Create projects to see popular combinations
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PopularCombinationsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-40 animate-shimmer" />
      </CardHeader>
      <CardContent>
        <div className="flex h-[180px] items-end justify-around gap-2">
          {[80, 60, 100, 40, 70].map((height, i) => (
            <Skeleton key={i} className="w-12 animate-shimmer" style={{ height: `${height}%` }} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
