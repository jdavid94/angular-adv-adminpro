import { environment } from '../../environments/environment';

const base_url = environment.url_base;

export class User {

    constructor (
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {}

    get imagesURL() {
        if (this.img?.includes('https')) {
            return this.img;
        }
        if (this.img) {
            return `${base_url}/upload/users/${this.img}`;
        }else{
            return `${base_url}/upload/users/no-img`;
        }
    }
}