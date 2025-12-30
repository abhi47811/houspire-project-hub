import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  useEffect(() => {
    const fetchRoomAndRedirect = async () => {
      if (!roomId) {
        toast({
          title: 'Invalid Room URL',
          description: 'Room ID is missing from the URL.',
          variant: 'destructive',
        });
        navigate('/projects');
        return;
      }

      try {
        // Fetch the room to get the project_id
        const { data: room, error } = await supabase
          .from('rooms')
          .select('project_id')
          .eq('id', roomId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching room:', error);
          throw error;
        }

        if (!room) {
          toast({
            title: 'Room Not Found',
            description: 'The room you\'re looking for doesn\'t exist or you don\'t have access.',
            variant: 'destructive',
          });
          navigate('/projects');
          return;
        }

        // Redirect to the correct URL pattern
        navigate(`/projects/${room.project_id}/rooms/${roomId}`, { replace: true });
      } catch (error) {
        console.error('Error redirecting:', error);
        toast({
          title: 'Error',
          description: 'Failed to load room. Please try again.',
          variant: 'destructive',
        });
        navigate('/projects');
      }
    };

    fetchRoomAndRedirect();
  }, [roomId, navigate, toast]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Redirecting to room...</p>
      </div>
    </div>
  );
}
