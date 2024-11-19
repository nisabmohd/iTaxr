type SerachPageParams = {
  searchParams: Promise<{
    query: string;
  }>;
};

export default async function SearchPage(params: SerachPageParams) {
  return <div>search for {(await params.searchParams).query}</div>;
}
