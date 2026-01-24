import * as React from "react";

interface StrawHatProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const StrawHat = React.forwardRef<SVGSVGElement, StrawHatProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Hat brim - wide curved base */}
      <ellipse cx="12" cy="16" rx="10" ry="3" />

      {/* Hat dome - rounded top */}
      <path d="M5 16 C5 16 4 13 6 10 C8 7 10 6 12 6 C14 6 16 7 18 10 C20 13 19 16 19 16" />

      {/* Hat band - horizontal stripe across middle */}
      <path d="M5.5 13 L18.5 13" strokeWidth="2" />
    </svg>
  )
);

StrawHat.displayName = "StrawHat";

export { StrawHat };
