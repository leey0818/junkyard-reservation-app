/**
 * 예약 데이터
 */
export type ReservationData = {
  reservationId: string;
  userId: string;
  clientName: string;
  phoneNo: string;
  contents: string;
  startTime: string;
  endTime: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  car: {
    make: string;
    model: string;
    licensePlate: string;
  };
  estimate: {
    amount: number;
    description: string;
    issuedDate: string;
    isFinal: boolean;
  }[];
};
