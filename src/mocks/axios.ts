import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

if (process.env.NODE_ENV === 'development' || import.meta.env.VITE_SERVER_MODE === 'development') {
  // Create a new instance of MockAdapter
  const mock = new MockAdapter(axios);

  // Set a mock response for a GET request to /api/secured
  mock.onGet('http://127.0.0.1:8000/api/secured').reply(200, {
    message: 'Mocked response',
    name: 'Mocked Name',
    email: 'Mocked Email',
    isAdmin: true
  });

  mock.onAny().passThrough(); // Pass any non-mocked requests through
}
