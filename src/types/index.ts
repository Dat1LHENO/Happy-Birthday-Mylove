export interface Wish {
  id: number;
  author: string;
  message: string;
}

export interface Gift {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export interface SendGiftPayload {
  sender: string;
  gift: Gift;
}

export interface SubmitWishPayload {
  author: string;
  message: string;
}

export interface RsvpFormData {
  name: string;
  phone: string;
  guests: string;
}
