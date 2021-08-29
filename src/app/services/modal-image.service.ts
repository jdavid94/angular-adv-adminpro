import { Injectable, EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment';

const base_URL = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  public type?: 'users' | 'doctors' | 'hospitals';
  public id: string | undefined;
  public img: string | undefined;
  public newImg: EventEmitter<string> = new EventEmitter();

  get hideModal() {
    return this._hideModal;
  }

  openModal(type: 'users' | 'doctors' | 'hospitals', id: string, img: string = 'not-image') {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    //this.img = img;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_URL}/upload/${type}/${img}`;
    }
    //console.log(this.img);
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() { }
}
