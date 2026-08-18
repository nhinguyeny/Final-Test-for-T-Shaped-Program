import { APIRequestContext, expect } from "@playwright/test";

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async login(username: string, password: string): Promise<string> {
    const response = await this.request.post("/api/auth/login", {
      data: {
        username,
        password,
      },
    });

    const responseBody = await response.json();

    expect(
      response.ok(),
      `Login API failed: ${response.status()} ${JSON.stringify(responseBody)}`
    ).toBeTruthy();

    return responseBody.token;
  }
}