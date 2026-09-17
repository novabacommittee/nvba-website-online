// Central authorization groups for admin areas.
// NOTE: these are UI/route gates only. Real write protection for /Members must be
// enforced by Firebase Realtime Database security rules. Emails are compared lowercase.

// Can view /admin/eventreport (Event Report) and /admin/members.
export const EXECUTIVE_COMMITTEE: string[] = [
  'president@novaba.org',
  'general_secretary@novaba.org',
  'treasurer@novaba.org',
  'cultural@novaba.org',
  'cultural_coordination_secretary@novaba.org',
  'food@novaba.org',
  'it_secretary@novaba.org',
  'facilities_secretary@novaba.org',
  'logistics@novaba.org',
  'operations_secretary@novaba.org',
  'advancement_secretary@novaba.org',
  'publications@novaba.org',
  'communications_secretary@novaba.org'
];

// Can access /admin/managemember (the member record editor).
export const EXECUTIVE_COMMITTEE_IT_ADMIN: string[] = [
  'it_secretary@novaba.org'
];

// Can view and generate /admin/membershipreports (Membership Reports).
export const EXECUTIVE_COMMITTEE_ADMIN: string[] = [
  'president@novaba.org',
  'general_secretary@novaba.org',
  'treasurer@novaba.org',
  'it_secretary@novaba.org'
];

// Current signed-in user's email (lowercased) from localStorage, or '' if none.
export function currentUserEmail(): string {
  try {
    const u = JSON.parse(localStorage.getItem('user') as string);
    return u && u.email ? String(u.email).toLowerCase() : '';
  } catch { return ''; }
}

export function currentUserVerified(): boolean {
  try {
    const u = JSON.parse(localStorage.getItem('user') as string);
    return !!u && u.emailVerified !== false;
  } catch { return false; }
}
