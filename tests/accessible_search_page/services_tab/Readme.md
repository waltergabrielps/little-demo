Services Tab

Acceptance Criteria
===================

* It should be visible only with IP searches.
* Once the tab is clicked, it should display a list of sub tabs: **All, Remote Access, Data Store, Server, Email Server, Network Device, Building Control System, Internet of Things, Other Services, Filtered Ports.**
* Count on the parent tab header should match with the total of the child tabs (E.g. If Remote Access tab has count of 2 and Other services has count of 3, then, the parent tab and the All tab should display a count of 5)
* If the count on a tab is 0 then, that tab should be disabled.
* If the count is greater than 0, then, the All tab should display the information of all the tabs that contain data 
* The data related with the specific service should be visible on its own tab.