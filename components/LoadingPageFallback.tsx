import Image from "next/image";
const LoadingPageFallback = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="rounded-full p-6 bg-primary animate-pulse">
        <div
          style={{
            position: "relative",
            width: "46px",
            height: "46px",
          }}
        >
          <Image
            src={"/logo-light.svg"}
            alt="Beatcaster Logo loading state"
            fill
          />
        </div>
      </div>
    </div>
  );
};
export default LoadingPageFallback;
