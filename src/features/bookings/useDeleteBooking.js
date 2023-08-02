import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  // ****to get the QUERYCLIENT****
  const queryClient = useQueryClient();
  // ****query hook to mutate the state****
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("booking successfully deleted");
      // ****re-rendering the state function****
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message), // ****Catch error while deleting****
  });
  return { isDeleting, deleteBooking };
}
