export class restriction {
  id: number;
  key: string;
  type: string;
  title: string;
  valueType: string;
  value: any;
  show: boolean;
}

export const descKey: string = 'android:key=';
export const descType: string = 'android:restrictionType=';
export const descValue: string = 'android:defaultValue=';
export const descTitle: string = 'android:title=';

export const descOpenTag: string = '<restriction';
export const descCloseRestrictions: string = '</restrictions>';
export const descCloseTag: string = ' />';
export const descXML: string = '<?xml version="1.0" encoding="utf-8"?>';
export const descOpenFav: string = '<favorites>';
export const descCloseFav: string = '</favorites>';
export const descOpenRestrictions: string = '<restrictions xmlns:android="http://schemas.android.com/apk/res/android" >';

export const ENTRIES: restriction[] = [
  {id: 0, key: 'disable.apps.button', type: 'bool', title: 'All apps button is visible', valueType: 'boolean', value: false, show: false},
  {id: 1, key: 'hide.google.search.bar', type: 'bool', title: 'Hides the Google search bar at the top.', valueType: 'boolean', value: false, show: false},
  {id: 2, key: 'app.filter.list', type: 'string', title: 'White list of apps allowed to appear in the app drawer', valueType: 'json-list', value: [], show: false},
  {id: 3, key: 'reserved.areas', type: 'string', title: 'Reserved areas on the screen where icons cannot be placed', valueType: 'json', value: {}, show: false},
  {id: 4, key: 'content.wall.enabled', type: 'bool', title: 'Enable content wall on left side of screen.', valueType: 'boolean', value: false, show: false},
  {id: 5, key: 'content.wall.layout', type: 'string', title: 'List of URLs to insert into content wall', valueType: 'json', value: [], show: false},
  {id: 6, key: 'initial.layout', type: 'string', title: 'Initial Layout for icons on screens', valueType: 'xml', value: [], show: false},
  {id: 7, key: 'preferred.items.location', type: 'string', title: 'Preferred locations for icons on screens', valueType: 'json', value: {}, show: false},
  {id: 8, key: 'analytics.account.id', type: 'string', title: 'Analytics account ID, currently used for Flurry', valueType: 'string', value: '', show: false},
  {id: 9, key: 'initial.apps.shortcuts', type: 'bool', title: 'Create shortcuts for all the existing apps in the space', valueType: 'boolean', value: false, show: false}
];

export const range = [0,1,2,3,4,5,6,7,8,9]; // add to this for every line added in the entries table

