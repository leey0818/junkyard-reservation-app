import SignupForm from './form';

export default function Page() {
  return (
    <main className="px-4 py-12 sm:px-10 sm:py-16">
      <h1 className="text-2xl font-semibold">회원가입</h1>
      <p>서비스를 이용하시려면 회원가입이 필요합니다.</p>
      <SignupForm />
    </main>
  )
}
