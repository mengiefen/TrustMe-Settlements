import React, { useMemo } from "react";
type ButtonProps = {
  children?: React.ReactNode;
  label: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  bg?: string;
  otherClasses?: string;
};

const baseClasses =
  "text-center cursor-pointer focus:outline-none text-white rounded transition duration-200 ease-in-out font-semibold";

const buttonVariants = {
  primary: "hover:bg-secondary-600",
  secondary: "hover:bg-gray-700 ",
  tertiary: "hover:bg-red-700",
};

const buttonSizes = {
  small: "text-xs py-1 px-2",
  medium: "text-md py-2 px-4 ",
  large: "text-lg py-3 px-6",
};

const Button = ({
  label = "Click me",
  buttonType = "button",
  variant = "primary",
  size = "medium",
  bg = "bg-secondary-500",
  ...props
}: ButtonProps) => {
  // for optimization purpose
  const buttonClass = useMemo(() => {
    return `${baseClasses} ${buttonVariants[variant]} ${buttonSizes[size]} ${bg} ${props.otherClasses}}    
    `;
  }, [variant, size, bg, props.otherClasses]);

  return (
    <button type={buttonType} className={buttonClass} onClick={props.onClick}>
      {label}
      {props.children}
    </button>
  );
};

export default Button;
