import { InMemoryNotificationsRespository } from "@test/repositories/in-memory-notification-repository";
import { SendNotification } from "./send-notification";

describe('Send Notification', () => {
    it('Should be able to send a notification', async () => {

        const notificationsRespository = new InMemoryNotificationsRespository()
        const sendNotification = new SendNotification(notificationsRespository);

        const { notification } = await sendNotification.execute({
            category: 'Isso é uma notificação',
            content: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notificationsRespository.notifications).toHaveLength(1);
        expect(notificationsRespository.notifications[0]).toEqual(notification);

    });
})




