import { Alert } from '@mui/material';
import { useNotif } from '../hooks/store';

const Notif = () => {
  const notification = useNotif()
  if (notification.message) {
    return (
      <Alert
        style={{ marginTop: 10, marginBottom: 10 }}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    );
  }
};

export default Notif;
