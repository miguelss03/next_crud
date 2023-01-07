import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRespository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Cancel Notification', () => {
    it('Should be able to Cancel a notification', async () => {
        const notificationsRespository = new InMemoryNotificationsRespository()
        const cancelNotification = new CancelNotification(notificationsRespository);

        const notification = makeNotification();

        await notificationsRespository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRespository.notifications[0].canceledAt).toEqual(
            expect.any(Date),
        )
    });

    it('Should not be able to Cancel a non existing notification', async () => {
        const notificationsRespository = new InMemoryNotificationsRespository()
        const cancelNotification = new CancelNotification(notificationsRespository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'notificação-fake',
            });
        }).rejects.toThrow(NotificationNotFound)
    })
});



