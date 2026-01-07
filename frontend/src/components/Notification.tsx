import { Snackbar, Alert, AlertColor } from '@mui/material';
import React from 'react'

interface NotificationProps {
  children: (callback: (text: string, type: AlertColor) => void) => React.ReactElement;
}

export const Notification: React.FC<NotificationProps> = ({ children }): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [notificationObj, setNotificationObj] = React.useState<{ text: string; type: AlertColor }>();

  const openNotification = (text: string, type: AlertColor) => {
    setNotificationObj({
      text,
      type
    });
    setOpen(true);
  }

  return (
    <>
      {children(openNotification)}
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={notificationObj?.type}>
          {notificationObj?.text}
        </Alert>
      </Snackbar>
    </>
  )
}
