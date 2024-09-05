"use client";
import { test } from "@/services/test";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const TestQuery = (props: Props) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["test"],
    queryFn: test,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data.title);
  if (!data) {
    return null;
  } else {
    return <div>{data.title}</div>;
  }
};

export default TestQuery;
