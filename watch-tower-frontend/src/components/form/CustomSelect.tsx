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
  value?: string; // 👈 NUEVO (controlado)
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function CustomSelect({
  label,
  options,
  value,
  defaultValue,
  placeholder = "Select an option",
  onValueChange,
  className = "w-full",
}: CustomSelectProps) {
  return (
    <Select
      value={value} // 👈 controlado
      defaultValue={defaultValue} // 👈 opcional
      onValueChange={onValueChange}
    >
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
