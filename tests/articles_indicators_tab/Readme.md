Articles Indicators Tab

Acceptance Criteria
===================
* Two tabs: "Public Indicators" and "RiskIQ Indicators"
* Each tab header shows a count of the number of indicators
* On the tab if the count is 0 then it should display a message: No indicators found
* On the tab if the count is greater than 0, then display a table with:
  * Column headers: Type, Name
  * The number of rows should match the count on the tab
  * If Type is a search that the application supports, the Name value should link to the search
* On both tabs, not all type of indicators are clickable.
  * The clickable types (most common): domain, IP, emails, whois name serves, ssl certificates.
  * The non clickable types (most common): URLs, hashes, ASN names, file names.