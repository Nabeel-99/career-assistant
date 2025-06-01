import Features from "@/components/Features";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col  w-full gap-10">
      <section className="relative  mt-20 pb-10 lg:mt-0">
        <div className="absolute mask-t-from-50% mask-radial-[50%_90%] mask-radial-from-80% bg-hero top-0 -z-20 left-0 right-0 h-full"></div>
        <Hero />
        <div className="absolute bottom-0 h-40  lg:h-[500px]  left-0 right-0 bg-gradient-to-b from-transparent to-80% to-[#0a0a0a] "></div>
      </section>
      <section className="pb-10 px-4  lg:px-20 2xl:container 2xl:mx-auto">
        <Features />
      </section>
    </div>
  );
}
