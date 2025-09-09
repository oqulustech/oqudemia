import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface SessionExpireProps {
  open: boolean;
  onContinue: () => void;
  onLogout: () => void;
}

const SessionExpire: React.FC<SessionExpireProps> = ({ open, onContinue, onLogout }) => (
  <Dialog open={open} onClose={onLogout} maxWidth="xs" fullWidth>
    <DialogTitle>Session Expiring Soon</DialogTitle>
    <DialogContent>
      <Typography variant="body1">
        Your session is about to expire. Do you want to continue or logout?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onLogout} color="error" variant="outlined">Logout</Button>
      <Button onClick={onContinue} color="primary" variant="contained">Continue</Button>
    </DialogActions>
  </Dialog>
);

export default SessionExpire;
