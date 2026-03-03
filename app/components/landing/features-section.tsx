import { BsJoystick, BsListStars, BsShieldLockFill } from "react-icons/bs";
import { FeatureCard } from "./feature-card";
import { SectionHeader } from "./section-header";

export function FeaturesSection() {
  return (
    <>
      <SectionHeader
        className="lg:col-span-2"
        description={
          <>
            <span>
              Brew offers a comprehensive set of features to enhance your
              Discord community.
            </span>
            <span className="inline px-1 md:block">
              From moderation tools to fun minigames, we&apos;ve got you
              covered!
            </span>
          </>
        }
        icon={BsListStars}
        title={["Wide Variety of", "Features"]}
      />

      <FeatureCard
        className="max-w-md place-self-center lg:place-self-end"
        description="Protect your server from unauthorized changes with our advanced antinuke system."
        icon={<BsShieldLockFill className="text-base sm:text-lg" />}
        image={{
          src: "/assets/antinuke.webp",
          alt: "Antinuke Demo",
          width: 1080,
          height: 1080,
          priority: true,
          className: "h-auto w-full rounded-t-2xl",
          sizes: "(max-width: 1024px) 100vw, 448px",
        }}
        imagePlacement="top"
        title="Antinuke Protection"
      />

      <FeatureCard
        className="max-w-md place-self-center lg:place-self-start"
        description="Engage your community with fun minigames like searching for items, crafting tools, and battling bosses while leveling up!"
        icon={<BsJoystick className="text-base sm:text-lg" />}
        image={{
          src: "/assets/brew-minigames.png",
          alt: "Minigames Demo",
          width: 1080,
          height: 1080,
          className: "h-auto w-full rounded-b-2xl p-3",
          sizes: "(max-width: 1024px) 100vw, 448px",
        }}
        imagePlacement="bottom"
        title="Minigames"
        topContentClassName="p-4 text-center sm:p-6"
      />
    </>
  );
}
