import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRespository } from "@test/repositories/in-memory-notification-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe('Count recipients Notifications', () => {
    it('Should be able to Count recipients Notifications', async () => {
        const notificationsRespository = new InMemoryNotificationsRespository()
        const countRecipientNotifications = new CountRecipientNotifications(
            notificationsRespository,
        );

        await notificationsRespository.create(
            makeNotification({ recipientId: 'recipient-1' })
        );

        await notificationsRespository.create(
            makeNotification({ recipientId: 'recipient-1' })          
        );

        await notificationsRespository.create(
            makeNotification({ recipientId: 'recipient-2' })
        );

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);
    });
});




