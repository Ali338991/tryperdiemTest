import {notificationChannelId} from '@app/constant';
import notifee, {TriggerType, TimestampTrigger} from '@notifee/react-native';

type Props = {
  message: string;
  title?: string;
  delay?: number;
};
async function createNotificationChannel() {
  await notifee.requestPermission();
  await notifee.createChannel({
    id: notificationChannelId,
    name: 'Default Channel',
  });
}
async function displayNotification({message, title = 'On tag list'}: Props) {
  await notifee.displayNotification({
    title,
    body: message ? `${message} are ON` : 'No tag on',
    android: {
      channelId: notificationChannelId,
      pressAction: {
        id: notificationChannelId,
      },
    },
  });
}
async function scheduleNotification({
  message,
  title = 'On tag list',
  delay = 0,
}: Props) {
  if (delay <= 0) return;

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + delay * 1000,
  };

  await notifee.createTriggerNotification(
    {
      title,
      body: message ? `${message} are ON` : 'No tag on',
      android: {
        channelId: notificationChannelId,
        pressAction: {
          id: notificationChannelId,
        },
      },
    },
    trigger,
  );
}

export {displayNotification, scheduleNotification, createNotificationChannel};
