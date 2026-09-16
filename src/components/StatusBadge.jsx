const colors = {
  active: "bg-emerald-100 text-emerald-700",
  slow: "bg-amber-100 text-amber-700",
  dead: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || ""}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
