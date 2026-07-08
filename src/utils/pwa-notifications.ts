const NOTIFICATION_ICON = '/favicon.svg';

export type DeviceNotificationPayload = {
    title: string;
    body: string;
    tag?: string;
    url?: string;
};

export const isNotificationSupported = () =>
    typeof window !== 'undefined' && 'Notification' in window;

export const getNotificationPermission = (): NotificationPermission | 'unsupported' => {
    if (!isNotificationSupported()) return 'unsupported';
    return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission | 'unsupported'> => {
    if (!isNotificationSupported()) return 'unsupported';
    if (Notification.permission === 'granted') return 'granted';
    if (Notification.permission === 'denied') return 'denied';
    return Notification.requestPermission();
};

export const showDeviceNotification = async ({
    title,
    body,
    tag = 'finance-notification',
    url = '/dashboard',
}: DeviceNotificationPayload) => {
    if (!isNotificationSupported()) return false;

    const permission = await requestNotificationPermission();
    if (permission !== 'granted') return false;

    const options: NotificationOptions = {
        body,
        icon: NOTIFICATION_ICON,
        badge: NOTIFICATION_ICON,
        tag,
        data: { url },
        requireInteraction: false,
    };

    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(title, options);
        return true;
    }

    const notification = new Notification(title, options);
    notification.onclick = () => {
        window.focus();
        if (url) window.location.href = url;
        notification.close();
    };

    return true;
};
