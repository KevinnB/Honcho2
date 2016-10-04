import { IPost } from './post.interface';

export class Twitter implements IPost {
    annotations: any;
    coordinates: [number, number];
    created_at: string;
    current_user_retweet: any;
    entities: any;
    favorite_count: number;
    favorited: boolean;

    constructor (public id: number) {
        
    }
}
