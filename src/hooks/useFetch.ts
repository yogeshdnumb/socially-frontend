import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export default function useFetch(url: string) {
  const [data, setData] = useState();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await api.get(url)).data;
        setData(data);
        console.log(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e);
          console.log(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, setData, error, isLoading };
}
