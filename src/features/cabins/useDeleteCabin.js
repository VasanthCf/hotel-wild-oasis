import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  // ****to get the QUERYCLIENT****
  const queryClient = useQueryClient();
  // ****query hook to mutate the state****
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      // ****re-rendering the state function****
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message), // ****Catch error while deleting****
  });
  return { isDeleting, deleteCabin };
}
