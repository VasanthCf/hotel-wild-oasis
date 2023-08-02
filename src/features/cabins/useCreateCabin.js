import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  // Query client Hook....................................................................

  const queryClient = useQueryClient();
  // Query State Function Hook for ****CREATING-CABIN****.......................................................................
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      // ****re-rendering the cabin state****
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => {
      toast.error(err.message); // ****Catch error while mutation ****
    },
  });
  return { isCreating, createCabin };
}
