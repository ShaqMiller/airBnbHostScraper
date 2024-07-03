import puppeteer from "puppeteer-extra"
import config from "./config.js"
import fs from "fs"
import chalk from "chalk"
import StealthPlugin  from 'puppeteer-extra-plugin-stealth'
import fetch from "node-fetch"
const DriversUrl = `https://turo.com/us/en/drivers/`
const HEADERS = {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "newrelic": "eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjMwNjk1NTEiLCJhcCI6IjEwMjI3OTYwNzYiLCJpZCI6IjcyNmM1MzMzMTViOGNjY2QiLCJ0ciI6IjY4N2Y5MjM5NTViZTAwMzliNDRjNjYwYzIxMTljNGZlIiwidGkiOjE3MTkyNDY1ODA5MTYsInRrIjoiNzIxNDc4In19",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "traceparent": "00-687f923955be0039b44c660c2119c4fe-726c533315b8cccd-01",
    "tracestate": "721478@nr=0-1-3069551-1022796076-726c533315b8cccd----1719246580916",
    "cookie": "preferredLocale=en_US; rr_u_cid=XBGChWdlQ6W_rmSAEqxABA; sid=rk_cHtVqQ46OuE5Y4I7zVQ; JSESSIONID=99870adf-a331-4144-afdc-f69795fea942; osano_consentmanager_uuid=4be6aa08-ec3f-4de8-86b9-f904327b215e; ajs_anonymous_id=e4cdca6e-9d71-4482-b4d0-1dac89413928; _ga=GA1.1.904576462.1719244030; FPAU=1.2.204057702.1719244030; _gtmeec=e30%3D; _gcl_au=1.1.1866304160.1719244033; sd_client_id=6cc7042b-ec46-4cd2-8675-025ef0aee91a; _fbp=fb.1.1719244033629.33451158440047897; _tt_enable_cookie=1; _ttp=ysrxxmD_m-eLTKVzDb-ixRhDqfv; _rdt_uuid=1719244030035.f9c0c4f5-1d29-4d0e-8189-fac10de7ba12; _uetsid=07092510324111efa38e83716223641a; _uetvid=07094d50324111ef871f238f8fc13449; osano_consentmanager=tBElFz_YvRh924P06UizSKshL7hM_t9BlotuhWYxTN3Khn9cZeiiUKmAMCFaJ6F3CI_SXG6k92TI-lsm7jweTOWmr2cuiyUVcxg8ImUvHaxSZv233L4jr_64oVd-2PGDBoVATD-FeGUrR51mXBP0HBtMTjUut__6hCL_h64o8gPvY-Rear37OhNmalfZBHl2E4TAXJX-tsquD9kTCAAIXxxDwS8tQ9fA_cKN6KFTlzw0gHgKrYBPt5Di3uahaC0S3nH2sJUrtYsvJmNk7ydDZ3Mq1csDfbkMAcZ8NA==; times={%22endDate%22:%2206/27/2024%22%2C%22endTime%22:%2210:00%22%2C%22startDate%22:%2206/26/2024%22%2C%22startTime%22:%2210:00%22}; __cf_bm=MuxKlZHKUAiy6ibVvyIfnZSwjxNY5j.XPsHDMNB9i20-1719246577-1.0.1.1-QFCuwOME_CupU9TkkeSkhmpnJqnhTgQfyXFJ_b5wc0YQGGJZKY3.Dlqz.6OovVaARxgye9JLvGW23FKzJ2JsKvq_LhNv3agfwh7qYq7loVM; _ga_EWDCKE6BT8=GS1.1.1719244030.1.1.1719246580.0.0.444906376; _ga_CJPLS11T4Y=GS1.1.1719244030.1.1.1719246580.0.0.0",
    "Referer": "https://turo.com/us/en/drivers/27996269",
    "Referrer-Policy": "strict-origin-when-cross-origin"
}
let stateData = {}

const fetchDriverData = async(driverId) =>{
    console.log(`Fetching friver data: ${driverId}`)
    let driverObj = {}
    try{
        const response =await fetch(`https://turo.com/api/v2/driver/detail?driverId=${driverId}`, {
            "headers":HEADERS, 
            "body": null,
            "method": "GET"
        });

        const body = await response.text();
        let jsonBody = JSON.parse(body)
        driverObj = {
            name:jsonBody.driver.name,
            firstName:jsonBody.driver.firstName,
            lastName:jsonBody.driver.lastName,
            id:jsonBody.driver.id,
            image:jsonBody.driver.image.originalImageUrl,
            locations:jsonBody.jsonBodyocations,
            bio:jsonBody.bio
        }
    }catch(e){
        console.log(e)
    }
    return driverObj
}


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

