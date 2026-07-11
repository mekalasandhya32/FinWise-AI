import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  className?: string;
}

const fieldBase =
  "w-full h-12 rounded-xl bg-[oklch(1_0_0/0.06)] border border-[oklch(1_0_0/0.10)] px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:outline-none focus:border-primary/60 focus:bg-[oklch(1_0_0/0.09)] focus:ring-4 focus:ring-[oklch(0.68_0.19_260/0.15)]";

export function Input({
  label,
  hint,
  error,
  leftIcon,
  className,
  id,
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(fieldBase, leftIcon && "pl-11", error && "border-destructive/60 focus:border-destructive")}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <p className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  hint,
  error,
  className,
  id,
  children,
  ...rest
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
      )}
      <select id={inputId} className={cn(fieldBase, "appearance-none pr-10 [background-image:url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20fill=%22none%22%20stroke=%22%23a3a3b8%22%20stroke-width=%222%22%20viewBox=%220%200%2024%2024%22><path%20d=%22m6%209%206%206%206-6%22/></svg>')] [background-repeat:no-repeat] [background-position:right_1rem_center]")} {...rest}>
        {children}
      </select>
      {(hint || error) && (
        <p className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className,
  id,
  ...rest
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(fieldBase, "h-auto min-h-[120px] py-3 leading-relaxed", error && "border-destructive/60 focus:border-destructive")}
        {...rest}
      />
      {(hint || error) && (
        <p className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
