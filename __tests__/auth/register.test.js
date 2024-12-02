import { register } from '../../src/js/api/auth/register.js';
import { API_AUTH_REGISTER } from '../../src/js/api/constants.js';

describe('register', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should register a user successfully', async () => {
    const mockResponse = { success: true, message: 'User registered successfully' };
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
      ok: true,
    });

    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
    };

    const result = await register(userData);

    expect(fetch).toHaveBeenCalledWith(API_AUTH_REGISTER, {
      method: 'POST',
      headers: expect.any(Headers),
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
      redirect: 'follow',
    });

    expect(result).toEqual(mockResponse);
  });

  it('should include avatar and banner in the request body if provided', async () => {
    const mockResponse = { success: true };
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
      ok: true,
    });

    const userData = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'securePassword123',
      avatar: 'http://example.com/avatar.png',
      banner: 'http://example.com/banner.png',
    };

    await register(userData);

    expect(fetch).toHaveBeenCalledWith(API_AUTH_REGISTER, {
      method: 'POST',
      headers: expect.any(Headers),
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        avatar: {
          url: userData.avatar,
          alt: 'My avatar alt text',
        },
        banner: {
          url: userData.banner,
          alt: 'My banner alt text',
        },
      }),
      redirect: 'follow',
    });
  });

  it('should throw an error when the API call fails', async () => {
    const mockError = new Error('Network error');
    fetch.mockRejectedValueOnce(mockError);

    const userData = {
      name: 'Error User',
      email: 'error@example.com',
      password: 'securePassword123',
    };

    await expect(register(userData)).rejects.toThrow('Network error');
  });
});
