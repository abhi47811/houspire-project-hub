import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertCircle, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * RoomRedirect Component
 * 
 * Handles legacy URL pattern /room/:roomId and redirects to the correct 
 * /projects/:projectId/rooms/:roomId pattern by fetching the project ID from the database.
 */
export default function RoomRedirect() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<{ title: string; description: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoomAndRedirect = async () => {
      if (!roomId) {
        setError({
          title: 'Invalid Room URL',
          description: 'Room ID is missing from the URL.',
        });
        setIsLoading(false);
        return;
      }

      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log('No active session, redirecting to login');
          toast({
            title: 'Authentication Required',
            description: 'Please log in to view this room.',
            variant: 'default',
          });
          navigate(`/login?redirect=/room/${roomId}`);
          return;
        }

        console.log('Fetching room with ID:', roomId);
        
        // Fetch the room to get the project_id
        const { data: room, error: roomError } = await supabase
          .from('rooms')
          .select('project_id, room_name, room_number')
          .eq('id', roomId)
          .maybeSingle();

        if (roomError) {
          console.error('Error fetching room:', roomError);
          setError({
            title: 'Database Error',
            description: `Failed to fetch room: ${roomError.message}`,
          });
          setIsLoading(false);
          return;
        }

        if (!room) {
          console.log('Room not found in database');
          setError({
            title: 'Room Not Found',
            description: 'The room you\'re looking for doesn\'t exist or you don\'t have access to it.',
          });
          setIsLoading(false);
          return;
        }

        console.log('Room found, redirecting to:', `/projects/${room.project_id}/rooms/${roomId}`);
        
        // Redirect to the correct URL pattern
        navigate(`/projects/${room.project_id}/rooms/${roomId}`, { replace: true });
      } catch (error) {
        console.error('Error redirecting:', error);
        setError({
          title: 'Unexpected Error',
          description: error instanceof Error ? error.message : 'Failed to load room. Please try again.',
        });
        setIsLoading(false);
      }
    };

    fetchRoomAndRedirect();
  }, [roomId, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading room...</p>
          <p className="text-xs text-muted-foreground">Room ID: {roomId}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{error.title}</AlertTitle>
              <AlertDescription>{error.description}</AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">What you can do:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check if the room URL is correct</li>
                  <li>Make sure you're logged in</li>
                  <li>Verify you have access to this project</li>
                  <li>Try creating a new room if this one doesn't exist</li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-2">
                <Link to="/projects" className="w-full">
                  <Button variant="default" className="w-full">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Projects
                  </Button>
                </Link>
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
              </div>
              
              {roomId && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground break-all">
                    <span className="font-medium">Room ID:</span> {roomId}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
