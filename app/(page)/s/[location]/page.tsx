import SearchRoom from "@/components/RoomList/SearchRoom";
type Props = {
  params: {
    location: string;
  };
};

export default function SearchFilterPage({ params }: Props) {
  return (
    <>
      <SearchRoom params={params} />
    </>
  );
}
