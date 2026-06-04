import { getCurrentAdminUser } from "../../../lib/supabase";

export async function GET() {
  const adminUser = await getCurrentAdminUser();

  return Response.json({
    isAdmin: Boolean(adminUser),
  });
}
