import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Database, 
  RefreshCw, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown,
  Loader2,
  Info
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  getSmartDefaultsStatus,
  getSmartDefaultsPreview,
  loadMissingDefaults,
  seedAllDefaults,
  EXPECTED_TOTAL,
  SmartDefaultRecord,
} from "@/services/api/smartDefaultsService";

export function LoadSmartDefaults() {
  const queryClient = useQueryClient();
  const [missingOpen, setMissingOpen] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Fetch status
  const { data: status, isLoading: statusLoading, refetch: refetchStatus } = useQuery({
    queryKey: ["smart-defaults-status"],
    queryFn: getSmartDefaultsStatus,
  });

  // Fetch preview data
  const { data: previewData, isLoading: previewLoading } = useQuery({
    queryKey: ["smart-defaults-preview"],
    queryFn: getSmartDefaultsPreview,
    enabled: previewOpen,
  });

  // Load missing mutation
  const loadMissingMutation = useMutation({
    mutationFn: loadMissingDefaults,
    onSuccess: (result) => {
      toast({
        title: "Defaults Loaded",
        description: `Loaded ${result.loaded} records. ${result.errors} errors.`,
      });
      queryClient.invalidateQueries({ queryKey: ["smart-defaults-status"] });
      queryClient.invalidateQueries({ queryKey: ["smart-defaults-preview"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Load Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Seed all mutation
  const seedAllMutation = useMutation({
    mutationFn: seedAllDefaults,
    onSuccess: (result) => {
      toast({
        title: "All Defaults Seeded",
        description: `Seeded ${result.loaded} records. ${result.errors} errors.`,
      });
      queryClient.invalidateQueries({ queryKey: ["smart-defaults-status"] });
      queryClient.invalidateQueries({ queryKey: ["smart-defaults-preview"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Seed Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Group missing by style for display
  const missingByStyle = status?.missing.reduce((acc, item) => {
    if (!acc[item.style]) {
      acc[item.style] = [];
    }
    acc[item.style].push(item.room_type);
    return acc;
  }, {} as Record<string, string[]>) || {};

  const isComplete = status?.loaded === EXPECTED_TOTAL;
  const isLoading = loadMissingMutation.isPending || seedAllMutation.isPending;

  // Helper to count array items in JSON
  const countItems = (json: unknown): number => {
    if (Array.isArray(json)) return json.length;
    if (typeof json === "object" && json !== null) return Object.keys(json).length;
    return 0;
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5" />
              Current Status
            </CardTitle>
            <CardDescription>Smart Defaults database records</CardDescription>
          </CardHeader>
          <CardContent>
            {statusLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading status...
              </div>
            ) : status ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">{status.loaded}</p>
                    <p className="text-sm text-muted-foreground">
                      of {status.expected} combinations loaded
                    </p>
                  </div>
                  {isComplete ? (
                    <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {status.missing.length} Missing
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Unable to load status</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Coverage</CardTitle>
            <CardDescription>13 styles × 13 room types = 169 combinations</CardDescription>
          </CardHeader>
          <CardContent>
            {status && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{status.coverage}%</span>
                  </div>
                  <Progress value={status.coverage} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Styles</p>
                    <p className="font-medium">13 defined</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Room Types</p>
                    <p className="font-medium">13 defined</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
          <CardDescription>Load or refresh smart defaults data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => loadMissingMutation.mutate()}
              disabled={isLoading || isComplete}
            >
              {loadMissingMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Load Missing Defaults
            </Button>
            <Button
              variant="outline"
              onClick={() => seedAllMutation.mutate()}
              disabled={isLoading}
            >
              {seedAllMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh All (169)
            </Button>
            <Button
              variant="ghost"
              onClick={() => refetchStatus()}
              disabled={statusLoading}
            >
              {statusLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Info className="h-4 w-4 mr-2" />
              )}
              Check Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Missing Combinations */}
      {status && status.missing.length > 0 && (
        <Collapsible open={missingOpen} onOpenChange={setMissingOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      Missing Combinations ({status.missing.length})
                    </CardTitle>
                    <CardDescription>
                      Style and room type combinations not yet loaded
                    </CardDescription>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${missingOpen ? "rotate-180" : ""}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Style</TableHead>
                        <TableHead>Missing Room Types</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(missingByStyle).map(([style, roomTypes]) => (
                        <TableRow key={style}>
                          <TableCell className="font-medium">{style}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {roomTypes.map((rt) => (
                                <Badge key={rt} variant="secondary" className="text-xs">
                                  {rt}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Data Preview */}
      <Collapsible open={previewOpen} onOpenChange={setPreviewOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Data Preview</CardTitle>
                  <CardDescription>Sample of loaded smart defaults</CardDescription>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${previewOpen ? "rotate-180" : ""}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {previewLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : previewData && previewData.length > 0 ? (
                <div className="rounded-md border max-h-96 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Style</TableHead>
                        <TableHead>Room Type</TableHead>
                        <TableHead className="text-center">Specs</TableHead>
                        <TableHead className="text-center">Checklist</TableHead>
                        <TableHead className="text-center">Finishes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((record: SmartDefaultRecord) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.style}</TableCell>
                          <TableCell>{record.room_type}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{countItems(record.specifications)}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{countItems(record.checklist)}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{countItems(record.finishes)}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No data loaded yet</p>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
