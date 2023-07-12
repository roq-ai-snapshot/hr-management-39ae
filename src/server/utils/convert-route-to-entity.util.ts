const mapping: Record<string, string> = {
  employees: 'employee',
  organizations: 'organization',
  'third-party-users': 'third_party_user',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
