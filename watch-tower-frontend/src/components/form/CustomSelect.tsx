import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  label?: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function CustomSelect({
  label,
  options,
  defaultValue,
  placeholder = "Select an option",
  onValueChange,
  className = "w-full",
}: CustomSelectProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position="popper" className="z-50">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
