"use client";

import { selectedRoomState } from "@/atom";
import { DEFAULT_LAT, DEFAULT_LNG, ZOOM_LEVEL } from "@/constants";
import { RoomType } from "@/interface";
import axios from "axios";
import Script from "next/script";
import { BsMap } from "react-icons/bs";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { FullPageLoader } from "../Loader";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const setSelectedRoom = useSetRecoilState(selectedRoomState);

  const fetchRooms = async () => {
    const { data } = await axios("/api/rooms");
    return data as RoomType[];
  };

  const { data: rooms, isSuccess } = useQuery("map-rooms", fetchRooms);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: ZOOM_LEVEL,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      rooms?.map((room) => {
        const markerPosition = new window.kakao.maps.LatLng(room.lat, room.lng);

        // 마커 이미지 설정
        const imageSrc = "/images/marker-icon.png";
        const imageSize = new window.kakao.maps.Size(30, 30);
        const imageOption = { offset: new window.kakao.maps.Point(16, 46) };

        // 마커 이미지 생성
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);

        // custom overlay 설정
        const content = `<div class="custom_overlay">${room.price.toLocaleString()}원</div>`;
        // custom overlay 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content,
        });

        // 커스텀 오버레이가 지도위에 설정
        customOverlay.setMap(map);

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, "click", () => {
          setSelectedRoom(room);
        });

        // 지도 클릭 시 초기화
        window.kakao.maps.event.addListener(map, "click", () => {
          setSelectedRoom(null);
        });
      });
    });
  };
  return (
    <>
      {isSuccess ? (
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
          onReady={loadKakaoMap}
        />
      ) : (
        <FullPageLoader />
      )}
      <div id="map" className="w-full h-screen" />
    </>
  );
}

export function MapButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-2 items-center text-sm bg-black rounded-full text-white px-5 py-3.5 shadow-sm hover:shadow-lg mx-auto sticky bottom-12"
    >
      지도 표시하기
      <BsMap className="text-xs" />
    </button>
  );
}
