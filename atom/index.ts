import { DEFAULT_LAT, DEFAULT_LNG, ZOOM_LEVEL } from "@/constants";
import {
  DetailFilterType,
  FilterProps,
  LocationType,
  RoomFormOptionalType,
  RoomType,
  SearchProps,
} from "@/interface";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const selectedRoomState = atom<RoomType | null>({
  key: "room",
  default: null,
});

export const locationState = atom<LocationType>({
  key: "location",
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: ZOOM_LEVEL,
  },
});

export const detailFilterState = atom<DetailFilterType | null>({
  key: "detailFilter",
  default: null,
});

export const filterState = atom<FilterProps>({
  key: "filter",
  default: {
    location: "",
    checkIn: "",
    checkOut: "",
    guest: 0,
    category: "",
  },
});

export const roomFormState = atom<RoomFormOptionalType | null>({
  key: "roomForm",
  default: {
    images: [],
    title: "",
    base_address: "",
    detailed_address: "",
    desc: "",
    bedroomDesc: "",
    price: 0,
    category: "",
    lat: "",
    lng: "",
    freeCancel: false,
    selfCheckIn: false,
    officeSpace: false,
    hasMountainView: false,
    hasShampoo: false,
    hasFreeLaundry: false,
    hasAirConditioner: false,
    hasWifi: false,
    hasBarbeque: false,
    hasFreeParking: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const searchState = atom<SearchProps>({
  key: "search",
  default: {
    q: null,
  },
});

export const prevPathState = atom<string | undefined>({
  key: "prevPathState",
  default: undefined,
});
