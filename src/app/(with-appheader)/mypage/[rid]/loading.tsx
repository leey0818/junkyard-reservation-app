import AppHeader from '@components/AppHeader';
import LoadingDetail from '@components/reservation/LoadingDetail';

export default function Loading() {
  return (
    <>
      <AppHeader>예약 상세</AppHeader>
      <div className="p-4">
        <LoadingDetail />
      </div>
    </>
  );
}
