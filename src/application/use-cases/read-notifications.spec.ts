import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRespository } from "@test/repositories/in-memory-notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notifications";

describe('Read Notification', () => {
    it('Should be able to Read a notification', async () => {
        const notificationsRespository = new InMemoryNotificationsRespository()
        const readNotification = new ReadNotification(notificationsRespository);

        const notification = makeNotification();

        await notificationsRespository.create(notification);

        await readNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRespository.notifications[0].readAt).toEqual(
            expect.any(Date),
        )
    });

    it('Should not be able to Read a non existing notification', async () => {
        const notificationsRespository = new InMemoryNotificationsRespository()
        const readNotification = new ReadNotification(notificationsRespository);

        expect(() => {
            return readNotification.execute({
                notificationId: 'notificação-fake',
            });
        }).rejects.toThrow(NotificationNotFound)
    })
});



