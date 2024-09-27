import {test, expect} from '@playwright/test'


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

    await context.tracing.stop({path:'test1_trace.zip'})
    page.close();
})