import { AiOutlineStar } from "react-icons/ai";
import { BiSolidTree, BiWater } from "react-icons/bi";
import { BsHouseHeart } from "react-icons/bs";
import { GoContainer } from "react-icons/go";
import { FaHouseUser, FaUmbrellaBeach } from "react-icons/fa";
import {
  GiHolyOak,
  GiCaveEntrance,
  GiCampingTent,
  GiBarn,
  GiSkier,
  GiStarKey,
  GiVikingLonghouse,
  GiSpookyHouse,
  GiGolfTee,
  GiGrandPiano,
  GiPisaTower,
  GiTreehouse,
  GiWineBottle,
  GiIsland,
  GiPalette,
  GiJewelCrown,
  GiBlockHouse,
  GiHabitatDome,
} from "react-icons/gi";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { MdOutlineBedroomChild, MdOutlineSurfing } from "react-icons/md";
import { TbSwimming, TbMoodKid } from "react-icons/tb";
import { LuWarehouse } from "react-icons/lu";
import { PiIsland } from "react-icons/pi";

export const CATEGORY_DATA = [
  { title: "전망좋은", Icon: IoPartlySunnyOutline },
  { title: "자연", Icon: GiHolyOak },
  { title: "동굴", Icon: GiCaveEntrance },
  { title: "캠핑장", Icon: GiCampingTent },
  { title: "방", Icon: MdOutlineBedroomChild },
  { title: "한옥", Icon: FaHouseUser },
  { title: "해변", Icon: FaUmbrellaBeach },
  { title: "국립공원", Icon: BiSolidTree },
  { title: "인기", Icon: AiOutlineStar },
  { title: "수영장", Icon: TbSwimming },
  { title: "농장", Icon: GiBarn },
  { title: "스키", Icon: GiSkier },
  { title: "호수", Icon: BiWater },
  { title: "키즈", Icon: TbMoodKid },
  { title: "신규", Icon: GiStarKey },
  { title: "서핑", Icon: MdOutlineSurfing },
  { title: "통나무집", Icon: LuWarehouse },
  { title: "디자인", Icon: GiVikingLonghouse },
  { title: "저택", Icon: GiSpookyHouse },
  { title: "섬", Icon: PiIsland },
  { title: "주택", Icon: BsHouseHeart },
  { title: "골프장", Icon: GiGolfTee },
  { title: "그랜드 피아노", Icon: GiGrandPiano },
  { title: "상징적 도시", Icon: GiPisaTower },
  { title: "트리하우스", Icon: GiTreehouse },
  { title: "와인 농장", Icon: GiWineBottle },
  { title: "열대 지역", Icon: GiIsland },
  { title: "창작 공간", Icon: GiPalette },
  { title: "컨테이너 하우스", Icon: GoContainer },
  { title: "Luxe", Icon: GiJewelCrown },
  { title: "료칸", Icon: GiBlockHouse },
  { title: "돔하우스", Icon: GiHabitatDome },
];

export const DESKTOP_WIDTH = 1024;
export const MEDIUM_WIDTH = 768;
export const SMALL_WIDTH = 640;

/** 스크롤이 최상단에 있을 때 showFilter 해줄 경로들  */
export const FILTER_PATH = [
  "/",
  "/s/",
  "/exclusive-deals",
  "/advertise",
  "/signin",
];

/** @example png-pixel.com */
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8f/5iPQAH1ALwVpjYGQAAAABJRU5ErkJggg==";

export const LOCATION_DATA = {
  서울: "서울",
  경기: "경기",
  부산: "부산",
  대구: "대구",
  인천: "인천",
  광주: "광주",
  대전: "대전",
  울산: "울산",
};

type LocationType = (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA];

export const GEO_LOCATION_DATA: Record<
  LocationType,
  { lat: number; lng: number }
