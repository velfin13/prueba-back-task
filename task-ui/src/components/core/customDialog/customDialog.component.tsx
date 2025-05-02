import { SubjectManager } from '@/models';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { CSSProperties } from 'styled-components';

interface ActionButton {
  icon: React.ReactNode;
  color?: string;
  onClick: () => void;
}

interface Props {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: CSSProperties;
  actionButtons?: ActionButton[];
}

export const dialogOpenSubject$ = new SubjectManager<boolean>();
export const dialogCloseSubject$ = new SubjectManager<boolean>();

export const handleOpenDialog = () => {
  dialogOpenSubject$.setSubject = true;
};

export const handleCloseDialog = () => {
  dialogCloseSubject$.setSubject = false;
};

export const CustomDialog = ({ children, maxWidth, style, actionButtons }: Props) => {
  const [open, setOpen] = useState(false);
  let openSubject$ = new Subscription();
  let closeSubject$ = new Subscription();

  useEffect(() => {
    openSubject$ = dialogOpenSubject$.getSubject.subscribe(() => handleClickOpen());
    closeSubject$ = dialogCloseSubject$.getSubject.subscribe(() => handleClose());
    return () => {
      openSubject$.unsubscribe();
      closeSubject$.unsubscribe();
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    dialogCloseSubject$.setSubject = false;
  };

  return (
    <div>
      <Dialog
        open={open}
        style={style}
        onClose={() => handleExit()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth={maxWidth ?? 'sm'}
      >
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: '8px',
            zIndex: 1,
          }}
        >
          {actionButtons?.map((button, index) => (
            <IconButton
              key={index}
              aria-label={`action-button-${index}`}
              onClick={button.onClick}
              sx={{
                color: button.color || 'inherit',
              }}
            >
              {button.icon}
            </IconButton>
          ))}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle sx={{ m: 0, p: 0 }}>
        </DialogTitle>
        {children}
      </Dialog>
    </div>
  );
};

export default CustomDialog;