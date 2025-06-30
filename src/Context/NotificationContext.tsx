import React, { createContext, useState, useContext } from "react";

type NotificationType = "error" | "success" | "info";

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextProps {
  notification: Notification | null;
  showNotification: (message: string, type?: NotificationType) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const showNotification = (message: string, type: NotificationType = "error") => {
    setNotification({ message, type });
    if (hideTimeout) clearTimeout(hideTimeout);
    const timeout = setTimeout(() => setNotification(null), 7000);
    setHideTimeout(timeout);
  };

  const hideNotification = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    setNotification(null);
  };

  const handleMouseEnter = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setNotification(null), 7000);
    setHideTimeout(timeout);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
      {notification && (
        <div
          className={`notification-tooltip ${notification.type}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={hideNotification}
          style={{ cursor: "pointer" }}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};