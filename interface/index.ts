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
  title: string;
  children: ReactNode;
  isShow: boolean;
}

export interface LikeType {
  id: number;
  roomId: number;
  userId: number;
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

export interface RoomType {
  id: number;
  images: string[];
  imageKeys?: string[];
  title: string;
  address: string;
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
  lat?: string | null;
  lng?: string | null;
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
    totalAmount: string;
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
  status: "SUCCESS" | "CANCEL";
  createdAt: string;
  updatedAt: string;
  room: RoomType;
  user: UserType;
  payments?: PaymentType[];
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
  address: string;
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
