import fetch from "node-fetch"

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

const fetchDriverData = async(driverId) =>{
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

fetchDriverData(27996269)