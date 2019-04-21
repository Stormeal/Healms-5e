// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBZyCBxuNP2rgbk_lGqy21w1esxwM6tAcg',
    authDomain: 'healms.firebaseapp.com',
    databaseURL: 'https://healms.firebaseio.com',
    projectId: 'healms',
    storageBucket: 'healms.appspot.com',
    messagingSenderId: '105793662296'
  }
};
