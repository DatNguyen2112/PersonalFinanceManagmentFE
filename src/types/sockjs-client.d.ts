declare module 'sockjs-client' {
    interface SockJSOptions {
        server?: string;
        sessionId?: number | (() => string);
        transports?: string | string[];
        timeout?: number;
    }

    class SockJS {
        constructor(url: string, _reserved?: unknown, options?: SockJSOptions);
        readonly readyState: number;
        readonly protocol: string;
        onopen: ((event: Event) => void) | null;
        onmessage: ((event: MessageEvent) => void) | null;
        onclose: ((event: CloseEvent) => void) | null;
        onerror: ((event: Event) => void) | null;
        close(code?: number, reason?: string): void;
        send(data: string): void;
    }

    export default SockJS;
}
