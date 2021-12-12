import Notification from 'rc-notification';
import CloseSVG from '../assets/close.svg';
const defaultDuration = 3;
let notification: any = null;
const getNoticeProps = (args) => {
  const {
    duration: durationArg,
    description,
    message,
  } = args;
  const key = `key${Date.now()}`;
  const duration = durationArg === undefined ? defaultDuration : durationArg;

  return {
    content: (
      <div>
        <div className='notification-message'>
          {message}
        </div>
        <div className="notification-description">{description}</div>
      </div>
    ),
    key,
    duration,
    closable: true,
    closeIcon: <CloseSVG />,
    style: {
      right: 0,
    },
    onClose: () => {
      notification.removeNotice(key);
    },
  };
};
Notification.newInstance({
  prefixCls: 'easy-notification',
  style: {
    right: '0px',
    top: '24px',
  },
}, n => {
  notification = n;
});
const notice = (options) => {
  console.log(options);

  notification.notice(getNoticeProps(options));
};

const NotificationApi = {
  open: notice,
};
export default NotificationApi;
