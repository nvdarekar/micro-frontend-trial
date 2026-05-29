## Micro Frontend Demo

This is demo of micro frontend setup using webpack module federation pulgin + loading apps per route using custom script loading.

### Goals

- Independent micro frontend applications
- Route-based dynamic remote loading

### High Level Overview

This has 2 parts

1. **host-app**: its main container app serving other micro apps
2. **micro-frontend-1 & micro-frontend-2**:
   - These are independent Micro Frontend apps, serving particular route path.
   - These apps expose the remote entries using Webpack module federation plugin.
   - The host app make uses of these exposed entries in remoteEntry.js and loads scripts dyanamically based on route and finally render the remote app in continer element.

## Steps to run locally

1. Clone the repo

2. Run micro-frontend-1, micro-frontend-2 & host-app
   i. Navigate to app directory
   ii. run `npm install`

3. Navigate through 2 different routes from host-app using nav link, they should load remote apps as per route
