"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  label?: string;
  options: { value: string; label: string }[];
  hideSearch?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  buttonClassName?: string;
  contentClassName?: string;
}

export function Combobox({
  label = "Item",
  options,
  hideSearch = false,
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  buttonClassName,
  contentClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const value = controlledValue ?? internalValue;

  React.useEffect(() => {
    if (controlledValue) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-32 justify-between", buttonClassName)}
        >
          {value
            ? options.find((item) => item.value === value)?.label
            : `Select ${label}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-32 p-0", contentClassName)}>
        <Command>
          {!hideSearch && (
            <CommandInput placeholder={`Search ${label}...`} className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setInternalValue(newValue);
                    onValueChange?.(newValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
