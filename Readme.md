# This is plawright test repository for demo-mobile application for appoinment.
1. First clone this repository

2. install playwright latest version using
 `npm install playwright@latest`

3. Open this direcotry in the terminal

4. run npm install

5. after finishing the above command run. 
`npx playwright test --headed --porject=chromium`
6. For performing each test.
    `npx playwright test ./tests/login_tests.spec.ts --headed --project=chromium`
    `npx playwright test ./tests/bookAppointment.spec.ts --headed --porject=chromium`
    `npx playwright test ./tests/viewAppointments.spec.ts --headed --project=chromium`
    `npx playwright test ./tests/cancelAppointment.spec.ts --headed --project=chromium`
7. note: you must check the node and npm version before everything

8. Every test trace will be available in the test-results directory after running the tests you can use the playwright trace to watch every snashot and screenshot.
` npx playwright show-trace ./test-results/*.zip`