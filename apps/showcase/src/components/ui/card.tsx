import type { ViewProps } from "react-native";
import { View } from "react-native";

import type { H3Props, PProps } from "./text";
import { cn } from "@/lib/utils";
import { H3, P } from "./text";

function Card({ className, ...props }: ViewProps) {
  return (
    <View
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 rounded-xl border border-neutral-200 bg-card py-6 text-card-foreground shadow",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ViewProps) {
  return (
    <View
      data-slot="card-header"
      className={cn(
        "@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: H3Props) {
  return (
    <H3
      data-slot="card-title"
      className={cn("font-semibold leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: PProps) {
  return (
    <P
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

// function CardAction({ className, ...props }: PProps) {
//   return (
//     <P
//       data-slot="card-action"
//       className={cn(
//         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

function CardContent({ className, ...props }: ViewProps) {
  return (
    <View
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ViewProps) {
  return (
    <View
      data-slot="card-footer"
      className={cn("[.border-t]:pt-6 flex items-center px-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  // CardAction,
  CardDescription,
  CardContent,
};
