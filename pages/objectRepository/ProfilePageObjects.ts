import * as util from "util";


export class ProfilePageObjects {


    protected static ICON_SORT = "//..//i"

    public static getButtonByName(name: string){
        return util.format("//button[contains(@name,'%s')]", name); 
    }
    
    protected static DETAILS_LIST = '[data-automationid="DetailsList"]';
    protected static DETAILS_LIST_ROW = '[data-automationid="DetailsRowFields"]';
    protected static PROFILE_TITLE = '[data-qa="h2"] [data-qa="link"]';
    protected static INDICATORS_TAB = '[data-content*="Indicators"]';  
    protected static LABEL_NAMES = '[data-qa="name"]';  
    protected static LABEL_VALUES = '[data-qa="value"]';  
    protected static DOWNLOAD_ICON = '[data-icon-name="Download"]';  
    protected static HEADER_IMG_ICON = '[data-qa="image"]';  
    protected static DETAILS_TITLE = '[data-qa="h1"]';  
    protected static DETAILS_HEADER_LABEL = '[data-qa="headerLabel"]';  
    protected static DETAILS_HEADER_DATE = '[data-qa="date"]';  
    protected static DETAILS_TAB_DESCRIPTION = '[data-content="Description"]';  
    protected static DETAILS_TAB_TTPS = '[data-content="TTPs"]';  
    protected static DETAILS_TEXT = '[data-qa="markdownWrapper"]';  
    protected static DETAILS_SECTIONS = '[data-qa="section-column"]';  
    protected static PAGE_HEADER_TITLE = '[data-qa="section"] [data-qa="h1"]';  
    protected static PAGE_HEADER_DESCRIPTION = '[data-qa="section"] [data-qa="paragraph"]';  

    protected static getLocatorColumnByTitle(title: string) {
        return `//span[contains(text(), "${title}")]`;
    }
}