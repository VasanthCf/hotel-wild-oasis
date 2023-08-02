import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  //Query state Function Hook for ****EDITING-CABIN****...................................................................
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    // ****To pass 2-arguments USE this way****
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      // ****re-rendering the cabin state****
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => {
      toast.error(err.message); // ****Catch error while mutation ****
    },
  });
  return { isEditing, editCabin };
}
