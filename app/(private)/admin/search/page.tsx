type SerachPageParams = {
  searchParams: {
    query: string;
  };
};

export default function SearchPage(params: SerachPageParams) {
  return <div>search for {params.searchParams.query}</div>;
}
