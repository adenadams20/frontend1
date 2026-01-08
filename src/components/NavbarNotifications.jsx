import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

export default function NavbarNotifications({ backendUrl }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");

  const fetchUnreadCount = async () => {
    try {
      if (!token) return setUnreadCount(0);

      const res = await fetch(`${backendUrl}/api/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;
      const data = await res.json();
      setUnreadCount(data.count ?? 0);
    } catch (e) {
      console.error("Erreur unread-count:", e);
    }
  };

  const fetchNotifications = async () => {
    try {
      if (!token) return setNotifications([]);

      const res = await fetch(`${backendUrl}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Erreur notifications:", e);
    }
  };

  const markAsRead = async (id) => {
    try {
      if (!token) return;

      const res = await fetch(`${backendUrl}/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;

      // MAJ UI (optimiste)
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (e) {
      console.error("Erreur markAsRead:", e);
    }
  };

  // Au montage: charge badge
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  // Quand on ouvre le dropdown: charge liste + refresh badge
  useEffect(() => {
    if (openDropdown) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [openDropdown]);

  // Fermer si clic dehors
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Icône cloche */}
      <button
        type="button"
        onClick={() => setOpenDropdown((v) => !v)}
        className="relative text-white hover:text-gray-300"
        aria-label="Notifications"
      >
        <Bell size={24} />

        {/* Badge dynamique */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full text-[11px] leading-[18px] text-white text-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {openDropdown && (
        <div className="absolute dark:bg-gray-800 dark:border-gray-700 right-0 mt-2 w-80 border shadow-lg rounded-lg z-50">
          <div className="px-3 py-2 border-b flex items-center justify-between">
            <span className="font-semibold text-sm">Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs text-gray-500">{unreadCount} non lue(s)</span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto p-2">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm p-2">Aucune notification</p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n._id}
                  type="button"
                  onClick={() => markAsRead(n._id)}
                  className={`w-full text-left p-2 rounded-md hover:bg-gray-100 transition ${
                    !n.isRead ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <div className="flex items-start text-gray-900 justify-between gap-2">
                    <p className={`text-sm ${!n.isRead ? "font-semibold" : "font-medium"}`}>
                      {n.title}
                    </p>
                    {!n.isRead && (
                      <span className="mt-1 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-gray-600 mt-1">{n.message}</p>

                  <p className="text-[11px] text-gray-500 mt-1">
                    {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
