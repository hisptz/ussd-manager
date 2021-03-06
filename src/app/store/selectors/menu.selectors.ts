import { createSelector } from '@ngrx/store';
import * as fromMenu from '../reducers/menu.reducer';
import { selectMenuState } from '../reducers/index';
import { selectCurrentSetting } from './setting.selectors';

export const selectMenuIds = createSelector(
  selectMenuState,
  fromMenu.selectMenuIds
);
export const selectMenuEntities = createSelector(
  selectMenuState,
  fromMenu.selectMenuEntities
);
export const selectAllMenus = createSelector(
  selectMenuState,
  fromMenu.selectAllMenus
);
export const selectMenuTotal = createSelector(
  selectMenuState,
  fromMenu.selectMenuTotal
);
export const selectCurrentMenuId = createSelector(
  selectMenuState,
  fromMenu.getSelectedMenuId
);
export const selectMenuLoading = createSelector(
  selectMenuState,
  fromMenu.getLoading
);
export const selectMenuLoaded = createSelector(
  selectMenuState,
  fromMenu.getLoading
);
export const selectNextMenu = createSelector(
  selectMenuState,
  fromMenu.getNextMenus
);

export const isAuthAvailable = createSelector(
  selectAllMenus,
  menus => menus.map(menu => menu.type).indexOf('auth') !== -1
);

export const is_data_ready = createSelector(
  selectNextMenu,
  selectMenuEntities,
  (menus, menusEntities) => {
    const dataMenus = [];
    const periodMenus = [];
    menus.map(id => {
      if (menusEntities && menusEntities[id] && menusEntities[id].data_id) {
        dataMenus.push(menusEntities[id].data_id);
      }
    });
    menus.map(id => {
      if (
        menusEntities &&
        menusEntities[id] &&
        menusEntities[id].type &&
        menusEntities[id].type === 'period'
      ) {
        periodMenus.push(menusEntities[id].type);
      }
    });
    return dataMenus.length !== 0 && periodMenus.length === 2;
  }
);

export const selectedDatas = createSelector(
  selectNextMenu,
  selectMenuEntities,
  (menus, menusEntities) => {
    const dataMenus = [];
    menus.map(id => {
      if (menusEntities && menusEntities[id] && menusEntities[id].data_id) {
        dataMenus.push(menusEntities[id].data_id);
      }
    });
    return dataMenus;
  }
);

export const selectCurrentMenu = createSelector(
  selectMenuEntities,
  selectCurrentMenuId,
  (menuEntities, menuId) => menuEntities[menuId]
);

export const selectStartingMenu = createSelector(
  selectMenuEntities,
  selectCurrentSetting,
  (menuEntities, setting) => menuEntities[setting.starting_menu]
);
