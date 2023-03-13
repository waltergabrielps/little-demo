* Article Header
  * Primary line
    * Priority icon (if priority score greater than 0)
    * CVE name
  * Secondary line
    * Priority Score
      * if greater than 0: (with icon, color, and level)
      * otherwise "Not Available"
    * CVSS 2
      * if severity: score and level (with coloring)
      * otherwise: "No Score" and level
    * CVSS 3
      * if severity: score and level (with coloring)
      * otherwise "No Score" and level
    * Published - date
  * Description tab
    * Main panel
      * Description header followed by markdown description text that supports code blocks
        * if CVE data includes "what to do"
          * Header - "Mitigation Strategies"
          * Sub-header - "This information is provided "as is". Microsoft recommends that you validate applicability before implementing in your own environment."
          * markdown mitigation steps text that supports code blocks
        * otherwise if CVE data has one or more references
          * Header - "References (Advisories, Solutions, and Mitigation)"
          * Sub-header - "This information is provided "as is". Microsoft recommends that you validate applicability before implementing in your own environment."
          * Bulleted list of links to external sites
            * Show first 5 by default
            * If more than 5 include a "show x more" link where x is the number of additional links. When clicked the full list should expand.
        * Right panel
          * Intelligence
            * Exploit Available
            * Icon
            * Greyed out if false
          * Chatter Observed
            * Icon
            * Greyed out if false
          * Active Exploitation Observed
            * Icon
            * Greyed out if false
          * Known Exploits (if greater than 0)
            * count in parenthesis after label
            * for each exploit
              * the text of the link
              * external link icon that is clickable
          * CWE
              * if list of CWEs includes either 'NVD-CWE-noinfo' or 'NVD-CWE-Other then display "MITRE CWE information unavailable"
              * otherwise
                * list of external links to https://cwe.mitre.org/data/definitions/{cwe_number} where cwe prefix is the text of the cwe after the first dash - ie for CEW-22 the link would be https://cwe.mitre.org/data/definitions/22
    * Affected components tab followed by count in parenthesis
      * Paging component with 10 per page
      * Column headers: "Component"
    * Related articles tab followed by count in parenthesis
      * Standard articles paging component with 5 per page
    