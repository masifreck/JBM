import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const DialogFun = (type, title, body) => {
  Dialog.show({
    type: type,
    title: title,
    textBody: body,
    button: 'close',
  });
};
const ToastFun = (type, title, body) => {
  Toast.show({
    type: type,
    title: title,
    textBody: body,
    autoClose:3000
  });
};

const showDialog = (Type_warning, title, body) => {
  switch (Type_warning) {
    case 'w':
      DialogFun(ALERT_TYPE.WARNING, title, body);
      break;
    case 'd':
      DialogFun(ALERT_TYPE.DANGER, title, body);
      break;
    case 'i':
      DialogFun(ALERT_TYPE.INFO, title, body);
      break;
    default:
      DialogFun(ALERT_TYPE.SUCCESS, title, body);
      break;
  }
};
const showToast = (Type_warning, title, body) => {
  switch (Type_warning) {
    case 'w':
      ToastFun(ALERT_TYPE.WARNING, title, body);
      break;
    case 'd':
      ToastFun(ALERT_TYPE.DANGER, title, body);
      break;
    case 'i':
      ToastFun(ALERT_TYPE.INFO, title, body);
      break;
    default:
      ToastFun(ALERT_TYPE.SUCCESS, title, body);
      break;
  }
};

export {showToast, showDialog};
