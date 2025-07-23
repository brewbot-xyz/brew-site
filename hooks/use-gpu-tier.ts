import { getGPUTier, TierResult } from "detect-gpu";
import { useEffect, useState } from "react";

const useGpuTier = () => {
  const [gpuTier, setGpuTier] = useState<TierResult>({
    tier: 0,
    type: "FALLBACK",
  });

  useEffect(() => {
    const detect = async () => {
      const gpu = await getGPUTier();
      setGpuTier(gpu);
    };

    detect();
  }, []);

  return gpuTier;
};

export { useGpuTier };
