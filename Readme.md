# This is plawright test repository for demo-mobile application for appoinment.
1. First clone this repository

2. install playwright latest version using
 `npm install playwright@latest`

3. Open this direcotry in the terminal

4. run npm install

5. after finishing the above command run 
`npx playwright test --headed --porject=chromium`

6. note: you must check the node and npm version before everything

7. Every test trace will be available in the test-results directory after running the tests you can use the playwright trace to watch every snashot and screenshot.
` npx playwright show-trace ./test-results/*.zip`