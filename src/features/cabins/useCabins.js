import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabin,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  return { isLoading, cabin, error };
}
