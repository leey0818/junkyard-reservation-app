import Link from 'next/link';

export default function Home() {
  return (
    <main className="text-center">
      <h1 className="mb-4">폐차장 예약관리</h1>
      <Link href="/login" className="border bg-blue-500 text-white border-blue-600 rounded px-2 py-1">로그인 페이지로 이동</Link>
    </main>
  );
}
