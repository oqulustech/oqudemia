import { AlertType, AlertActionTypes, SHOW_ALERT, HIDE_ALERT } from '../actions/alertActions';

export interface AlertState {
  open: boolean;
  type: AlertType;
  message: string;
}

const initialState: AlertState = {
  open: false,
  type: 'info',
  message: '',
};

export default function alertReducer(
  state = initialState,
  action: AlertActionTypes
) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        open: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    case HIDE_ALERT:
      return {
        ...state,
        open: false,
        message: '',
      };
    default:
      return state;
  }
}
