- Two columns
- Left column
    - A lengthy description of the threat actor. Should be in a paragraph, header, and bullet point format
- Right column
    - Three sections
    - “Tags” – only if there is data
        - Contains a list of unclickable tags
        - If there are more than 10 items
            - Show a button with “# more” where “#” is the number of additional items there are. Once pressed, all of the additional items will be shown, as well as a “Show less” button. If “Show less” is pressed, then collapse the additional items.
    - “Targets” – only if there is data
        - Contains a list of unclickable targets. A target will have the name and the flag icon of the target
        - If there are more than 10 items
            - Show a button with “# more” where “#” is the number of additional items there are. Once pressed, all of the additional items will be shown, as well as a “Show less” button. If “Show less” is pressed, then collapse the additional items.
    - “Active CVEs” – only if there is data or historical data
        - Contains a list of clickable CVEs
        - If no CVEs exist, display “Show Historical CVEs”. If clicked, a list of clickable CVEs will appear under a new header called “Historical CVEs” with a “Show less” button. 
        - If the “Show less” button is pressed the “Historical CVEs” header and section will be hidden again.