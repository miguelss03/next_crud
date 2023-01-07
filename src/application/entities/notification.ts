/// Entidade de notificação

import { randomUUID } from "crypto";
import { Replace } from "src/helpers/Replace";
import { Content } from "./content";

export interface NotificationProps {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    canceledAt?: Date | null;
    createdAt: Date;
}

export class Notification {
    private _id: string;
    private props: NotificationProps;

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>,
        id?: string
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public get id() {
        return this._id;
    }

    //#1
    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }

    public get recipientId(): string {
        return this.props.recipientId;
    }

    //#2
    public set content(content: Content) {
        this.props.content = content;
    }

    public get content(): Content {
        return this.props.content;
    }

    //#3
    public set category(category: string) {
        this.props.category = category;
    }

    public get category(): string {
        return this.props.category;
    }

    //#4
    public read() {
        this.props.readAt = new Date();
    }

    public unRead() {
        this.props.readAt = null;
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }

    //#Cancelado
    public cancel() {
        this.props.canceledAt = new Date();
    }

    public get canceledAt(): Date | null | undefined {
        return this.props.canceledAt;
    }

    //#5
    public get createdAt(): Date {
        return this.props.createdAt;
    }

}



