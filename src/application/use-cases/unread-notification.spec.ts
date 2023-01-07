import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRespository } from "@test/repositories/in-memory-notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";

describe('Unread Notification', () => {
    it('Should be able to Unread a notification', async () => {
        const notificationsRespository = new InMemoryNotificationsRespository()
        const unReadNotification = new UnreadNotification(notificationsRespository);

        const notification = makeNotification({
            readAt: new Date(),
        });

        await notificationsRespository.create(notification);

        await unReadNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRespository.notifications[0].readAt).toBeNull()
    });

    it('Should not be able to Unread a non existing notification', async () => {
        const notificationsRespository = new InMemoryNotificationsRespository()
        const unReadNotification = new UnreadNotification(notificationsRespository);

        expect(() => {
            return unReadNotification.execute({
                notificationId: 'notificação-fake',
            });
        }).rejects.toThrow(NotificationNotFound)
    })
});



