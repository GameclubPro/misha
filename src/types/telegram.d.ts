export {};

declare global {
  type TelegramInsets = {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: any;
        ready: () => void;
        expand: () => void;
        requestFullscreen?: () => void;
        contentSafeAreaInset?: TelegramInsets;
        safeAreaInset?: TelegramInsets;
        onEvent?: (event: "viewportChanged", callback: () => void) => void;
        offEvent?: (event: "viewportChanged", callback: () => void) => void;
        close: () => void;
        sendData: (data: string) => void;
      };
    };
  }
}
