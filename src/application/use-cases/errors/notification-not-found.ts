export class NotificationNotFound extends Error {
    constructor() {
        super('Notificação nao encontrada');
    }
}