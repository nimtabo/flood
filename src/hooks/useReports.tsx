import useSWR from "swr";
import { fetcher } from "./fetcher";
import * as qs from "qs";

export default function useReports(options: any) {
  const { data, error } = useSWR(
    `${process.env.API_ROOT}/fetch/reports?${qs.stringify(options)}`,
    fetcher
  );

  // return
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
