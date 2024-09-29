import {test, expect} from '@playwright/test'

test.describe.configure({ mode: 'parallel',timeout:6*60*1000 });


test('View appointment',async ({page, context}) =>{
    await context.tracing.start({
        screenshots:true,
        snapshots:true
    })
    await page.goto('https://demo-mobile.scriptassist.co.uk/login')
    await page.waitForTimeout(2000)
    //filling email id
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('rhythm.gautam@scriptassistinterview.com');
    //filling password
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('G9-hzrjY!x4K');
    //siging in 
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForTimeout(2000)
    await expect(page.locator('div').filter({ hasText: /^AppointmentsView appointments$/ }).nth(1)).toBeVisible()
    await page.locator('div').filter({ hasText: /^AppointmentsView appointments$/ }).nth(1).click();
    await page.waitForTimeout(3000)
    await expect(page.getByRole('tab', { name: 'Upcoming' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Past' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Pending' })).toBeVisible()  
    //clicking on appontments
    await page.getByRole('tab', { name: 'Upcoming' }).click();
    await page.getByRole('tab', { name: 'Past' }).click();
    await page.getByRole('tab', { name: 'Pending' }).click();
    await page.getByRole('tab', { name: 'Past' }).click();
    await page.getByRole('tab', { name: 'Upcoming' }).click();
    await page.waitForTimeout(4000)
    await page.getByRole('button', { name: 'Rhythm Gautam' }).click();
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();
    await context.tracing.stop({path:'./test-results/viewAppointments_trace.zip'})
    page.close()
})

