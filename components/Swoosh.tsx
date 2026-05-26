// Subtiele decoratieve swoosh/cirkel, passend bij de Impuls-stijl.
// Puur decoratief, dus aria-hidden.
export default function Swoosh({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path
        d="M40 360 C 180 200, 420 200, 560 360"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.5"
        strokeLinecap="round"
      />
      <circle cx="300" cy="300" r="180" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    </svg>
  );
}
