import useSWR from "swr";
import { fetcher } from "./fetcher";

export default function useBlogNews() {
  // init fetch reports
  const { data, error } = useSWR(
    `${process.env.API_ROOT}/fetch/published/news`,
    fetcher
  );

  // return
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
