
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  show?: boolean;
  onClose?: () => void;
}

const iconMap = {
  success: <CheckCircleIcon sx={{ color: '#fff', mr: 1 }} />,
  error: <ErrorIcon sx={{ color: '#fff', mr: 1 }} />,
  warning: <WarningIcon sx={{ color: '#fff', mr: 1 }} />,
  info: <InfoIcon sx={{ color: '#fff', mr: 1 }} />,
};

const bgMap = {
  success: 'rgba(76, 175, 80)',
  error: 'rgba(244, 67, 54)',
  warning: 'rgba(255, 193, 7)',
  info: 'rgba(33, 150, 243)',
};

const Alert: React.FC<AlertProps> = ({ type, message, show = true, onClose }) => {
  const [visible, setVisible] = React.useState(show);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (show) {
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 6000);
    } else {
      setVisible(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show, onClose]);

  if (!visible) return null;
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 1400,
        display: 'flex',
        alignItems: 'center',
        background: bgMap[type],
        borderRadius: 2,
        p: 2,
        boxShadow: 3,
        minWidth: 300,
        maxWidth: 400,
      }}
    >
      {iconMap[type]}
      <Typography variant="body1" sx={{ flex: 1, color: '#fff' }}>
        {message}
      </Typography>
      <Box component="span" sx={{ ml: 2, cursor: 'pointer', color: '#fff', fontWeight: 'bold', fontSize: 20 }} onClick={() => { setVisible(false); if (onClose) onClose(); }}>
        &#10005;
      </Box>
    </Box>
  );
};

export { Alert };

{/* <Alert type="success" message="Operation successful!" />
<Alert type="error" message="Something went wrong." onClose={() => setShow(false)} />
<Alert type="warning" message="Be careful!" />
<Alert type="info" message="This is an info message." /> */}