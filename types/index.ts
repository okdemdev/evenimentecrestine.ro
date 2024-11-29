export interface IEvent {
  _id: string;
  title: string;
  hour: string;
  month: string;
  day: string;
  location: string;
  category: string;
  about: string;
  image: string;
  organizer: string;
  price: string;
  createdAt?: Date;
}