> = {
  [LOCATION_DATA.서울]: { lat: 37.566535, lng: 126.9779692 },
  [LOCATION_DATA.경기]: { lat: 37.567167, lng: 127.190292 },
  [LOCATION_DATA.부산]: { lat: 35.1795543, lng: 129.0756416 },
  [LOCATION_DATA.대구]: { lat: 35.8714354, lng: 128.601445 },
  [LOCATION_DATA.인천]: { lat: 37.4562557, lng: 126.7052062 },
  [LOCATION_DATA.광주]: { lat: 35.1595454, lng: 126.8526012 },
  [LOCATION_DATA.대전]: { lat: 36.3504119, lng: 127.3845475 },
  [LOCATION_DATA.울산]: { lat: 35.5383773, lng: 129.3113596 },
};

export const DEFAULT_LAT = 37.565337;
export const DEFAULT_LNG = 126.9772095;
export const ZOOM_LEVEL = 7;

const FEATURE_TYPE = {
  FREE_CANCEL: "FREE_CANCEL",
  PAID_CANCEL: "PAID_CANCEL",
  SELF_CHECKIN: "SELF_CHECKIN",
  SELF_CHECKIN_DISALLOWED: "SELF_CHECKIN_DISALLOWED",
  FREE_OFFICE_SPACE: "FREE_OFFICE_SPACE",
  NO_OFFICE_SPACE: "NO_OFFICE_SPACE",
};

type FeatureType = (typeof FEATURE_TYPE)[keyof typeof FEATURE_TYPE];

export const FeatureDesc: Record<FeatureType, string> = {
  [FEATURE_TYPE.FREE_CANCEL]: "무료 취소가 가능합니다.",
  [FEATURE_TYPE.PAID_CANCEL]: "무료 취소가 불가능합니다.",
  [FEATURE_TYPE.SELF_CHECKIN]: "셀프 체크인이 가능합니다.",
  [FEATURE_TYPE.SELF_CHECKIN_DISALLOWED]: "셀프 체크인이 불가능합니다.",
  [FEATURE_TYPE.FREE_OFFICE_SPACE]: "무료 사무공간이 제공됩니다.",
  [FEATURE_TYPE.NO_OFFICE_SPACE]: "사무공간이 제공되지 않습니다.",
};

export const RoomEditField = [
  "images",
  "imageKeys",
  "title",
  "base_address",
  "detailed_address",
  "desc",
  "bedroomDesc",
  "price",
  "category",
  "freeCancel",
  "selfCheckIn",
  "officeSpace",
  "hasMountainView",
  "hasShampoo",
  "hasFreeLaundry",
  "hasAirConditioner",
  "hasWifi",
  "hasBarbeque",
  "hasFreeParking",
];

export interface RoomFeatureProps {
  freeCancel?: boolean;
  selfCheckIn?: boolean;
  officeSpace?: boolean;
  hasMountainView?: boolean;
  hasShampoo?: boolean;
  hasFreeLaundry?: boolean;
  hasAirConditioner?: boolean;
  hasWifi?: boolean;
  hasBarbeque?: boolean;
  hasFreeParking?: boolean;
}

interface FieldProps {
  field: keyof RoomFeatureProps;
  label: string;
}

export const FeatureFormField: FieldProps[] = [
  {
    field: "freeCancel",
    label: "무료 취소",
  },
  {
    field: "selfCheckIn",
    label: "셀프 체크인",
  },
  {
    field: "officeSpace",
    label: "사무시설",
  },
  {
    field: "hasMountainView",
    label: "마운틴 뷰",
  },
  {
    field: "hasShampoo",
    label: "욕실 용품",
  },
  {
    field: "hasAirConditioner",
    label: "에어컨",
  },
  {
    field: "hasFreeLaundry",
    label: "무료 세탁",
  },
  {
    field: "hasWifi",
    label: "무료 와이파이",
  },
  {
    field: "hasBarbeque",
    label: "바베큐 시설",
  },
  {
    field: "hasFreeParking",
    label: "무료 주차",
  },
];

export const FormUrl = {
  CATEGORY: "/rooms/register/category",
  INFO: "/rooms/register/info",
  ADDRESS: "/rooms/register/address",
  FEATURE: "/rooms/register/feature",
  IMAGE: "/rooms/register/image",
};
