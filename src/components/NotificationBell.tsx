// npm install @stomp/stompjs sockjs-client axios
// Drop this component anywhere in your layout header

import { useState, useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { useTransactionsFacade } from "../store/transactions/facade";

const API = "/api/v1/notifications";
// const WS_URL = "http://localhost:8080/ws";

// ── Types ───────────────────────────────────────────────────────────────────

interface BellIconProps {
    hasUnread: boolean;
}

interface TypeConfigItem {
    color: string;
    bg: string;
    label: string;
    icon: string;
}

interface Notification {
    id: number | string;
    type: string;
    title?: string;
    message: string;
    read: boolean;
    createdAt: string;
    isNew?: boolean;
}

interface WSMessage {
    type: string;
    title?: string;
    message: string;
}

interface NotificationBellProps {
    userId?: string | number | null;
    token?: string | null;
}

// ── Icons ────────────────────────────────────────────────────────────────────

const BellIcon = ({ hasUnread }: BellIconProps) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        {hasUnread && <circle cx="18" cy="6" r="4" fill="#EF4444" stroke="white" strokeWidth="1.5" />}
    </svg>
);

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// ── Type config ───────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<string, TypeConfigItem> = {
    TRANSACTION: {
        color: "#3B82F6",
        bg: "#EFF6FF",
        label: "Giao dịch",
        icon: "💳",
    },
    BUDGET_ALERT: {
        color: "#F97316",
        bg: "#FFF7ED",
        label: "Ngân sách",
        icon: "⚠️",
    },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(isoString: string): string {
    const diff = (Date.now() - new Date(isoString).getTime()) / 1000;
    if (diff < 60) return "vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function NotificationBell({ userId, token }: NotificationBellProps) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<Notification[]>([]);
    const [unread, setUnread] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const stompRef = useRef<Client | null>(null);

    const transactionFacade = useTransactionsFacade();
    const facadeRef = useRef(transactionFacade);

    useEffect(() => {
        facadeRef.current = transactionFacade;
    }, [transactionFacade]);

    // ── Fetch from REST on open ─────────────────────────────────────────────

    const fetchNotifications = useCallback(async (p = 1) => {
        if (!token) return;
        setLoading(true);
        try {
            const { data } = await axios.get(API, {
                params: { page: p, size: 20 },
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(prev => (p === 1 ? data.content : [...prev, ...data.content]));
            setHasMore(!data.last);
            setPage(p);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const fetchUnreadCount = useCallback(async () => {
        if (!token) return;
        try {
            const { data } = await axios.get(`${API}/unread-count`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUnread(data.count);
        } catch (error) {
            console.error("Failed to fetch unread count:", error);
        }
    }, [token]);

    // ── Prepend Notification callback ──────────────────────────────────────────

    const prependNotification = useCallback((wsMsg: WSMessage) => {
        const newItem: Notification = {
            id: Date.now(),          // temp id until page reload
            type: wsMsg.type || "TRANSACTION",
            title: wsMsg.title,
            message: wsMsg.message,
            read: false,
            createdAt: new Date().toISOString(),
            isNew: true,               // triggers flash animation
        };
        setItems(prev => [newItem, ...(prev || [])]);
        setUnread(prev => prev + 1);
    }, []);

    // ── WebSocket — receive real-time pushes ────────────────────────────────

    useEffect(() => {
        if (!userId) return;
        const client = new Client({
            webSocketFactory: () => new WebSocket(
                "wss://finance.pro.vn/ws"
            ),
            connectHeaders: {
                Authorization: `Bearer ${token}`,   // send JWT on WS handshake
            },
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/user/${userId}/topic/transactions`, ({ body }) => {
                    try {
                        const msg = JSON.parse(body) as WSMessage;
                        if (!msg.type) msg.type = "TRANSACTION";
                        prependNotification(msg);
                        
                        // Automatically reload transaction table, dashboard and accounts
                        facadeRef.current.getListTransaction({ page: 1, size: 20 });
                        facadeRef.current.getTransactionDashboard();
                        facadeRef.current.getAccounts();
                    } catch (e) {
                        console.error("Failed to parse transaction notification:", e);
                    }
                });
                client.subscribe(`/user/${userId}/topic/budget-alerts`, ({ body }) => {
                    try {
                        const msg = JSON.parse(body) as WSMessage;
                        if (!msg.type) msg.type = "BUDGET_ALERT";
                        prependNotification(msg);
                        
                        // Automatically reload budget summary and dashboard
                        facadeRef.current.getBudgetSummary({
                            year: new Date().getFullYear(),
                            month: new Date().getMonth() + 1
                        });
                        facadeRef.current.getTransactionDashboard();
                    } catch (e) {
                        console.error("Failed to parse budget alert:", e);
                    }
                });
            },
            onStompError: (frame) => console.error("STOMP error", frame),
        });
        client.activate();
        stompRef.current = client;
        return () => {
            client.deactivate();
        };
    }, [userId, prependNotification]);

    // ── Open / close ─────────────────────────────────────────────────────────

    useEffect(() => {
        fetchUnreadCount();
    }, [fetchUnreadCount]);

    useEffect(() => {
        if (open) fetchNotifications(1);
    }, [open, fetchNotifications]);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // ── Actions ───────────────────────────────────────────────────────────────

    const markRead = useCallback(async (id: number | string) => {
        if (!token) return;
        try {
            await axios.patch(`${API}/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
            setUnread(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    }, [token]);

    const markAllRead = useCallback(async () => {
        if (!token) return;
        try {
            await axios.patch(`${API}/read-all`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(prev => prev.map(n => ({ ...n, read: true })));
            setUnread(0);
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
        }
    }, [token]);

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div style={{ position: "relative", display: "inline-block" }} ref={dropdownRef}>

            {/* Bell button */}
            <button onClick={() => setOpen(o => !o)} style={styles.bellBtn}>
                <BellIcon hasUnread={unread > 0} />
                {unread > 0 && (
                    <span style={styles.badge}>{unread > 99 ? "99+" : unread}</span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div style={styles.dropdown}>

                    {/* Header */}
                    <div style={styles.header}>
                        <span style={styles.headerTitle}>Thông báo</span>
                        {unread > 0 && (
                            <button onClick={markAllRead} style={styles.markAllBtn}>
                                <CheckIcon /> Đọc tất cả
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div style={styles.list}>
                        {items?.length === 0 && !loading && (
                            <div style={styles.empty}>
                                <span style={{ fontSize: 32 }}>🔔</span>
                                <p style={{ margin: "8px 0 0", color: "#9CA3AF", fontSize: 13 }}>
                                    Chưa có thông báo nào
                                </p>
                            </div>
                        )}

                        {items?.map((n) => {
                            const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.TRANSACTION;
                            return (
                                <div
                                    key={n.id}
                                    onClick={() => !n.read && markRead(n.id)}
                                    style={{
                                        ...styles.item,
                                        background: n.read ? "transparent" : "#F8FAFF",
                                        animation: n.isNew ? "slideIn 0.3s ease" : "none",
                                        cursor: n.read ? "default" : "pointer",
                                    }}
                                >
                                    {/* Icon */}
                                    <div style={{ ...styles.iconWrap, background: cfg.bg }}>
                                        <span style={{ fontSize: 16 }}>{cfg.icon}</span>
                                    </div>

                                    {/* Text */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={styles.itemTitle}>
                                            <span style={{ ...styles.typeTag, background: cfg.bg, color: cfg.color }}>
                                                {cfg.label}
                                            </span>
                                            {!n.read && <span style={styles.unreadDot} />}
                                        </div>
                                        <p style={styles.itemMsg}>{n.message}</p>
                                        <span style={styles.itemTime}>{timeAgo(n.createdAt)}</span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Load more */}
                        {hasMore && (
                            <button
                                onClick={() => fetchNotifications(page + 1)}
                                disabled={loading}
                                style={styles.loadMore}
                            >
                                {loading ? "Đang tải..." : "Xem thêm"}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
    bellBtn: {
        position: "relative",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "10px",
        color: "#374151",
        display: "flex",
        alignItems: "center",
        transition: "background 0.15s",
    },
    badge: {
        position: "absolute",
        top: 2,
        right: 2,
        background: "#EF4444",
        color: "#fff",
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 99,
        minWidth: 16,
        height: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 3px",
        border: "1.5px solid white",
    },
    dropdown: {
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: 360,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        border: "1px solid #E5E7EB",
        zIndex: 1000,
        overflow: "hidden",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderBottom: "1px solid #F3F4F6",
    },
    headerTitle: {
        fontWeight: 700,
        fontSize: 15,
        color: "#111827",
    },
    markAllBtn: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#3B82F6",
        fontSize: 12,
        fontWeight: 600,
        padding: "4px 8px",
        borderRadius: 6,
    },
    list: {
        maxHeight: 420,
        overflowY: "auto",
    },
    empty: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 0",
    },
    item: {
        display: "flex",
        gap: 12,
        padding: "12px 16px",
        borderBottom: "1px solid #F9FAFB",
        transition: "background 0.15s",
    },
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    itemTitle: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 3,
    },
    typeTag: {
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 6px",
        borderRadius: 4,
        letterSpacing: 0.3,
    },
    unreadDot: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#3B82F6",
        marginLeft: "auto",
    },
    itemMsg: {
        margin: 0,
        fontSize: 12.5,
        color: "#374151",
        lineHeight: 1.45,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 270,
    },
    itemTime: {
        fontSize: 11,
        color: "#9CA3AF",
        marginTop: 3,
        display: "block",
    },
    loadMore: {
        width: "100%",
        padding: "10px",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#3B82F6",
        fontSize: 13,
        fontWeight: 600,
        borderTop: "1px solid #F3F4F6",
    },
};