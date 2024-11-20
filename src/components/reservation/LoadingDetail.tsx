function LoadingText() {
  return (
    <p className="h-4 my-1 rounded-full bg-neutral-200 animate-pulse w-11/12"></p>
  );
}

export default function LoadingDetail() {
  return (
    <>
      <h1 className="text-xl font-bold">차량 정보</h1>
      <div className="grid grid-cols-2 mb-6">
        <div>
          <h2 className="text-lg font-semibold">제조사</h2>
          <LoadingText />
        </div>
        <div>
          <h2 className="text-lg font-semibold">모델/연식</h2>
          <LoadingText />
        </div>
      </div>

      <h1 className="text-xl font-bold">예약자 정보</h1>
      <div className="grid grid-cols-2 mb-6">
        <div>
          <h2 className="text-lg font-semibold">성명</h2>
          <LoadingText />
        </div>
        <div>
          <h2 className="text-lg font-semibold">연락처</h2>
          <LoadingText />
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold">예약 내용</h1>
        <LoadingText />
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold">견적 정보</h1>
        <LoadingText />
      </div>
    </>
  );
}
