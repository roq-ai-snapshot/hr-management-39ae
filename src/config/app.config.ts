interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['HR Manager'],
  customerRoles: [''],
  tenantRoles: ['HR Manager'],
  tenantName: 'Organization',
  applicationName: 'HR Management',
  addOns: [],
};
