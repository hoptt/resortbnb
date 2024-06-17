prisma 사용하여 DB 에 쉽게 접근

dev 환경에서 PrismaClient 를 인스턴스화 해주어서 핫 리로딩 시 매번 PrismaClient 재생성되는 문제 해결

recoil 사용하여 전역 상태 관리

Kakao Map Api 사용하여 숙소들의 위치를 지도에 표시하고 마커 클릭 시 숙소 상세 정보 나오도록 구현
맵 컴포넌트 접근 시 리소스 파일 받도록 Dynamic import => 번들 사이즈 ↓
스크립트 파일은 HTML 이 parsing 된 이후 불러오도록하여 초기 로딩시간 단축

Next auth 로 사용자 인증 구현 ( 구글, 네이버, 카카오 )
서버측 session, 클라이언트측 jwt

토스 페이먼츠 결제 연동
공식 테스트키 사용으로 인한 영수증 출력 불가

React-hook-form 사용하여 숙소등록 구현
Recoil-persist 로 숙소등록 폼에서 항상 상태 유지되도록 구현

Firebase storage 에 파일 저장

cypress 사용하여 필터 동작 테스트

next-bundle-analyze 사용하여 불필요한 번들 체크
대표적으로 tree-shaking

kakao map 부분은 lazy-loading 적용하여 맵에 접속했을때에 리소스 파일 받아 초기 로딩은 빠르게 적용

나의 숙소 관리에 검색 부분 debounce 처리하여 최적화

storybook 이용하여 디자인 시스템 관리
chromatic 으로 storybook 따로 배포
https://6662b32c0b44f934b72785fe-mpkysrxxss.chromatic.com/

Parallel routes 와 Intercepting routes 이용하여 auth 모달창 구현
~/signin 주소를 치고 들어가면 페이지 형식의 auth 가 나오고~
~router 혹은 link 로 /signin 주소로 들어가면 모달형식의 auth 가 등장~
주소로 직접 접근 시 redirect 메인페이지로 이동하도록 구현
유지보수와 사용자 경험을 향상시킨 auth 동작을 구현

기간 한정 할인 혜택 이벤트의 페이지는 정적(SSG)페이지 형식으로 구현
