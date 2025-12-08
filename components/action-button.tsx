"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export function ActionButton({
  action,
  ...props
}: { action: () => Promise<void> } & React.ComponentProps<typeof Button>) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await action();
    });
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      disabled={isPending || props.disabled}
    >
      {isPending ? "Creating..." : "Create"}
    </Button>
  );
}
