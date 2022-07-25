


// imports

import { useEffect, useState } from "react";
import axios from 'axios';



export default function useGetReports(query: string, pageNumber: number, url: string) {

  // getting the loading function 
  const [isLoading, setIsLoading] = useState(true);


  // getting the error function 
  const [error, setError] = useState<Error | null>(null);


  // getting the data function
  const [data, setData] = useState<any[]>([]);


  // having the hasmore system
  const [hasMore, setHasMore] = useState(false);


  // having a new useEffect for clearing all data
  useEffect(() => setData([]), [query]);



  // having the second use effect for getting the data
  useEffect(() => {

    // first set the loading to true
    setIsLoading(true);


    // then set the error to null
    setError(null);


    const controller = new AbortController();

    axios({ 
      method: 'GET', 
      url: url, 
      params: {page: pageNumber},
      signal: controller.signal
    })
      .then((res: any) => {


        // keep in mind that you could do it as a set by "new Set()"
        setData((prevState) => ([...prevState, ...res.data.data]));


        // this means to check if theres more data being sent to us
        // setHasMore(res.data.docs.length > 0);

        // clear out the loading screen
        setIsLoading(false);
      })
      .catch((error: Error) => {
        
        // if the error is as a result of the axios cancel then dont worry 
        if (axios.isCancel(error)) return;

        // set the error
        setError(error);
      });

    return () => controller.abort();
  }, [query, pageNumber, url]);
  


  // return data
  return { isLoading, error, hasMore, data };
}