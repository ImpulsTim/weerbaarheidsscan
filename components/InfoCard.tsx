import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
}

export default function InfoCard({ icon: Icon, title, text }: InfoCardProps) {
  return (
    <div className="rounded-card border border-black/5 bg-white p-6 shadow-sm">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-lightgreen text-green">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mb-1 text-lg font-bold text-anthracite">{title}</h3>
      <p className="text-sm leading-relaxed text-anthracite/70">{text}</p>
    </div>
  );
}
