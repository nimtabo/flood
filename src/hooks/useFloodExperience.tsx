import useSWR from "swr";
import { fetcher } from "./fetcher";

export default function useFloodExperience() {
  const { data, error } = useSWR(
    `${process.env.API_ROOT}/fetch-threads`,
    fetcher
  );

  // return
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
