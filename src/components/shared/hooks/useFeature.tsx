import { features } from "@/components/shared/feature"
import FEATURE_FLAGS from "@/feature_flags"
import { useQuery } from "@tanstack/react-query"

export function useFeature(feature?: keyof typeof FEATURE_FLAGS) {
  const { data, isLoading } = useQuery({
    queryKey: ["feature-flags"],
    queryFn: async () => await features()
  })

  return {
    isLoading,
    enabled: feature ? data?.[feature] : null,
    flags: data
  }
}
