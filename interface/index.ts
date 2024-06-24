import { ReactNode } from "react";

export type DetailFilterType = "location" | "checkIn" | "checkOut" | "guest";

export interface FilterProps {
  location: string;
  checkIn: string;
  checkOut: string;
  guest: number;
  category: string;
}

export interface FilterComponentProps {
  filterValue: FilterProps;
  setFilterValue: React.Dispatch<React.SetStateAction<FilterProps>>;
  setDetailFilter: React.Dispatch<
    React.SetStateAction<DetailFilterType | null>
  >;
}

export interface FilterLayoutProps {
  children: ReactNode;
  isShow: boolean;
}

export interface LikeType {
  id: number;
  roomId: number;
  userId: string;
  createdAt: string;
  room: RoomType;
}

export interface CommentType {
  id: number;
  createdAt: string;
  roomId: number;
  userId: string;
  body: string;
  room: RoomType;
  user: UserType;
}

export interface CommentApiType {
  data: CommentType[];
  totalCount: number;
  page?: number;
  totalPage?: number;
}
export interface RoomApiType {
  data: RoomType[];
  totalCount: number;
  page: number;
  totalPage: number;
}

export interface RoomType {
  id: number;
  images: string[];
  imageKeys?: string[];
  title: string;
  base_address: string;
  detailed_address?: string;
  desc?: string;
  bedroomDesc?: string;
  price: number;
  category: string;
  lat: string;
  lng: string;
  user?: UserType;
  userId?: number;
  freeCancel: boolean;
  selfCheckIn: boolean;
  officeSpace: boolean;
  hasMountainView: boolean;
  hasShampoo: boolean;
  hasFreeLaundry: boolean;
  hasAirConditioner: boolean;
  hasWifi: boolean;
  hasBarbeque: boolean;
  hasFreeParking: boolean;
  guestPreferences: boolean;
  sale?: number;
  createdAt?: string;
  updatedAt?: string;
  likes?: LikeType[];
  comments?: CommentType[];
  bookings?: BookingType[];
}

export interface FaqType {
  id: number;
  title: string;
  desc: string;
}

export interface LocationType {
  lat?: number | null;
  lng?: number | null;
  zoom?: number;
}

export interface ParamsProps {
  params: { id: string };
}

interface Account {
  id: string;
  provider: string;
}
export interface UserType {
  id: number;
  email: string;
  name?: string;
  image?: string;
  desc?: string;
  address?: string;
  phone?: string;
  rooms: RoomType[];
  account: Account[];
  comment?: Comment[];
  bookings?: BookingType[];
}

export interface BookingParams {
  params: { id: string };
  searchParams: {
    checkIn: string;
    checkOut: string;
    guestCount: string;
    totalDays: string;
  };
}

export interface BookingType {
  id: number;
  roomId: number;
  userId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  totalAmount: number;
  totalDays: number;
  dayPrice: number;
  status: "SUCCESS" | "CANCEL";
  discounted?: number;
  createdAt: string;
  updatedAt: string;
  room: RoomType;
  user: UserType;
  events?: EventsType;
  payments?: PaymentType[];
}

export interface EventsType {
  id: number;
  title: string;
  term: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export enum PaymentStatus {
  READY = "READY",
  IN_PROGRESS = "IN_PROGRESS",
  WAITING_FOR_DEPOSIT = "WAITING_FOR_DEPOSIT",
  DONE = "DONE",
  CANCELED = "CANCELED",
  PARTIAL_CANCELED = "PARTIAL_CANCELED",
  ABORTED = "ABORTED",
  EXPIRED = "EXPIRED",
}

export interface PaymentType {
  id: string;
  paymentKey: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  orderId: string;
  orderName: string;
  approvedAt: string;
  mId?: string;
  receiptUrl?: string;
  cardNumber?: string;
  method?: string;
}

interface RoomFormType {
  images: string[];
  imageKeys?: string[];
  title: string;
  base_address: string;
  detailed_address: string;
  desc: string;
  bedroomDesc: string;
  price: number;
  category: string;
  lat: string;
  lng: string;
  userId: number;
  freeCancel: boolean;
  selfCheckIn: boolean;
  officeSpace: boolean;
  hasMountainView: boolean;
  hasShampoo: boolean;
  hasFreeLaundry: boolean;
  hasAirConditioner: boolean;
  hasWifi: boolean;
  hasBarbeque: boolean;
  hasFreeParking: boolean;
}

export type RoomFormOptionalType = Partial<RoomFormType>;

export interface SearchProps {
  q: string | null;
}
