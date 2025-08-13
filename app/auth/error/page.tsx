import { Suspense } from "react";
import ErrorMessage from "../error-messages";
import LoadingPageFallback from "@/components/LoadingPageFallback";

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<LoadingPageFallback />}>
      <ErrorMessage />;
    </Suspense>
  );
}
