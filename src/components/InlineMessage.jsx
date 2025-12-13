// src/components/InlineMessage.jsx
export default function InlineMessage({ type = "error", title, message }) {
  if (!message && !title) return null;

  const styles = {
    error: "border-red-200 bg-red-50 text-red-800",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
    success: "border-green-200 bg-green-50 text-green-800",
  };

  const badge = {
    error: "Erreur",
    warning: "Attention",
    info: "Info",
    success: "OK",
  };

  return (
    <div className={`mt-3 rounded-lg border p-3 ${styles[type] || styles.error}`}>
      <div className="flex items-start gap-2">
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70">
          {badge[type] || "Erreur"}
        </span>

        <div className="flex-1">
          {title ? <div className="font-semibold">{title}</div> : null}
          {message ? <div className="text-sm mt-1">{message}</div> : null}
        </div>
      </div>
    </div>
  );
}
