export function GraphCard({
  title,
  children,
  bgColor = "bg-white",
  onClick = null,
}) {
  return (
    <div
      className={`${bgColor} rounded-lg shadow-md border border-neutral2
                    p-4 flex flex-col h-full`}
      onClick={() => onClick()}
    >
      <h2 className="text-base font-semibold text-blacktxt mb-3">{title}</h2>

      <div className="flex-1">{children}</div>
    </div>
  );
}
