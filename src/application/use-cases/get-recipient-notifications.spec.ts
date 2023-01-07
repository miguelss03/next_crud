import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRespository } from "@test/repositories/in-memory-notification-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Get recipients Notifications', () => {
    it('Should be able to Get recipients Notifications', async () => {
        const notificationsRespository = new InMemoryNotificationsRespository()
        const getRecipientNotifications = new GetRecipientNotifications(
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

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({recipientId: 'recipient-1'}),
                expect.objectContaining({recipientId: 'recipient-1'})
            ])
        )
    });
});




