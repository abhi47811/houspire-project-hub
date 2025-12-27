import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const roomTypes = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'master_bedroom', label: 'Master Bedroom' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'study_room', label: 'Study Room' },
  { value: 'kids_room', label: "Kids Room" },
  { value: 'guest_room', label: 'Guest Room' },
  { value: 'pooja_room', label: 'Pooja Room' },
  { value: 'home_office', label: 'Home Office' },
  { value: 'gym', label: 'Gym' },
  { value: 'entertainment_room', label: 'Entertainment Room' },
  { value: 'utility_room', label: 'Utility Room' },
] as const;

const formSchema = z.object({
  room_name: z.string().min(2, 'Room name must be at least 2 characters'),
  room_type: z.enum([
    'living_room', 'master_bedroom', 'bedroom', 'kitchen', 'dining_room',
    'balcony', 'study_room', 'kids_room', 'guest_room', 'pooja_room',
    'home_office', 'gym', 'entertainment_room', 'utility_room'
  ], { required_error: 'Please select a room type' }),
  length_feet: z.number().min(1, 'Length must be at least 1').optional(),
  width_feet: z.number().min(1, 'Width must be at least 1').optional(),
  height_feet: z.number().min(1, 'Height must be at least 1').optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddRoomFormProps {
  projectId: string;
  nextRoomNumber: number;
  onSuccess: () => void;
}

export function AddRoomForm({ projectId, nextRoomNumber, onSuccess }: AddRoomFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_name: '',
      length_feet: undefined,
      width_feet: undefined,
      height_feet: undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Insert the new room
      const { error: roomError } = await supabase.from('rooms').insert({
        project_id: projectId,
        room_number: nextRoomNumber,
        room_name: values.room_name,
        room_type: values.room_type,
        length_feet: values.length_feet || null,
        width_feet: values.width_feet || null,
        height_feet: values.height_feet || null,
        current_phase: 1,
        phase_1_completed: false,
        phase_2_completed: false,
        phase_3_completed: false,
        phase_4_completed: false,
        phase_5_completed: false,
      });

      if (roomError) throw roomError;

      // Update project total_rooms count
      const { error: projectError } = await supabase
        .from('projects')
        .update({ total_rooms: nextRoomNumber })
        .eq('id', projectId);

      if (projectError) throw projectError;

      toast({
        title: 'Room Added',
        description: 'The new room has been added to the project.',
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error adding room:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add room. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Room Name */}
        <FormField
          control={form.control}
          name="room_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Master Bedroom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Room Type */}
        <FormField
          control={form.control}
          name="room_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Type *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-popover max-h-60">
                  {roomTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dimensions */}
        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="length_feet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length (ft)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="15"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="width_feet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width (ft)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="12"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height_feet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (ft)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="10"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Room
          </Button>
        </div>
      </form>
    </Form>
  );
}
