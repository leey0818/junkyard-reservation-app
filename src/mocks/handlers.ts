import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(process.env.BACKEND_API_URL + '/reservation', () => {
    return HttpResponse.json({
      code: 'NORMAL',
      message: '',
      data: [{
        reservationId: 'test-01',
        userId: 'userId',
        clientName: '홍길동',
        phoneNo: '01011112222',
        startTime: '2024-09-08T10:24:42.0059463',
        endTime: '2024-09-09T10:24:42.0059463',
        status: 'PENDING',
        car: {
          make: '현대',
          model: '아반떼 19년식',
          licensePlate: '12차 2345',
        },
        estimate: [{
          amount: 1000.0,
          issuedDate: '2024-09-08T10:24:42.0069468',
          description: '이래저래 가격이럼',
          isFinal: true,
        }],
        createdAt: '2024-09-08T10:24:42.0069468',
        updatedAt: '2024-09-08T10:24:42.0069468'
      }],
    });
  }),
];
