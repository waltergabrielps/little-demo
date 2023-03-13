Components on IPs

Acceptance Criteria
===================

* Paged data with page size 25
* Count on the tab header in left panel should match total count from paging component
* Download button with CSV data up to 10000 results is available at the top of the view
* Sort by "Last Seen" descending as default
* If the count is 0 then it should display message: No components found
* If the count is greater than 0, then:
  * If component name search:
    * Table is displayed with column headers: "IP Address", "First Seen", "Last Seen", "Category", "Name + Version", "Tags"
  * If exact search via pivot:
    + Table is displayed with column headers: "IP Address", "First Seen", "Last Seen, "Tags"
    * On the "Hostname" column, the value links to the search if clicked