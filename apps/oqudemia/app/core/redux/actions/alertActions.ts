export type AlertType = 'success' | 'error' | 'warning' | 'info';

export const SHOW_ALERT = 'alert/showAlert';
export const HIDE_ALERT = 'alert/hideAlert';

export interface ShowAlertAction {
  type: typeof SHOW_ALERT;
  payload: {
    type: AlertType;
    message: string;
  };
}

export interface HideAlertAction {
  type: typeof HIDE_ALERT;
}

export type AlertActionTypes = ShowAlertAction | HideAlertAction;

export const showAlert = (type: AlertType, message: string): ShowAlertAction => ({
  type: SHOW_ALERT,
  payload: { type, message },
});

export const hideAlert = (): HideAlertAction => ({
  type: HIDE_ALERT,
});
