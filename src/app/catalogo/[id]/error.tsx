"use client";

import { OfflineErrorScreen } from "@/components/states/OfflineErrorScreen";

export default function GameDetailError({ reset }: { reset: () => void }) {
  return <OfflineErrorScreen onRetry={reset} />;
}
