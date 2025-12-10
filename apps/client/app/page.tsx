import HomeBody from "@/components/sections/HomeBody";
import HomeHero from "@/components/sections/HomeHero";
import { createMetadata } from "@seye-bamidele/ui";

export const metadata = createMetadata({
  title: "Home",
  description: "Seye Bandele is a marketer, entrepreneur.",
});

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeBody />
    </>
  );
}