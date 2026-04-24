import React from "react";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react"; 
import { store } from "../../store/store";



type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
  heroImageSrc?: string;
  mascotImageSrc?: string;
};

const Home = ({
  // title = `HEY, ${user?.username ? user.username : 'Guest'}`,
  subtitle = "How are you doing",
  primaryLabel = "Get Started",
  secondaryLabel = "Learn More",
  onPrimaryClick,
  onSecondaryClick,
  className = "",
  heroImageSrc = "/tom_and_Jerry.png",
}: HeroSectionProps) => {
  
  const user = store.getState().userAuth.user;
  const title = `HEY, ${user?.username ? user.username : 'Guest'}`;

  return (
    <section
      className={`relative overflow-hidden bg-background px-4 sm:px-6 lg:px-8 min-h-[calc(100dvh-65px)] flex items-center ${className}`}
    >
      {/* subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid min-h-[calc(100dvh-80px)] w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left visual area */}
          <div className="relative flex min-h-105 items-end justify-center lg:justify-start">
            <div className="relative h-105 w-full max-w-130">
              {/* Main character */}
              <img
                src={heroImageSrc}
                alt="Hero character"
                className="absolute left-0 bottom-0 h-auto w-[80%] max-w-100 select-none object-contain drop-shadow-2xl"
                draggable={false}
              />
            </div>
          </div>

          {/* Right content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-5xl font-black uppercase tracking-tight text-orange-500 sm:text-6xl lg:text-7xl xl:text-8xl">
              {title}
            </h1>

            <p className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
              {subtitle}
            </p>

            {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button
                onClick={onPrimaryClick}
                size="lg"
                className="h-12 rounded-full px-7 text-base font-semibold shadow-md transition-transform hover:scale-[1.02]"
              >
                {primaryLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={onSecondaryClick}
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-7 text-base font-semibold"
              >
                {secondaryLabel}
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;