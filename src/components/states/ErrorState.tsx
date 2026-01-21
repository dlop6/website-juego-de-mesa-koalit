"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  onRetry: () => void;
  retryLabel?: string;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  icon?: ReactNode;
}

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "Reintentar",
  secondaryActionLabel,
  onSecondaryAction,
  icon,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={[
        "rounded-3 border border-border bg-surface p-6 text-center",
        "space-y-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon ? <div className="mx-auto w-fit">{icon}</div> : null}
      <div className="space-y-2">
        <h2 className="text-700 font-700 text-text">{title}</h2>
        {description ? <p className="text-500 text-muted">{description}</p> : null}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onRetry}>{retryLabel}</Button>
        {secondaryActionLabel && onSecondaryAction ? (
          <Button variant="secondary" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
