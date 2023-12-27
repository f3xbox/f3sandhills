import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Hero from "./components/Hero";

/** TODO: templatize media */
import f3MuletownWhite from "../../public/f3-muletown-white.png";
import f3White from "../../public/f3-white.png";
import f3ShovelFlag from "../../public/f3-shovel-flag.png";
import f3HeroImg from "../../public/f3-compass-2023-11-14.jpg";
import CorePrinciple from "./components/CorePrinciple";

/** TODO: templatize metadata */
export const metadata: Metadata = {
  title: "F3 Muletown",
  description: "FREE workout group for MEN",
};

interface HomeProps {
  regionName: string;
}

export default function Home({ regionName }: HomeProps) {
  const href = "/";
  const commonSliceClassNames = "py-8 px-4";
  return (
    <>
      <Header href={href} />
      <main>
        <Hero
          title="ACCELERATE WITH US"
          subtitle="FITNESS + FELLOWSHIP + FAITH"
          imgUrl={f3HeroImg.src}
        />
        <section className={`bg-gloom ${commonSliceClassNames}`}>
          <div className="shadow-xl">
            <h2 className="leading-none">
              <span className="opacity-70">THIS IS</span>
              <span className="block text-5xl py-5">
                F3 {regionName?.toUpperCase()}
              </span>
            </h2>
            <p className="subtitle text-xl pb-10 opacity-70">
              FREE workout group for MEN
            </p>
          </div>
          <Image
            src={f3MuletownWhite}
            alt={`F3 ${regionName} White`}
            width={200}
            className="pt-8 pb-4 my-0 mx-auto"
          />
        </section>
        <section className={`bg-iron leading-tight ${commonSliceClassNames}`}>
          <div>
            <h3 className="pb-6">WE ARE</h3>
            <p className="pb-6">
              100+ guys that meet up in small groups to workout in parks and
              public spaces around Columbia, Tennessee.
            </p>
            <p className="pb-10 font-bold">
              We hold 10+ workouts in Columbia each week. Weekday workouts are
              generally 45 MIN & 60 MIN on Saturday.
            </p>
          </div>
          <div>
            <h3 className="pb-6">A PART OF</h3>
            <p className="pb-6">
              F3 Nation, a network of 3,275 free, peer-led workouts for men in
              252 regions with a mission to:
            </p>
            <p className="font-bold pb-6">
              plant, grow and serve small workout groups for men invigorating
              male community leadership.
            </p>
          </div>
        </section>
        <section className={`bg-gloom ${commonSliceClassNames}`}>
          <Image
            src={f3White}
            alt="F3 White"
            width={128}
            height={128}
            className="my-0 mx-auto pb-5"
          />
          <h2>CORE PRINCIPLES</h2>
          <ul className="pt-10">
            <CorePrinciple
              principle="Free of Charge"
              description="Never pay to workout, ever."
            />
            <CorePrinciple
              principle="Open to all Men"
              description="No matter the man, you are welcome here."
            />
            <CorePrinciple
              principle="Held Outdoors"
              description="Rain or Shine, Hot or Cold, we are out there."
            />
            <CorePrinciple
              principle="Peer Led"
              description="Rotating fashion of men leading each other."
            />
            <CorePrinciple
              principle="Ends with a COT"
              description="Always ends with a Circle of Trust."
            />
          </ul>
        </section>
        <section className={`bg-iron pt-20 px-4 pb-24`}>
          <Image
            src={f3ShovelFlag}
            alt="F3 Shovel Flag"
            width={200}
            height={200}
            className="my-0 mx-auto"
          />
          <h2>FIND A WORKOUT</h2>
          <p className="font-blackops mb-10">all you gotta do is SHOW UP</p>
          <Button href="/workouts" text="FIND A WORKOUT" />
        </section>
        <section className={`bg-gloom leading-tight pt-20 px-4 pb-24`}>
          <h2 className="text-5xl">[F.N.G.]</h2>
          <p className="text-cmu pt-5">
            Hey Friendly New Guy... What did you{" "}
            <span className="italic">think</span> FNG stood for?
          </p>
          <p className="text-xl py-5">
            ARE YOU LOOKING TO ACCELERATE YOUR LIFE?
          </p>
          <p className="text-cmu text-md pb-10">
            We welcome men of all fitness levels to our workouts and have no
            requirement for membership other than showing up at the appointed
            time + place and following the workout leader [the “Q” in F³
            lexicon]. If you still have questions just ask any of the guys and
            they&apos;ll help or point you in the right direction!
          </p>
          <Button href="/fng" text="WHAT TO EXPECT" />
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://cdn.f3muletown.com/region.muletown.json");
  const data = await res.json();
  return { props: { regionName: data.regionName } };
}
