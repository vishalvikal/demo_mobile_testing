import {test, expect} from '@playwright/test'

test.describe.configure({ mode: 'parallel' });

test('Simple Login with valid credentials ', async ({page,context})=>{
    await context.tracing.start({
        screenshots:true,
        snapshots:true
    })
    await page.goto('https://demo-mobile.scriptassist.co.uk/login')
    await page.waitForTimeout(5000)
    //Title checking
    await expect(page).toHaveTitle('Script Assist')
    //form checking
    //email visibility
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    //passwod input visibility
    await expect(page.getByPlaceholder('Password')).toBeVisible()
    //form submit button visibility
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    
    //registration button visibility
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible()


    //forgot password link check
    await expect(page.getByText('Forgot password?')).toBeVisible()

    //simple loging and logout test and coming back to the home page after logout testing
    //filling email id
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('rhythm.gautam@scriptassistinterview.com');
    //filling password
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('G9-hzrjY!x4K');
    //siging in 
    await page.getByRole('button', { name: 'Sign in' }).click();

    //selecting profile
    await page.getByRole('button', { name: 'Rhythm Gautam' }).waitFor({timeout:5000})
    await page.getByRole('button', { name: 'Rhythm Gautam' }).click()
    //selecting on sing out
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();

    //after coming back to the home page testing it again for presence of all components
    //Title checking
    await expect(page).toHaveTitle('Script Assist')
    //form checking
    //email visibility
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    //passwod input visibility
    await expect(page.getByPlaceholder('Password')).toBeVisible()
    //form submit button visibility
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    
    //registration button visibility
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible()

    await context.tracing.stop({path:'./test-results/test1_trace.zip'})
    page.close();
})

test('Login test with empty form',async ({page,context})=>{
    await context.tracing.start({
        screenshots:true,
        snapshots:true
    })
    await page.goto('https://demo-mobile.scriptassist.co.uk/login')
    await page.waitForTimeout(3000)
  
    //click without entering anything into the email and password field
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForTimeout(2000)
    //checking visibility of error message for email address
    await expect(page.getByText('Please enter a valid email')).toBeVisible()
    //checking visibility of error message for password
    await expect(page.getByText('Password must be a minimum of')).toBeVisible()
    
    //checking visibility of error message for password after email is entered.
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('rhythm.gautam@scriptassistinterview.com');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Password must be a minimum of')).toBeVisible();

    //checking visibility of error message for email after filling the password field and leaving empty email field.
    await page.getByPlaceholder('Email').fill('')
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('G9-hzrjY!x4K');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Please enter a valid email')).toBeVisible()

    await context.tracing.stop({path:'./test-results/test2_trace.zip'})
    page.close();
})

test("Try to login with wrong credentials",async ({page, context})=>{
    await context.tracing.start({
        screenshots:true,
        snapshots:true
    })
    await page.goto('https://demo-mobile.scriptassist.co.uk/login')
    await page.waitForTimeout(5000)
    
    //Login with wrong email
    //filling email id
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('rhythm.gautam@scriptassistinabcterview.com'); //wrong email
    //filling password
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('G9-hzrjY!x4K');
    //siging in 
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForTimeout(1500);

    //error message visibility check
    await expect(page.locator('#login-error')).toBeVisible()
    await expect(page.getByText('Login Failed')).toBeVisible()
    await expect(page.getByText('Email or password is incorrect')).toBeVisible();

    //Login with wrong password
    //filling email id
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('rhythm.gautam@scriptassistinterview.com'); 
    //filling password
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('G9-hzrjY!x4Kabcd');//wrong password
    //siging in 
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForTimeout(1500);

    //error message visibility check
    await expect(page.locator('#login-error')).toBeVisible()
    await expect(page.getByText('Login Failed')).toBeVisible()
    await expect(page.getByText('Email or password is incorrect')).toBeVisible();

    //Login with wrong email and password
    //filling email id
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('rhythm.gautam@scriptassistinterviewabcd.com'); //wrong email 
    //filling password
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('G9-hzrjY!x4Kabcd');//wrong password
    //siging in 
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForTimeout(1500);

    //error message visibility check
    await expect(page.locator('#login-error')).toBeVisible()
    await expect(page.getByText('Login Failed')).toBeVisible()
    await expect(page.getByText('Email or password is incorrect')).toBeVisible();

    await context.tracing.stop({path:'./test-results/test3_trace.zip'})
    page.close();
})

test('Testing Landing Page after login successfully',async ({page, context})=>{
    await context.tracing.start({
        screenshots:true,
        snapshots:true
    })
    await page.goto('https://demo-mobile.scriptassist.co.uk/login')
    await page.waitForTimeout(5000)

    //filling email id
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('rhythm.gautam@scriptassistinterview.com');
    //filling password
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('G9-hzrjY!x4K');
    //siging in 
    await page.getByRole('button', { name: 'Sign in' }).click();
    // await page.pause();
    await page.waitForTimeout(1500)

    //Checking welcome correct user
    await expect(page.locator('h2:has-text("Rhythm Gautam")')).toBeVisible()

    //checking appointment divs visibilities
    await expect(page.locator('div').filter({ hasText: /^BookBook appointment$/ }).nth(1)).toBeVisible()
    await expect(page.locator('div').filter({ hasText: /^AppointmentsView appointments$/ }).nth(1)).toBeVisible()
    //repeat div visibilitiy
    await expect(page.locator('div').filter({ hasText: /^RepeatRequest repeat$/ }).nth(1)).toBeVisible()
    //Prescriptions div visibility
    await expect(page.locator('div').filter({ hasText: /^PrescriptionsView history$/ }).first()).toBeVisible()
    //eligibility form button checker
    await expect(page.getByRole('button', { name: 'Eligibility Form Required' })).toBeVisible()

    //checking for side panel navigation
    await expect(page.getByRole('navigation').locator('div').filter({ hasText: 'CareGoalsAppointmentsBook' }).first()).toBeVisible()
    await expect(page.locator('a').filter({ hasText: 'Care' })).toBeVisible()
    await expect(page.locator('a').filter({ hasText: 'Goals' })).toBeVisible()
    await expect(page.locator('a').filter({ hasText: /^Appointments$/ })).toBeVisible()
    await expect(page.locator('a').filter({ hasText: 'Manage account' })).toBeVisible()
    await expect(page.locator('a').filter({ hasText: /^Prescriptions$/ })).toBeVisible()
    await expect(page.locator('a').filter({ hasText: 'Find a Doctor' })).toBeVisible()

    //checking for get in touch button presence
    await expect(page.getByRole('button', { name: 'Get in touch' })).toBeVisible()

    //checking for profile button
    await expect(page.getByRole('button', { name: 'Rhythm Gautam' })).toBeVisible()
    //checking for profile button options
    await page.getByRole('button', { name: 'Rhythm Gautam' }).click();
    await expect(page.locator('div').filter({ hasText: 'rhythm.gautam@' }).nth(2)).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'View/edit eligibility' })).toBeVisible()
    //checking for singout button
    await expect(page.getByRole('menuitem', { name: 'Sign Out' })).toBeVisible()
    await page.locator('button').filter({ hasText: 'Rhythm Gautam' }).click();



    //selecting profile
    await page.getByRole('button', { name: 'Rhythm Gautam' }).waitFor({timeout:5000})
    await page.getByRole('button', { name: 'Rhythm Gautam' }).click()
    //selecting on sign out for signing out
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();
    await context.tracing.stop({path:'./test-results/test4_trace.zip'})
    page.close(); 
})
