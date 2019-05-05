/// <reference path="modules/chartist/index.d.ts" />

declare module '*.json'
{ const value: any;
  export default value;
}
declare module 'json!*'
{ const value: any;
  export default value;
}