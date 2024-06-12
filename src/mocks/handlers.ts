import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {

    return HttpResponse.json([
      { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
      { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
      { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net' },
    ]);

  }),
];
