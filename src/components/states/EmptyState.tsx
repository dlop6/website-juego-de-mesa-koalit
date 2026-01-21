"use client";

import type { HTMLAttributes } from "react";
import { Button } from "@/components/ui/Button";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actionLabel: string;
  onAction: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
  ...props
}: EmptyStateProps) {
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
      <div className="space-y-2">
        <h2 className="text-700 font-700 text-text">{title}</h2>
        {description ? <p className="text-500 text-muted">{description}</p> : null}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onAction}>{actionLabel}</Button>
        {secondaryActionLabel && onSecondaryAction ? (
          <Button variant="secondary" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
