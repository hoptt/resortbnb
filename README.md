# 숙소 플랫폼

## 🎯 기술 스택

- **HTML, CSS, TypeScript**
- **Next.js**: 서버 측 렌더링, 라우팅 등을 위한 React 프레임워크
- **Prisma**: TypeScript와 Node.js를 위한 데이터베이스 툴킷
- **Supabase**: 백엔드 서비스의 오픈 소스 Firebase 대안

## 📜 주요 라이브러리

- **react-hook-form**: 검증 및 로딩 처리가 최적화된 폼 관리
- **recoil**: 전역 상태 관리 및 persist 로 숙소등록 폼 localstorage 저장
- **react-query**: 데이터 가져오기 및 캐싱, 무한 스크롤 및 optimistic update (좋아요 기능) 구현

## 🛠️ 사용된 도구

- **Storybook**: 재사용할 컴포넌트 정의 chromatic 으로 storybook 따로 배포 https://6662b32c0b44f934b72785fe-mpkysrxxss.chromatic.com/
- **Cypress**: 숙소 필터 검색 부분 엔드 투 엔드 테스트
- **next-bundle-analyze**: 번들 크기 분석 및 tree-shaking 체크

## 📁 이미지 저장소

- **Firebase Storage**

## 🗺️ 지도

- **Kakao Map API**: 숙소 위치를 지도에 표시하고 상세 정보를 제공하기 위해 사용
  - 초기 번들 크기 감소를 위해 맵 컴포넌트를 동적 임포트 (Dynamic Import)
  - HTML 파싱 후 스크립트 파일 로드하여 사용자 경험 향상 및 초기 렌더링 시간 단축

## 💳 결제 연동

- **Toss Payment**: Toss Payments를 이용한 결제 게이트웨이 연동

## ☑️ 인증

- **next-auth**: Google, Naver, Kakao 인증 제공

## 🧐 진행 중 발생한 문제들

- **PrismaClient 핫 리로딩**: dev 환경에서 PrismaClient 를 인스턴스화 하여 핫 리로딩 시 매번 PrismaClient 재생성되는 문제 해결

## 👏 최적화 작업

- **Next.js Image 컴포넌트**: 이미지 로딩 최적화 및 캐싱 처리, CLS 방지를 위한 placeholder 및 blurDataURL 사용
- **Next.js Font 최적화**: 브라우저에서 font 파일을 따로 요청하지 않고, 초기 렌더링 시에 이미 로드된 폰트 사용. size-adjust 적용되어있어 CLS 방지
- **검색 기능 최적화**: 최적화를 위해 검색 기능에 Debounce 적용
- **정적 사이트 생성 (SSG)**: 기간 한정 할인 이벤트 컴포넌트를 정적 페이지로 구현하여 성능과 SEO 개선

## 🎉 사용자 경험 개선

- **Parallel routes 및 Intercepting routes**: 유지보수와 사용자 경험을 향상시킨 auth 모달창 구현
