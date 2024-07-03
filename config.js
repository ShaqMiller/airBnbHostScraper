const config= {
    proxyUsername:"brd-customer-hl_0f8a47fd-zone-fletcher_proxy-country-us",
    proxyPassword:"l5nypc215kxj",

    resultFolderPath:"./data/", //folder location of where we should save data
    resultFilename:"result", //What is the filename of the data

    maxPageStop:50, //How many pages to scrape in total of each url -> set to a high value if you want to scarpe all pages 
    dataSplitRange:1,  //How many pages before we write data to a file
    cursorUpdateRange:1 //How many pages to scrape before we update the page cursor
}

export default config