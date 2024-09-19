# 숙소 플랫폼

개인 프로젝트로 제작한 간단한 숙소 등록 및 예약 플랫폼입니다.
React와 Next.js를 사용하여 동적이고 반응성 높은 UI를 구현했으며, Prisma와 Supabase를 통해 데이터를 효율적으로 관리합니다.
또한, React Hook Form을 이용한 최적화된 폼 처리와 유효성 검사를 통해 사용자 경험을 향상시켰습니다.
최적화된 이미지 로딩과 동적 임포트를 통해 빠른 페이지 로딩 속도를 구현하여 사용자 만족도를 높였습니다.
각 해상도에 맞는 반응형으로 디자인되었습니다.

## 🎯 기술 스택

- **HTML, CSS, TailwindCSS, TypeScript**
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
- **검색 기능 최적화**: 검색 기능에 Debounce 적용하여 한번의 콜
- **정적 사이트 생성 (SSG)**: 기간 한정 할인 이벤트 컴포넌트를 정적 페이지로 구현하여 성능과 SEO 개선

## 🎉 사용자 경험 개선

- **Parallel routes 및 Intercepting routes**: 유지보수와 사용자 경험을 향상시킨 auth 모달창 구현
