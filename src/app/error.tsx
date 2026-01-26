"use client";

import { OfflineErrorScreen } from "@/components/states/OfflineErrorScreen";

export default function GlobalError({ reset }: { reset: () => void }) {
  return <OfflineErrorScreen onRetry={reset} />;
}
