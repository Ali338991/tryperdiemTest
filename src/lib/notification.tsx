import notifee, { TriggerType, TimestampTrigger } from '@notifee/react-native';

type Props = {
  message: string;
  title?: string;
  delay?: number; 
};

async function displayNotification({ message, title = 'On tag list', delay = 0 }: Props) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  if (delay > 0) {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + delay * 1000, 
    };

    await notifee.createTriggerNotification(
      {
        title,
        body: message,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger
    );
  } else {
    await notifee.displayNotification({
      title,
      body: message,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }
}

export { displayNotification };
