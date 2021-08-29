import { environment } from '../../environments/environment';

const base_url = environment.url_base;

export class User {

    constructor (
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public roles?: string,
        public uid?: string,
    ) {}

    get imagesURL() {
        if (!this.img) {
            return `${base_url}/upload/users/no-img`;
        } else if (this.img?.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${base_url}/upload/users/${this.img}`;
        }else{
            return `${base_url}/upload/users/no-img`;
        }
    }
}