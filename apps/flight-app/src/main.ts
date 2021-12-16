// import './bootstrap';

import { loadRemoteEntry } from '@angular-architects/module-federation';

// ab CLI 13: ecmascript: import(...)
// <script type="module" src="remoteEntry.js">
loadRemoteEntry('http://localhost:3000/remoteEntry.js', 'passenger')
	.catch(err => console.error(err))
	.then(_ => import('./bootstrap'))
	.catch(err => console.error(err));



	// import('./service')