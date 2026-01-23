"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { VaultIcon } from "@/components/icons/VaultIcon";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actionLabel: string;
  onAction: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  icon?: ReactNode;
}

// Mensajes tematicos aleatorios para empty state
const emptyMessages = [
  "La boveda esta vacia... por ahora",
  "Ningun juego coincide con tu busqueda",
  "Hmmm, parece que esos filtros son muy exigentes",
];

function getRandomMessage(): string {
  return emptyMessages[Math.floor(Math.random() * emptyMessages.length)] ?? emptyMessages[0] ?? "";
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  icon,
  className,
  ...props
}: EmptyStateProps) {
  const displayDescription = description ?? getRandomMessage();
  
  return (
    <div
      className={[
        "rounded-3 border border-border bg-surface p-8 text-center",
        "space-y-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="mx-auto w-fit animate-pulse">
        {icon ?? <VaultIcon className="h-24 w-24 text-accent/60" />}
      </div>
      <div className="space-y-2">
        <h2 className="text-700 font-700 text-text">{title}</h2>
        <p className="text-500 text-muted max-w-md mx-auto">{displayDescription}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
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
