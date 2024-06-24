import { FILTER_PATH } from "@/constants";

export const salePrice = (price: number, sale = 0) => {
  return Math.ceil(price * (100 - sale) * 0.01);
};

export const checkPath = (path: string) => {
  return FILTER_PATH.some((filter) =>
    filter === "/" ? path === "/" : path.startsWith(filter)
  );
};

export const timeout = (ms = 3000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export function formatPhoneNumber(phoneNumber: string) {
  // 휴대전화 번호 형식 변환
  const mobilePattern = /(\d{3})(\d{4})(\d{4})/;
  if (mobilePattern.test(phoneNumber)) {
    return phoneNumber.replace(mobilePattern, "$1-$2-$3");
  }

  // 서울 전화 번호 형식 변환
  const seoulPattern = /(\d{2})(\d{3})(\d{4})/;
  if (seoulPattern.test(phoneNumber)) {
    return phoneNumber.replace(seoulPattern, "$1-$2-$3");
  }

  // 기타 지역 번호 형식 변환
  const localPattern = /(\d{3})(\d{3,4})(\d{4})/;
  if (localPattern.test(phoneNumber)) {
    return phoneNumber.replace(localPattern, "$1-$2-$3");
  }

  // 형식에 맞지 않는 경우 원본 반환
  return phoneNumber;
}
