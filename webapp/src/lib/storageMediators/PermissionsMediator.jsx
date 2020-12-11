import { LocalStorage } from '../storage/LocalStorage';

class PermissionsMediatorComponent {
  storage = new LocalStorage();

  _dataCache = [];

  _permissionsKey = 'hendrickDynamicsPermissions';

  constructor() {
    this.tryRefreshFromLocalStorage();
  }

  clearData() {
    this.storage.clear();
  }

  tryRefreshFromLocalStorage() {
    const permissions = JSON.parse(this.storage.get(this._permissionsKey));
    this.refreshData(permissions);
  }

  isLoggedIn() {
    return !!this.storage.get(this._permissionsKey);
  }

  refreshData(permissions) {
    this.clearData();

    this._dataCache = permissions;

    const jsonAuthorization = JSON.stringify(permissions);
    if (permissions !== null) this.storage.set(this._permissionsKey, jsonAuthorization);
  }

  has(permissionCode) {
    return !!this._dataCache[permissionCode];
  }

  hasOne(...permissions) {
    let hasOne = false || permissions.length === 0;
    for (let i = 0; i < permissions.length; i++) {
      const code = permissions[i];

      hasOne = !!this._dataCache[code];
      if (hasOne) break;
    }

    return hasOne;
  }
}

// Export as singleton
export const PermissionsMediator = new PermissionsMediatorComponent();
