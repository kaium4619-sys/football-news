export function WorldCupLogo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M12 2C9.24 2 7 4.24 7 7C7 8.5 7.6 9.8 8.6 10.7C7.6 11.4 7 12.6 7 14C7 16.76 9.24 19 12 19C14.76 19 17 16.76 17 14C17 12.6 16.4 11.4 15.4 10.7C16.4 9.8 17 8.5 17 7C17 4.24 14.76 2 12 2Z" 
        fill="#CCFF00" 
      />
      <path 
        d="M10 22H14V20H10V22Z" 
        fill="#CCFF00" 
      />
      <path 
        d="M12 19V20" 
        stroke="#CCFF00" 
        strokeWidth="2" 
      />
      <circle cx="12" cy="7" r="2" fill="#0f172a" />
      <path d="M10 14C10 15.1 10.9 16 12 16C13.1 16 14 15.1 14 14H10Z" fill="#0f172a" />
    </svg>
  );
}
