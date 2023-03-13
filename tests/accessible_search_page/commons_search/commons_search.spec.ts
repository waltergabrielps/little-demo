import test from "@lib/BaseTest";

test.describe("Common Search Tests", () => {
  // Header of Project
  test(`Commons Search`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("User should see all items in search", async () => {
      const searchTypes = new Map<string, string[]>([
        ["All", []],
        ["Tag", []],
        ["Component", []],
        ["Trackers", []],
        [
          "Whois",
          [
            "Email",
            "Name",
            "Organization",
            "Address",
            "City",
            "State",
            "Postal Code",
            "Country",
            "Phone",
            "Nameserver",
          ],
        ],
        [
          "Certificate",
          [
            "SHA-1",
            "Serial Number",
            "Issuer Common Name",
            "Issuer Alternative Name",
            "Subject Common Name",
            "Subject Alternative Name",
          ],
        ],
        ["Cookie", ["Name", "Domain"]],
      ]);
      await homePage.checkAllSearchItems(searchTypes);
    });
  });
  // Cookie Name
  test(`Search for Cookie Name`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Cookie Name with CP_IsMobile", async () => {
      await homePage.searchByWord("Cookie", "CP_IsMobile", "Name");
    });
  });

  // Cookie Domain
  test(`Search for Cookie Domain`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Cookie Name with CP_IsMobile", async () => {
      await homePage.searchByWord("Cookie", "mirumirukogao-com.s.analytics.ups.com", "Domain");
    });
  });

  // Certificate SHA-1
  test(`Search for Certificate SHA-1`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Certificate SHA-1 with 834f14316d4eb90bf45a550871a7fed3f2ce9437", async () => {
      await homePage.searchByWord("Certificate", "834f14316d4eb90bf45a550871a7fed3f2ce9437", "SHA-1");
    });
  });
  
  // Certificate Serial Number
  test(`Search for Certificate Serial Number`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Certificate Serial Number with 12037640545166866303", async () => {
      await homePage.searchByWord("Certificate", "12037640545166866303", "Serial Number");
    });
  });

  // Certificate Issuer Common Name
  test(`Search for Certificate Issuer Common Name`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Certificate Issuer Common Name with COMODO RSA Domain Validation Secure Server CA 2", async () => {
      await homePage.searchByWord("Certificate", "COMODO RSA Domain Validation Secure Server CA 2", "Issuer Common Name");
    });
  });

  // Certificate Issuer Alternative Name
  test(`Search for Certificate Issuer Alternative Name`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Certificate Issuer Alternative Name with *.development.cumplo.com.mx", async () => {
      await homePage.searchByWord("Certificate", "*.development.cumplo.com.mx", "Issuer Alternative Name");
    });
  });

  // Certificate Subject Common Name
  test(`Search for Certificate Subject Common Name`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Certificate Subject Common Name with Starfield Services Root Certificate Authority - G2", async () => {
      await homePage.searchByWord("Certificate", "Starfield Services Root Certificate Authority - G2", "Subject Common Name");
    });
  });
  
  // Certificate Subject Alternative Name
  test(`Search for Certificate Subject Alternative Name`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Certificate Subject Alternative Name with *.brinkpos.net", async () => {
      await homePage.searchByWord("Certificate", "*.brinkpos.net", "Subject Alternative Name");
    });
  });
  
  // Whois Email
  test(`Search for Whois Email`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois Email with passivetotal.org-registrant@anonymised.email", async () => {
      await homePage.searchByWord("Whois", "passivetotal.org-registrant@anonymised.email", "Email");
    });
  });
  
  // Whois Name
  test(`Search for Whois Name`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois Name with US Postal Service", async () => {
      await homePage.searchByWord("Whois", "US Postal Service", "Name");
    });
  });
  
  // Whois Organization
  test(`Search for Whois Organization`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois Organization with RiskIQ, Inc", async () => {
      await homePage.searchByWord("Whois", "RiskIQ, Inc", "Organization");
    });
  });
  
  // Whois Address
  test(`Search for Whois Address`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois Address with District of Columbia", async () => {
      await homePage.searchByWord("Whois", "District of Columbia", "Address");
    });
  });
  
  // Whois City
  test(`Search for Whois City`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois City with Raleigh", async () => {
      await homePage.searchByWord("Whois", "Raleigh", "City");
    });
  });
  
  // Whois State
  test(`Search for Whois State`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois State with WA", async () => {
      await homePage.searchByWord("Whois", "WA", "State");
    });
  });
  
  // Whois Postal Code
  test(`Search for Whois Postal Code`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois Postal Code with 20006", async () => {
      await homePage.searchByWord("Whois", "20006", "Postal Code");
    });
  });
  
  // Whois Country
  test(`Search for Whois Country`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois Country with hong kong", async () => {
      await homePage.searchByWord("Whois", "hong kong", "Country");
    });
  });
  
  // Whois Phone
  test(`Search for Whois Phone`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois Phone with 19195019025", async () => {
      await homePage.searchByWord("Whois", "19195019025", "Phone");
    });
  });
  
  // Whois Nameserver
  test(`Search for Whois Nameserver`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Whois Nameserver with ns-1868.awsdns-41.co.uk", async () => {
      await homePage.searchByWord("Whois", "ns-1868.awsdns-41.co.uk", "Nameserver");
    });
  });
 
  // Trackers
  test(`Search for Trackers`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Trackers with cloudera", async () => {
      await homePage.searchByWord("Trackers", "cloudera");
    });
  });
  
  // Component
  test(`Search for Component`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Component with Amazon Web services", async () => {
      await homePage.searchByWord("Component", "Amazon Web services");
    });
  });
  
  // Tag
  test(`Search for Tag`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Tag with Google", async () => {
      await homePage.searchByWord("Tag", "Google");
    });
  });
  
  // All
  test(`Search for All`, async ({ homePage }) => {
    await test.step("Navigate to URL of Home", async () => {
      await homePage.navigateToURL();
    });
    await test.step("The user search by Tag with 8.8.8.8", async () => {
      await homePage.searchByWord("All", "8.8.8.8");
    });
  });


  
});
