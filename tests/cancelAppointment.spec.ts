import {test, expect} from '@playwright/test'

test.describe.configure({ mode: 'parallel',timeout:6*60*1000 });

test('Cancel appointment',async ({page, context})=>{
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
    await page.locator('div').filter({ hasText: /^AppointmentsView appointments$/ }).nth(1).click();
    await page.getByRole('tab', { name: 'Upcoming' }).click();
    if((await page.getByRole('heading', { name: 'No upcoming appointments' })) != null){
        
    }else{

    }
    await page.getByRole('tab', { name: 'Pending' }).click();
    await page.waitForTimeout(6000)
    let divs = await page.getByLabel('Pending').locator('div').locator("._hover_q5a0e_1").all()
    if(divs.length)
    {  
        for (const div of divs) {
            await div.click()
            await page.getByRole('button', { name: 'Cancel', exact: true }).click();
            await page.getByRole('button', { name: 'Confirm' }).click();
            await page.waitForTimeout(5000)
        }
    }
    await page.close()
    await context.tracing.stop({path:'./test-results/cancelAppointmentTracing.zip'})
})