import useSWR from "swr";
import * as qs from "qs";
import { fetcher } from "./fetcher";

export default function useForecast(params: {}) {
  // init fetch reports
  const { data, error } = useSWR(
    `${process.env.API_ROOT}/fetch/forecast?${qs.stringify(params)}`,
    fetcher
  );

  // return
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
