import useSWR from "swr";
import axios from "axios";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export default function useStatistics() {
  // init fetch reports
  const { data, error } = useSWR(`${process.env.API_ROOT}/fetch/statistics`, fetcher);

  // return
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
