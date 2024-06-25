export default function Footer() {
  return (
    <footer className="bg-gray-50 py-2 min-h-[17vh]">
      <div className="max-w-screen-xl w-full mx-auto p-4 md:flex md:items-center md:justify-between border-b border-b-gray-200">
        <div className="tsxt-sm text-gray-800 sm:text-center">
          © 2024 <span className="hover:underline">Resortbnb.</span> All Rights
          Reserved.
        </div>
        <ul className="flex flex-wrap gap-4 items-center text-sm text-gray-800 mt-2 md:mt-0">
          <li>
            <a href="#" className="hover:underline">
              개인정보 처리방침
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              이용약관
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              공지사항
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              회사 세부정보
            </a>
          </li>
        </ul>
      </div>
      <div className="text-[10px] text-gray-400 mx-auto p-4 max-w-screen-xl">
        웹사이트 제공자: Resort bnb | 주소: 서울시 강남구 테헤란로 427 |
        전화번호: 02-1234-5678 | 이메일: resortbnb@test.com, 웹사이트 | 호스팅
        서비스 제공업체: vercel | resort bnb 는 통신판매 중개자로 resortbnb
        플랫폼을 통하여 게스트와 호스트 사이에 이루어지는 통신판매의 당사자가
        아닙니다. resortbnb 플랫폼을 통하여 예약된 숙소, 체험, 호스트 서비스에
        관한 의무와 책임은 해당 서비를 제공하는 호스트에게 있습니다.
      </div>
    </footer>
  );
}
