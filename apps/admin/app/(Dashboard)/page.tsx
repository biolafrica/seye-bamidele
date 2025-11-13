import PageHeader from "@/components/common/PageHeader";
import StatsCards from "@/components/common/statCard";


export default function Home() {

  return (
    <main className="">
      <PageHeader
        heading="Dashboard"
        subHeading="Welocome back seye Bamdele"
        showButton={false}
      />
      <StatsCards/>
    </main>
  );
}
