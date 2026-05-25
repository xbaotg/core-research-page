import { requireAuth } from "@/lib/auth";
import { getSettings } from "@/lib/data";
import AdminShell from "@/components/admin/AdminShell";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = { title: "Settings · Admin" };

export default async function AdminSettings() {
  await requireAuth();
  const settings = await getSettings();
  return (
    <AdminShell title="Site settings">
      <SettingsForm initial={settings} />
    </AdminShell>
  );
}
