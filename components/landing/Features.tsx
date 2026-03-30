import Image from "next/image";
import InView from "./InView";

const featureItems = [
  {
    title: "Never Miss a Beat, Real-Time Sync",
    description:
      "Beatcaster automatically detects and displays your currently playing song in real time. From the moment the first note hits, your audience will know exactly what you're listening to, creating a more engaging experience.",
  },
  {
    title: "Seamless Integration",
    description:
      "Get up and running in minutes. Our app integrates effortlessly with your favorite streaming software, including OBS Studio and Streamlabs.",
  },
  {
    title: "Lightweight",
    description:
      "We built Beatcaster to be lightweight and efficient. It runs silently in the background without impacting your computer's performance.",
  },
];

const Features = () => {
  return (
    <div
      className="w-full bg-muted"
      style={{
        backgroundImage: `
        radial-gradient(circle at 20% 80%, oklch(0.937 0.0142 74.4218) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 245, 238, 0.35) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, oklch(0.937 0.0142 74.4218) 0%, transparent 50%)`,
      }}
    >
      <div className="w-full max-w-7xl mx-auto border-x">
        <div className="border-b relative overflow-hidden">
          <div className="absolute -right-96 xl:-right-5 opacity-0 xl:opacity-100 hidden xl:inline-block -bottom-2 w-54 h-64 z-10 transition-all">
            <Image
              src={"/stone.png"}
              alt=""
              fill
              sizes="220"
              className="object-contain [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_80%,rgba(0,0,0,0)_100%)] [mask-repeat:no-repeat] [mask-size:cover] [--webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_80%,rgba(0,0,0,0)_100%)] [--webkit-mask-repeat:no-repeat] [--webkit-mask-size:cover]"
            />
          </div>
          <div className="w-full max-w-6xl border-x mx-auto">
            <section
              id="features"
              aria-labelledby="features-title"
              className="pt-16 pb-20 mx-auto space-y-10 xl:px-0 px-4"
            >
              <InView
                className="flex flex-col items-center justify-center gap-2 mx-auto"
                delay={0.05}
              >
                <p className="text-sm font-medium text-primary">Features</p>
                <h2 id="features-title" className="text-2xl font-semibold">
                  Turn Up Your Stream
                </h2>
              </InView>
              <div className="w-full min-h-[372px] bg-background rounded-2xl flex md:flex-row flex-col gap-4 relative">
                <div
                  className="absolute inset-0 z-0 opacity-15 rounded-2xl"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <InView
                  className="rounded-2xl flex-1/4 md:flex-1/2 relative min-h-[280px] md:min-h-[372px]"
                  delay={0.12}
                  distance={48}
                >
                  <Image
                    src="/features-illustration.png"
                    alt="Beatcaster widget preview inside a streaming setup"
                    fill
                    className="object-cover rounded-2xl shadow-2xl filter contrast-125 brightness-75"
                    sizes="566.66px"
                  />
                </InView>
                <div className="flex-3/4 md:flex-1/2 p-6 text-sm text-muted-foreground font-medium flex flex-col items-center justify-center">
                  <ul className="space-y-4">
                    {featureItems.map((feature, index) => (
                      <li
                        key={feature.title}
                        className={
                          index < featureItems.length - 1
                            ? "border-b border-border/70 pb-4"
                            : ""
                        }
                      >
                        <InView delay={0.2 + index * 0.08}>
                          <h3 className="font-extrabold text-foreground text-base pb-2">
                            {feature.title}
                          </h3>
                          <p>{feature.description}</p>
                        </InView>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Features;
