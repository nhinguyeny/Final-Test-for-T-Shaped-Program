import { APIRequestContext, expect } from "@playwright/test";

export type ProfileResponse = {
  name?: string;
  fullName?: string;
  full_name?: string;
  data?: { name?: string; fullName?: string; full_name?: string };
  profile?: { name?: string; fullName?: string; full_name?: string };
  user?: { name?: string; fullName?: string; full_name?: string };
  [key: string]: unknown;
};

/**
 * Confirmed real shape (via GET /api/profile):
 *   { id, username, name, role, avatar }
 * The "full name" field is called `name`, NOT `fullName`. Kept the other
 * variants here as a fallback only, in case other endpoints on this API
 * use a different convention.
 */
function extractFullName(body: ProfileResponse): string | undefined {
  return (
    body.name ??
    body.fullName ??
    body.full_name ??
    body.data?.name ??
    body.data?.fullName ??
    body.data?.full_name ??
    body.profile?.name ??
    body.profile?.fullName ??
    body.profile?.full_name ??
    body.user?.name ??
    body.user?.fullName ??
    body.user?.full_name
  );
}

export class ProfileApi {
  constructor(private readonly request: APIRequestContext) {}

  async updateFullName(token: string, fullName: string): Promise<ProfileResponse> {
    const response = await this.request.patch("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        // API field is "name", not "fullName" - confirmed via GET response.
        name: fullName,
      },
    });

    const body = await response.text();

    expect(
      response.ok(),
      `PATCH /api/profile failed: ${response.status()} ${body}`
    ).toBeTruthy();

    return JSON.parse(body);
  }

  async getProfile(token: string): Promise<ProfileResponse> {
    const response = await this.request.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    expect(
      response.ok(),
      `GET /api/profile failed: ${response.status()} ${JSON.stringify(body)}`
    ).toBeTruthy();

    return body;
  }

  /**
   * Convenience wrapper so tests don't need to know (or guess at) the
   * response envelope shape themselves.
   */
  async getFullName(token: string): Promise<string> {
    const body = await this.getProfile(token);
    const fullName = extractFullName(body);
    if (fullName === undefined) {
      throw new Error(
        `Could not find fullName/name in GET /api/profile response. Raw body: ${JSON.stringify(body)}`
      );
    }
    return fullName;
  }
}