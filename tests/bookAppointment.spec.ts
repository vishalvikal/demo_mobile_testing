import {test, expect} from '@playwright/test'
import exp from 'constants';
test.describe.configure({ mode: 'parallel',timeout:6*60*1000 });
test('Book appointment',async ({page, context}) =>{
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
    //booking appointment
    await page.locator('div').filter({ hasText: /^BookBook appointment$/ }).nth(1).click();
    await page.waitForTimeout(2000)

    //Confirm Booking test button test
    await page.locator('.m_8fb7ebe7').nth(0).click()
    await page.getByRole('option', { name: 'Harry Bakewell' }).click();
    await page.locator('.m_8fb7ebe7').nth(1).click()
    await page.getByRole('option', { name: 'Initial Consultation (60 mins' }).click();
    await page.locator('label').filter({ hasText: 'Video' }).click();
    let data = return_random_month_date();
    // console.log(data)
    await expect(page.getByRole('button', { name: `${data.current_month} ${data.current_year}`, exact: true })).toBeVisible()
    await page.getByRole('button', { name: `${data.current_month} ${data.current_year}`, exact: true }).click()
    
    await expect(page.getByRole('button', { name: `${data.random_month_three_letters}` })).toBeVisible()
    await page.getByRole('button', { name: `${data.random_month_three_letters}` }).click()

    if(String(data.random_date).length < 2){
        await expect(page.getByLabel(`${data.random_date} ${data.random_month} ${data.current_year}`, { exact: true })).toBeVisible();
        if(String(data.random_date+1).length < 2){
            await expect(page.getByLabel(`${data.random_date+1} ${data.random_month} ${data.current_year}`, { exact: true })).toBeVisible();
        }else{
            await expect(page.getByLabel(`${data.random_date+1} ${data.random_month} ${data.current_year}`, { exact: true })).toBeVisible(); 
        }
        if(String(data.random_date+2).length < 2){
            if(!((data.random_date+2) != 31)){
                await expect(page.getByLabel(`${data.random_date+2} ${data.random_month} ${data.current_year}`, { exact: true })).toBeVisible();
    
            }else{
                if(!((data.random_date+2) != 31)){
                    await expect(page.getByLabel(`${data.random_date+2} ${data.random_month} ${data.current_year}`, { exact: true })).toBeVisible();
                } 
            }
        }
        if((data.random_date+2) != 31){
            await page.getByLabel(`${data.random_date+2} ${data.random_month} ${data.current_year}`, { exact: true }).click()
            await page.waitForTimeout(5000)
        }
        await page.getByLabel(`${data.random_date+1} ${data.random_month} ${data.current_year}`, { exact: true }).click()
        await page.waitForTimeout(5000)
        await page.getByLabel(`${data.random_date} ${data.random_month} ${data.current_year}`, { exact: true }).click()
        await page.waitForTimeout(5000)
    }else{
        await expect(page.getByLabel(`${data.random_date} ${data.random_month}`)).toBeVisible();
        await expect(page.getByLabel(`${data.random_date+1} ${data.random_month}`)).toBeVisible();
        if(((data.random_date+2) != 31)){
            await expect(page.getByLabel(`${data.random_date+2} ${data.random_month}`)).toBeVisible();

        }
        if((data.random_date+2) != 31){
            await page.getByLabel(`${data.random_date+2} ${data.random_month}`).click()
            await page.waitForTimeout(5000)
        }
        await page.getByLabel(`${data.random_date+1} ${data.random_month}`).click()
        await page.waitForTimeout(5000)
        await page.getByLabel(`${data.random_date} ${data.random_month}`).click()
        await page.waitForTimeout(5000)
    }
    await expect(page.getByRole('button', { name: 'View more' })).toBeVisible()
    await page.getByRole('button', { name: 'View more' }).click()
    let slot = generate_random_slot();
    // console.log(slot)
    await expect(page.locator('label').filter({ hasText: `${slot}` })).toBeVisible()
    await page.locator('label').filter({ hasText: `${slot}` }).click()
    // await page.pause();
    await expect(page.getByRole('button', { name: 'Confirm booking' })).toBeVisible()
    await page.getByRole('button', { name: 'Confirm booking' }).click()
    await expect(page.getByRole('button', { name: 'Make payment' })).toBeVisible()
    await page.getByRole('button', { name: 'Make payment' }).click()
    await page.waitForTimeout(5000)
    await expect(page.getByLabel('Pay by bank')).toBeVisible()
    await page.getByLabel('Pay by bank').check();
    await page.waitForTimeout(5000)
    await expect(page.getByRole('button', { name: 'Pay Now' })).toBeVisible()
    const pagePromise = context.waitForEvent("page")
    await page.getByRole('button', { name: 'Pay Now' }).click()
    const newPage = await pagePromise
    await newPage.close();
    await page.locator('a').filter({ hasText: /^Appointments$/ }).click();
    await page.locator('a').filter({ hasText: 'Manage appointments' }).click();
    await page.waitForTimeout(6000);
    await context.tracing.stop({path:'./test-results/bookAppointment_trace.zip'})
    await page.close()
})

