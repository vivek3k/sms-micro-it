
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
}

const FormField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = "text",
  name
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine the actual input type based on password visibility
  const inputType = type === "password" 
    ? (showPassword ? "text" : "password") 
    : type;
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input 
          id={id} 
          name={name || id}
          type={inputType} 
          placeholder={placeholder}
          value={value}
          onChange={onChange} 
          className={type === "password" ? "pr-10" : ""}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