const scrapeDriverPage = async(browser,url)=>{
    
}

const perBrowser = async (browser)=>{
    let allHostsData = {}    
    let isWaitingOnData = false
    const page =  await browser.newPage()
    await page.authenticate({
        username: config.proxyUsername,
        password: config.proxyPassword
    });

    await page.setRequestInterception(true);
    page.on('request', req => {
        if(req.resourceType() === 'image' ){
            req.abort();
        }else{
            req.continue();
        }
    });
    
    page.on('response', async (response) => {
        const request = response.request();
        try{
            if (request.url() == ('https://turo.com/api/v2/search') ){
                const data = await response.json()

                let  {vehicles} = data;

                
                vehicles.forEach((vehicleData)=>{
                    if(!allHostsData[vehicleData.hostId]){
                        allHostsData[vehicleData.hostId] = {vehicles:[vehicleData],details:{}}
                    }else{
                        allHostsData[vehicleData.hostId].vehicles.push(vehicleData)
                    }
                })
                
                let allDriverIds = Object.keys(allHostsData)
                
                console.log(`Found ${vehicles.length} Vehicles\nFound ${allDriverIds.length} Host Profiles`)

                let finishedDrivers = 0
                allDriverIds.forEach(async(driverId)=>{
                   let data= await fetchDriverData(driverId)
                   allHostsData[driverId].details = data
                   finishedDrivers++
                })
                isWaitingOnData = true

                while(finishedDrivers!=allDriverIds.length){
                    await sleep(500)
                }
                isWaitingOnData = false
                // allDriverIds.forEach((id)=>{
                //     console.log(allHostsData[id].details)
                // })
            }
        }catch(e){
        }
    });

    const searchUrlBase = `https://turo.com/us/en/search`
    let cursor = JSON.parse(fs.readFileSync("./cursor.json","utf8"))
    let foundCursor = false

    if(cursor.state == "") foundCursor=true
    
    //Go to every url
    let allStateCodes = Object.keys(stateData)
    let citiesVisited = 0
    //Go through every state
    for(let s=0;s<allStateCodes.length;s++){
        //Go through every city
        let stateCode = allStateCodes[s]
        let curStateData = stateData[stateCode]
        for(let c=0;c<curStateData.cities.length;c++){
            let curCity = curStateData.cities[c]
            //Ensure found cursor
            if(!foundCursor){
                if(cursor.state == stateCode && cursor.city == curCity){
                    foundCursor = true
                }else{
                    console.log(chalk.yellow(`Skipping ${stateCode} -> ${curCity}`))
                    continue
                }
            }

            console.log(`Visiting ${stateCode} -> ${curCity}`)
            let url = `${searchUrlBase}?defaultZoomLevel=11&endDate=06%2F21%2F2025&endTime=10%3A00&startDate=06%2F26%2F2024&startTime=10%3A00&region=${stateCode}&location=${curCity}`
            await page.goto(url)
            citiesVisited++

            //Update cursor
            if(citiesVisited % config.cursorUpdateRange == 0) {
                cursor = {state:stateCode,city:curCity}
                fs.writeFileSync("./cursor.json",JSON.stringify(cursor))
            }
            await sleep(2000)
            while(isWaitingOnData){
                await sleep(500)
            }
            fs.writeFileSync(`./data/${stateCode}_${curCity}.json`,JSON.stringify(allHostsData))    
            allHostsData = {}        
        }

        //Write file after every state
    }
    
    
    await browser.close()
}



const main = async()=>{

    puppeteer.use(StealthPlugin())

    //Get state data
    stateData = JSON.parse(fs.readFileSync("./stateData.json","utf8"))
    
    ///Get Urls from file
    const urlDataText =  fs.readFileSync("./allUrls.txt","utf8")
    const urlArr = urlDataText.split("\n").map(text=>text.replace("\r",""))

    //Create browsers
    const browser = await puppeteer.launch({
        headless:false,
        //args:['--proxy-server=brd.superproxy.io:22225']
    })

    perBrowser(browser)

}

main()