function return_random_month_date(){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let dates = [
        1,  2,  3,  4,  5,  6,  7,  8,  9,
       10, 11, 12, 13, 14, 15, 16, 17, 18,
       19, 20, 21, 22, 23, 24, 25, 26, 27,
       28, 29
    ]
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
      
    const d = new Date()
    let current_month = months[d.getMonth()]
    let current_date = d.getDate()
    let current_year = d.getFullYear()
    let current_day =  d.getDay()
    let random_month = Math.floor(Math.random()*(11-d.getMonth()+1)+d.getMonth())
    while (random_month == d.getMonth()){
        random_month = Math.floor(Math.random()*(11-d.getMonth()+1)+d.getMonth());
    } 
    let random_date = Math.floor(Math.random()*(29-1+1)+1)
    while (new Date(`${months[random_month]} ${random_date}, ${d.getFullYear()}`).getDay() == 0 || new Date(`${months[random_month]} ${random_date}, ${d.getFullYear()}`).getDay() == 6){
        random_date = Math.floor(Math.random()*(29-1+1)+1)

    }
    return {
        current_month,
        current_date,
        current_year,
        current_day:days[d.getDay()],
        random_month:months[random_month],
        random_month_three_letters:months[random_month].slice(0,3),
        random_date,
        random_day:days[new Date(`${months[random_month]} ${random_date}, ${d.getFullYear()}`).getDay()]
    }
    
}


function generate_random_slot(){
    let time_slots = ['00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50', '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50', '04:00', '04:10', '04:20', '04:30', '04:40', '04:50', '05:00', '05:10', '05:20', '05:30', '05:40', '05:50', '06:00', '06:10', '06:20', '06:30', '06:40', '06:50', '07:00', '07:10', '07:20', '07:30', '07:40', '07:50', '08:00', '08:10', '08:20', '08:30', '08:40', '08:50', '09:00', '09:10', '09:20', '09:30', '09:40', '09:50', '10:00', '10:10', '10:20', '10:30', '10:40', '10:50', '11:00', '11:10', '11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '15:10', '15:20', '15:30', '15:40', '15:50', '16:00', '16:10', '16:20', '16:30', '16:40', '16:50', '17:00', '17:10', '17:20', '17:30', '17:40', '17:50', '18:00', '18:10', '18:20', '18:30', '18:40', '18:50', '19:00', '19:10', '19:20', '19:30', '19:40', '19:50', '20:00', '20:10', '20:20', '20:30', '20:40', '20:50', '21:00', '21:10', '21:20', '21:30', '21:40', '21:50', '22:00', '22:10', '22:20', '22:30', '22:40', '22:50', '23:00', '23:10', '23:20', '23:30', '23:40']

    return time_slots[Math.floor(Math.random()*time_slots.length)]
}