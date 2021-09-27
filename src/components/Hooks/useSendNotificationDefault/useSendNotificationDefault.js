import { useConfig } from 'components/Hooks'

export const useSendNotificationDefault = (key) => {

    const config = useConfig()

    const sendNotificationDefault = config.items.filter((item) => {
        return item.Key === key
    })[0].YesNoValue

    return [
        {
            name: 'sendNotification',
            label: 'Send Email Notification',
            initialValue: sendNotificationDefault,
            control: 'switch',
        },
    ]
}
