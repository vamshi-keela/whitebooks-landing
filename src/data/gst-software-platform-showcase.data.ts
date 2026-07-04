/**
 * GST Software Platform Showcase — typed content for the category-driven
 * capabilities section on the GST software subpage.
 *
 * Mirrors the structure of ACCOUNTING_SHOWCASE_CATEGORIES: left category rail
 * (scroll-driven) · middle card content · right media placeholder. The
 * sub-feature pills inside a category swap card content + preview.
 *
 * Shared types and the `more()` CTA helper are reused from the accounting data
 * module so the two stay in lockstep. Posters point at
 * `@assets/product-images/gst-software/*` — some images may not exist in the
 * repo yet and will resolve once added.
 *
 * NOTE: `proof` and `metrics` are not present in the source markup (the legacy
 * GST page uses a stacked-card layout). They are crafted here to match the
 * accounting showcase shape — tweak the values as needed.
 */

import type { ShowcaseCategory, ShowcaseCta } from "./accouting-platform-showcase.data";

const more = (href: string): ShowcaseCta => ({ label: "More features", href });

export const GST_SOFTWARE_SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
    {
        id: "gstr1",
        label: "GSTR-1",
        heading: "File, notify and sync GSTR-1",
        proof: [
            { value: "GSTN", label: "direct sync" },
            { value: "EVC", label: "e-filing" },
            { value: "Tally / ERP", label: "import" },
        ],
        // metrics: [
        //   { value: "GSTR-1", label: "Filed on time", note: "EVC", slot: "top-right" },
        //   { value: "185 invoices", label: "Uploaded", slot: "bottom-left" },
        //   { value: "100% synced", label: "With portal", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "prepare",
                label: "Prepare",
                badge: "GSTR-1 Preparation",
                title: "Prepare GSTR-1",
                subtitle: "Add or Import Sales Data",
                description:
                    "Simplify your GSTR-1 filing with WhiteBooks by adding invoices manually or importing them directly from Tally and other ERP systems.",
                bullets: [
                    "Add B2B, B2C & Export invoices",
                    "Import invoices from Tally / ERP",
                    "Select Return Period (Monthly)",
                    "Auto GST validation & error checks",
                ],
                cta: more("/features/prepare-gstr1-gst-features"),
                media: {
                    label: "Prepare GSTR-1",
                    poster: "@assets/product-images/gst-software/mini-image-prepare-gstr1.webp",
                },
            },
            {
                id: "upload",
                label: "Upload",
                badge: "GSTN Upload",
                title: "Upload to GSTN",
                subtitle: "Sync invoices with GST Portal",
                description:
                    "Easily upload validated invoices to the GSTN portal with WhiteBooks and monitor upload status instantly.",
                bullets: [
                    "One-click upload to GSTN",
                    "Track IMS / upload status",
                    "View success & error reports",
                    "Re-upload corrected invoices",
                    "Real-time GSTN sync",
                ],
                cta: more("/features/upload-gstr1-gst-features"),
                media: {
                    label: "Upload to GSTN",
                    poster: "@assets/product-images/gst-software/mini-image-upload-gstr1.png",
                },
            },
            {
                id: "file",
                label: "File return",
                badge: "Final Filing",
                title: "File GSTR-1 Return",
                subtitle: "Review & Submit",
                description:
                    "Review GSTR-1 summary, HSN summary, and document details in WhiteBooks and file your return securely using EVC.",
                bullets: [
                    "View GSTR-1 Summary",
                    "Check HSN & Document Summary",
                    "Verify taxable value & GST totals",
                    "File return with EVC",
                ],
                cta: more("/features/filing-gstr1-gst-features"),
                media: {
                    label: "File GSTR-1 Return",
                    poster: "@assets/product-images/gst-software/mini-image-file-gstr1.webp",
                },
            },
            {
                id: "notify",
                label: "Notify parties",
                badge: "Party Communication",
                title: "Notify GSTR-1 Parties",
                subtitle: "Track & Send Notifications",
                description:
                    "Monitor notification status for each party, add missing email details, and ensure all recipients are informed before finalizing your GSTR-1 filing process.",
                bullets: [
                    "View total parties and notification status",
                    "Track sent and pending notifications",
                    "Add or update party email addresses",
                    "Send notifications directly to parties",
                ],
                cta: more("/features/notify-gstr1-gst-features"),
                media: {
                    label: "Notify GSTR-1 Parties",
                    poster: "@assets/product-images/gst-software/mini-image-notify-gstr1.webp",
                },
            },
            {
                id: "portal-data",
                label: "Portal data",
                badge: "Portal Data",
                title: "Access Portal Data",
                subtitle: "Compare & Validate Records",
                description:
                    "Review GST portal data alongside your records, including GSTR-1, e-Invoice, and e-Way Bill values, to identify mismatches and ensure accurate reconciliation before filing.",
                bullets: [
                    "View GSTR-1, e-Invoice, and e-Way Bill totals",
                    "Access monthly invoice data from portal",
                    "Download and manage portal records",
                    "Filter and analyze reconciliation data",
                ],
                cta: more("/features/portalData-gstr1-gst-features"),
                media: {
                    label: "Access Portal Data",
                    poster: "@assets/product-images/gst-software/mini-image-portal-data-gstr1.webp",
                },
            },
        ],
    },
    {
        id: "gstr2a",
        label: "GSTR-2A",
        heading: "Auto-fetch & review purchase invoices",
        proof: [
            { value: "Auto", label: "fetch" },
            { value: "ITC", label: "summary" },
            { value: "Excel", label: "export" },
        ],
        // metrics: [
        //   { value: "GSTR-2A", label: "Auto-fetched", slot: "top-right" },
        //   { value: "Period-wise", label: "Monthly data", slot: "bottom-left" },
        //   { value: "₹4.2L ITC", label: "Eligible", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "gstr2a-data",
                label: "GSTR-2A data",
                badge: "GSTR-2A",
                title: "GSTR-2A Data",
                subtitle: "Auto-Fetch Purchase Invoices from GSTN Portal",
                description:
                    "Fetch GSTR-2A data for any selected month in WhiteBooks and review inward supply invoices with eligible ITC in one place.",
                bullets: [
                    "Fetch GSTR-2A data directly from GSTN",
                    "View period-wise monthly data",
                    "Auto-populate party details from GSTN",
                    "View and filter invoice details with ITC summary",
                    "Download GSTR-2A data in Excel format",
                ],
                cta: more("/features/gstr2A-review-gst-features"),
                media: {
                    label: "GSTR-2A Data",
                    poster: "@assets/product-images/gst-software/mini-image-gstr2a.png",
                },
            },
        ],
    },
    {
        id: "gstr2b",
        label: "GSTR-2B",
        heading: "Reconcile GSTR-2B & claim ITC",
        proof: [
            { value: "GSTR-2B", label: "auto match" },
            { value: "IMS", label: "actions" },
            { value: "Safe ITC", label: "flagged" },
        ],
        // metrics: [
        //   { value: "₹4.2L ITC", label: "Safe to claim", slot: "top-right" },
        //   { value: "92% matched", label: "First pass", slot: "bottom-left" },
        //   { value: "GSTR-2B", label: "Reconciled", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "purchases",
                label: "Purchases",
                badge: "Purchases",
                title: "Manage Purchase Invoices",
                subtitle: "Import & Track All Inward Supply Invoices",
                description:
                    "Add or import purchase invoices in WhiteBooks and monitor IMS status, GSTR-2B matching, and ITC eligibility in one place.",
                bullets: [
                    "Add or import purchase invoices month-wise",
                    "View IRN, type, party & invoice details",
                    "Track IMS & GSTR-2B status per invoice",
                    "Monitor IMS summary (Accepted, Rejected, Pending, No Action)",
                    "Reconcile purchases with GSTR-2B & perform bulk actions",
                ],
                cta: more("/features/gstr2B-purchases-gst-features"),
                media: {
                    label: "Manage Purchase Invoices",
                    poster: "@assets/product-images/gst-software/mini-image-purchase-gstr2b.webp",
                },
            },
            {
                id: "ims",
                label: "IMS",
                badge: "IMS",
                title: "Invoice Management System",
                subtitle: "Accept, Reject or Keep Invoices Pending",
                description:
                    "Review and manage IMS invoices in WhiteBooks by marking them as Accepted, Rejected, or Pending before GSTR-2B verification.",
                bullets: [
                    "Mark invoices as Accepted, Rejected or Pending",
                    "Download IMS data from the portal",
                    "Reconcile IMS with purchase records",
                    "View IMS vs Purchases reconciliation summary",
                    "Track match status & filter by recon/action",
                ],
                cta: more("/features/gstr2B-ims-gst-features"),
                media: {
                    label: "Invoice Management System",
                    poster: "@assets/product-images/gst-software/mini-image-ims-gstr2b.webp",
                },
            },
            {
                id: "gstr2b-data",
                label: "GSTR-2B data",
                badge: "GSTR-2B",
                title: "GSTR-2B Data",
                subtitle: "Verify GSTR-2B Entries Against Purchases",
                description:
                    "WhiteBooks lets you download GSTR-2B data and reconcile it with purchase invoices to identify matched, unmatched, and partially matched entries.",
                bullets: [
                    "Download GSTR-2B data month-wise",
                    "Reconcile 2B data with purchase invoices",
                    "View 2B vs Purchases reconciliation summary",
                    "Track matched, unmatched & partially matched invoices",
                    "Check recon status & proceed with one click",
                ],
                cta: more("/features/gstr2B-gst-features"),
                media: {
                    label: "GSTR-2B Data",
                    poster: "@assets/product-images/gst-software/mini-image-2b-gstr2b.webp",
                },
            },
            {
                id: "claim-summary",
                label: "ITC claim summary",
                badge: "Claimed Summary",
                title: "Draft ITC Claim Summary",
                subtitle: "Review & Post ITC Details into GSTR-3B",
                description:
                    "With WhiteBooks, review your draft ITC claim summary including Available, Reversed, Reclaimed, Ineligible, and Pending ITC before posting to GSTR-3B.",
                bullets: [
                    "View ITC status: Available, Reversed, Reclaimed & Ineligible",
                    "Track pending ITC not included in the current period",
                    "Check eligible ITC breakup (Imports, Services, RCM, ISD & Others)",
                    "Monitor ITC reversals as per CGST Rules",
                    "Calculate Net ITC (A–B) across IGST, CGST, SGST & CESS and post to GSTR-3B",
                ],
                cta: more("/features/gstr2B-claimsummary-gst-features"),
                media: {
                    label: "Draft ITC Claim Summary",
                    poster: "@assets/product-images/gst-software/mini-image-claimed-summary-gstr2b.webp",
                },
            },
            {
                id: "reconcile",
                label: "Reconcile & claim ITC",
                badge: "GSTR-2B Reconcile",
                title: "Reconcile & Claim ITC",
                subtitle: "Finalize Safe to Claim, Review & Can't be Claimed",
                description:
                    "Reconcile your purchases with GSTR-2B in WhiteBooks and classify ITC into Safe to Claim, Needs Review, and Cannot be Claimed for accurate return filing.",
                bullets: [
                    "Categorize invoices: Safe to Claim, Needs Review & Can’t Claim",
                    "Track eligible ITC as per Purchases & GSTR-2B",
                    "Monitor ITC available, reversed & net claimed",
                    "View ITC reversal, pending & reclaim entries",
                    "Apply reconcile rules & use manual match for unmatched invoices",
                ],
                cta: more("/features/gstr2B-reconciliation-gst-features"),
                media: {
                    label: "Reconcile & Claim ITC",
                    poster: "@assets/product-images/gst-software/mini-image-recouncile-gstr2b.webp",
                },
            },
            {
                id: "pending-itc",
                label: "Pending ITC",
                badge: "Pending ITC",
                title: "Track Pending ITC Invoices",
                subtitle: "Identify Invoices Not Included in GSTR-3B",
                description:
                    "View pending purchase invoices in WhiteBooks that are excluded from GSTR-3B for the selected period with a Claim ITC option for each.",
                bullets: [
                    "View all pending B2B invoices not included in GSTR-3B",
                    "Track total pending ITC value at a glance",
                    "Access invoice details (Party, GSTN, No., Date & Tax)",
                    "Claim ITC invoice-wise as needed",
                    "Filter, download & monitor status month-wise",
                ],
                cta: more("/features/gstr2B-pendingITC-gst-features"),
                media: {
                    label: "Track Pending ITC Invoices",
                    poster: "@assets/product-images/gst-software/mini-image-pending-itc-gstr2b.webp",
                },
            },
        ],
    },
    {
        id: "gstr3b",
        label: "GSTR-3B",
        heading: "GSTR-3B filing & tax payment",
        proof: [
            { value: "Auto", label: "compute" },
            { value: "ITC + Cash", label: "offset" },
            { value: "EVC", label: "e-filing" },
        ],
        // metrics: [
        //   { value: "GSTR-3B", label: "Auto-generated", slot: "top-right" },
        //   { value: "₹4.2L ITC", label: "Utilized", slot: "bottom-left" },
        //   { value: "Filed", label: "With EVC", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "auto-3b",
                label: "Auto GSTR-3B",
                badge: "GSTR-3B",
                title: "Auto GSTR-3B Filing",
                subtitle: "Compute Tax Liability from Sales & Purchases",
                description:
                    "WhiteBooks lets you auto generate your GSTR-3B return from sales and purchase data or GSTR-1 liability and push the finalized data directly to the GSTN portal.",
                bullets: [
                    "Auto-generate GSTR-3B from sales & purchases",
                    "Auto-calculate liability from GSTR-1 data",
                    "View key sections with detailed tax breakup",
                    "Cover all supply types: Taxable, Zero/Nil Rated, RCM & Non-GST",
                    "Push finalized GSTR-3B directly to GSTN",
                ],
                cta: more("/features/gstr3B-gst-features"),
                media: {
                    label: "Auto GSTR-3B Filing",
                    poster: "@assets/product-images/gst-software/mini-image-3b-gstr3b.webp",
                },
            },
            {
                id: "offset-liability",
                label: "Offset liability",
                badge: "Offset Liability",
                title: "Offset Tax Liability",
                subtitle: "View Cash & Credit Ledger Before Offsetting",
                description:
                    "WhiteBooks lets you view your cash ledger and credit ledger closing balances and offset tax liability using available ITC and cash for IGST, CGST, SGST, and CESS.",
                bullets: [
                    "View Cash & Credit Ledger closing balances (IGST, CGST, SGST, CESS)",
                    "Offset liability for regular & reverse charge supplies",
                    "Track tax payable, ITC utilized & cash payments",
                    "Monitor interest payable, paid & late fee details",
                    "One-click liability offset for faster processing",
                ],
                cta: more("/features/gstr3B-offsetLiability-gst-features"),
                media: {
                    label: "Offset Tax Liability",
                    poster: "@assets/product-images/gst-software/mini-image-offsetliability-gstr3b.webp",
                },
            },
            {
                id: "file-3b",
                label: "File GSTR-3B",
                badge: "Filing GSTR-3B",
                title: "File GSTR-3B with EVC",
                subtitle: "Review Filing Summary & Submit to GSTN",
                description:
                    "Review your GSTR-3B filing summary in WhiteBooks, fetched from the GSTN portal, and file your return using EVC for the selected monthly period.",
                bullets: [
                    "View period-wise GSTR-3B filing summary",
                    "Auto-fetch data from GSTN portal",
                    "Select Nil or Regular return option",
                    "Check category-wise tax details with POS & type",
                    "Track taxable value & IGST, CGST, SGST, CESS and file with EVC in one click",
                ],
                cta: more("/features/gstr3B-filing-gst-features"),
                media: {
                    label: "File GSTR-3B with EVC",
                    poster: "@assets/product-images/gst-software/mini-image-filing-gstr3b.webp",
                },
            },
        ],
    },
    {
        id: "gstr9",
        label: "GSTR-9",
        heading: "GSTR-9 annual return filing",
        proof: [
            { value: "Annual", label: "return" },
            { value: "Auto", label: "populated" },
            { value: "HSN", label: "summary" },
        ],
        // metrics: [
        //   { value: "GSTR-9", label: "Annual return", slot: "top-right" },
        //   { value: "Auto", label: "Populated", slot: "bottom-left" },
        //   { value: "Filed", label: "On GSTN", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "part2",
                label: "Part II",
                badge: "Part II",
                title: "Inward & Outward Supplies",
                subtitle: "Declare Annual Supply Transactions",
                description:
                    "With WhiteBooks, capture all outward and inward supplies for the financial year including advances, B2B, B2C, exports, SEZ, and reverse charge supplies.",
                bullets: [
                    "Declare B2C (unregistered) & B2B (registered) supplies",
                    "Report zero-rated exports, SEZ supplies & deemed exports",
                    "Track advances where tax is paid but invoice not issued",
                    "Report inward supplies under reverse charge",
                    "Auto-generate data from Sales & Purchases",
                ],
                cta: more("/features/gstr9-part2-gst-features"),
                media: {
                    label: "Inward & Outward Supplies",
                    poster: "@assets/product-images/gst-software/mini-image-part2-gstr9.webp",
                },
            },
            {
                id: "part3",
                label: "Part III",
                badge: "Part III",
                title: "Annual ITC Summary",
                subtitle: "Declare ITC Availed During the Financial Year",
                description:
                    "Declare complete Input Tax Credit details in WhiteBooks for the financial year including inputs, capital goods, and input services as reported in filed returns.",
                bullets: [
                    "View total ITC availed as per GSTR-3B",
                    "Declare ITC on inputs, capital goods & input services",
                    "Report ITC under RCM from unregistered persons",
                    "Include ITC from imports & ISD sources",
                    "Edit and update ITC values section-wise",
                ],
                cta: more("/features/gstr9-part3-gst-features"),
                media: {
                    label: "Annual ITC Summary",
                    poster: "@assets/product-images/gst-software/mini-image-part3-gstr9.webp",
                },
            },
            {
                id: "part4",
                label: "Part IV",
                badge: "Part IV",
                title: "Annual Tax Payment Overview",
                subtitle: "Report Tax Payable vs Paid via Cash & ITC",
                description:
                    "Report full tax payment details in WhiteBooks for the financial year including tax payable, cash payments, and ITC utilization across all tax heads.",
                bullets: [
                    "Report IGST, CGST, SGST/UTGST & CESS payable and paid",
                    "Track interest, late fee & penalty payments",
                    "View breakup of tax paid through Cash vs ITC",
                ],
                cta: more("/features/gstr9-part4-gst-features"),
                media: {
                    label: "Annual Tax Payment Overview",
                    poster: "@assets/product-images/gst-software/mini-image-part4-gstr9.webp",
                },
            },
            {
                id: "part5",
                label: "Part V",
                badge: "Part V",
                title: "Annual ITC Reporting & Adjustments",
                subtitle: "Amendments & ITC Adjustments for Prior Year",
                description:
                    "Report previous financial year transaction details in WhiteBooks as declared in returns filed between April and September of the current financial year or up to annual return filing.",
                bullets: [
                    "Report increased supplies via Debit Notes",
                    "Report reduced supplies via Credit Notes",
                    "Track ITC reversal & ITC availed for previous Financial Year",
                    "Auto-calculate total turnover",
                    "Report differential tax paid on amendments",
                ],
                cta: more("/features/gstr9-part5-gst-features"),
                media: {
                    label: "Annual ITC Reporting & Adjustments",
                    poster: "@assets/product-images/gst-software/mini-image-part5-gstr9.webp",
                },
            },
            {
                id: "part6",
                label: "Part VI",
                badge: "Part VI",
                title: "Demands & Refunds",
                subtitle: "Declare Refund, Demand & Composition Supply Details",
                description:
                    "WhiteBooks lets you report additional details including demands and refunds, composition supplies, deemed supplies under Section 143, and goods sent on approval.",
                bullets: [
                    "Report total refund claimed, sanctioned, rejected & pending",
                    "Declare total tax demand & payments made against it",
                    "Report supplies received from composition taxpayers",
                    "Declare deemed supplies & goods sent on approval basis",
                    "Track interest, penalty & late fee per tax head",
                ],
                cta: more("/features/gstr9-part6-gst-features"),
                media: {
                    label: "Demands & Refunds",
                    poster: "@assets/product-images/gst-software/mini-image-part6-gstr9.webp",
                },
            },
            {
                id: "file-gstr9",
                label: "File GSTR-9",
                badge: "File GSTR-9",
                title: "File Annual GSTR-9",
                subtitle: "Review & File Complete GSTR-9 on GSTN",
                description:
                    "With WhiteBooks, review all GSTN portal data and file your GSTR-9 annual return with complete information across supplies, ITC, tax payments, and HSN summary.",
                bullets: [
                    "View advances, inward & outward supply details",
                    "Check outward supplies where tax is not payable",
                    "Review ITC availed, reversed & other ITC information",
                    "Track tax paid during the financial years",
                ],
                cta: more("/features/gstr9-filing-gst-features"),
                media: {
                    label: "File Annual GSTR-9",
                    poster: "@assets/product-images/gst-software/mini-image-filing-gstr9.webp",
                },
            },
        ],
    },
    {
        id: "parties",
        label: "Parties",
        heading: "Track parties, balances & credit",
        proof: [
            { value: "Live", label: "balances" },
            { value: "Party-wise", label: "aging" },
            { value: "Credit", label: "controls" },
        ],
        // metrics: [
        //   { value: "₹18.6L", label: "Receivables", slot: "top-right" },
        //   { value: "32 parties", label: "Overdue", slot: "bottom-left" },
        //   { value: "Aging", label: "Up to date", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "parties",
                label: "Parties",
                badge: "Parties",
                title: "Manage Business Parties",
                subtitle: "Centralized Contacts with Credit & Balance Tracking",
                description:
                    "Add and manage customers and vendors in WhiteBooks with categorization, credit period setup, and real time receivables and payables tracking.",
                bullets: [
                    "Add parties with name, state & category",
                    "Track credit period & amount per party",
                    "Monitor receivables, payables & balance",
                    "Import parties in bulk via template",
                    "Edit details or view ledger instantly",
                ],
                cta: more("/features/track-parties-accounting-features"),
                media: {
                    label: "Manage Business Parties",
                    poster: "@assets/product-images/softwares/mini-image-parties-books.png",
                },
            },
        ],
    },
    {
        id: "inventory",
        label: "Inventory",
        heading: "Comprehensive product & inventory management",
        proof: [
            { value: "Real-time", label: "stock" },
            { value: "HSN-ready", label: "catalog" },
            { value: "Bulk", label: "import" },
        ],
        // metrics: [
        //   { value: "1,840 SKUs", label: "In catalog", slot: "top-right" },
        //   { value: "12 low", label: "Reorder soon", slot: "bottom-left" },
        //   { value: "₹34.2L", label: "Stock value", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "items",
                label: "Items",
                badge: "Items",
                title: "Manage Products & Services",
                subtitle: "HSN/SAC Mapping with Live Stock & Pricing",
                description:
                    "WhiteBooks lets you add and manage products and services with GST ready HSN and SAC codes, real time stock tracking, stock value, and dual pricing for fast and accurate invoicing.",
                bullets: [
                    "Add items with code, name & HSN/SAC",
                    "Track stock quantity & total value",
                    "Manage selling & purchase price per item",
                    "Adjust stock using Stock Adjust option",
                    "Import items in bulk via template",
                ],
                cta: more("/features/inventory-management-accounting-features"),
                media: {
                    label: "Manage Products & Services",
                    poster: "@assets/product-images/softwares/mini-image-items-books.png",
                },
            },
        ],
    },
    {
        id: "access",
        label: "Access",
        heading: "Role-based and real-time data access",
        proof: [
            { value: "Granular", label: "roles" },
            { value: "Controlled", label: "auditor access" },
            { value: "Real-time", label: "sync" },
        ],
        // metrics: [
        //   { value: "14 users", label: "Active", slot: "top-right" },
        //   { value: "6 roles", label: "Configured", slot: "bottom-left" },
        //   { value: "2 auditors", label: "Linked", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "employees",
                label: "Employees",
                badge: "Employees",
                title: "Manage Employees",
                subtitle: "Maintain Your Staff Records",
                description:
                    "Manage your employees in WhiteBooks with ID, contact details, joining date, and active or inactive status monitoring.",
                bullets: [
                    "Add employees with unique ID",
                    "Store name, email & mobile details",
                    "Track employee joining date",
                    "Switch between active & inactive status",
                    "Export employee data via template or Excel",
                ],
                cta: more("/features/employees-people-accounting-features"),
                media: {
                    label: "Manage Employees",
                    poster: "@assets/product-images/softwares/mini-image-pepole-emplyee-books.png",
                },
            },
            {
                id: "users",
                label: "Users",
                badge: "Users",
                title: "Manage System Users",
                subtitle: "Add Users Who Access This System",
                description:
                    "With WhiteBooks, control user access through roles and track login activity for all system users.",
                bullets: [
                    "Add users with username, email & mobile",
                    "Assign roles to each user",
                    "Manage user status (Active/Inactive)",
                    "Track last login time",
                    "Delink users & export list via template",
                ],
                cta: more("/features/users-people-accounting-features"),
                media: {
                    label: "Manage System Users",
                    poster: "@assets/product-images/softwares/mini-image-pepole-users-books.png",
                },
            },
            {
                id: "auditors",
                label: "Auditors",
                badge: "Auditors",
                title: "Add & Manage Auditors",
                subtitle: "Give Controlled Access to Your CA / Auditor",
                description:
                    "Link your auditor or CA in WhiteBooks and grant controlled access to review books with role based permissions and status tracking.",
                bullets: [
                    "Add auditor with username, email & mobile",
                    "Assign role & manage status",
                    "Track last login activity",
                    "Delink auditor in one click",
                    "Export auditor records in Excel",
                ],
                cta: more("/features/auditors-people-accounting-features"),
                media: {
                    label: "Add & Manage Auditors",
                    poster: "@assets/product-images/softwares/mini-image-pepole-auditors-books.png",
                },
            },
            {
                id: "roles",
                label: "Roles",
                badge: "Roles",
                title: "Create & Manage Roles",
                subtitle: "Define What Each User Can Access",
                description:
                    "WhiteBooks lets you create custom roles with a name and description to control and restrict user, employee, or auditor access within the system.",
                bullets: [
                    "Create roles with name & description",
                    "Assign roles to users & auditors",
                    "Edit or update role details anytime",
                    "Delete unused roles",
                    "Search & manage all roles centrally",
                ],
                cta: more("/features/roles-people-accounting-features"),
                media: {
                    label: "Create & Manage Roles",
                    poster: "@assets/product-images/softwares/mini-image-pepole-roles-books.png",
                },
            },
        ],
    },
    {
        id: "datahub",
        label: "DataHub",
        heading: "Bulk data import, migration tools & template management",
        proof: [
            { value: "1000+", label: "per import" },
            { value: "Tally", label: "migration" },
            { value: "Excel", label: "templates" },
        ],
        // metrics: [
        //   { value: "1000+", label: "Per import", slot: "top-right" },
        //   { value: "0 errors", label: "On validation", slot: "bottom-left" },
        //   { value: "Tally", label: "Migrated", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "import",
                label: "Bulk import",
                badge: "Bulk Import",
                title: "Bulk Import Invoices",
                subtitle: "Import 1000+ Invoices at Once",
                description:
                    "Upload bulk invoices in WhiteBooks and receive a notification after import completion, with error files accessible for 24 hours.",
                bullets: [
                    "Import more than 1000 invoices at a time",
                    "Supports Browser & Standard import methods",
                    "Track bulk import history (file name, size, date)",
                    "View total, successful & failed invoice counts",
                    "Monitor import time & completion status",
                ],
                cta: more("/features/imports-datahub-accounting-features"),
                media: {
                    label: "Bulk Import Invoices",
                    poster: "@assets/product-images/softwares/mini-image-datahub-import-books.png",
                },
            },
            {
                id: "mapping",
                label: "Import mapping",
                badge: "Import Mapping",
                title: "Custom Import Mapping",
                subtitle: "Build Your Own Import Templates",
                description:
                    "Create custom import templates in WhiteBooks for sales and purchase invoices using the mapping tool to align with your data format.",
                bullets: [
                    "Create custom import mapping templates",
                    "Map Sales & Purchase invoice fields as needed",
                    "Access built-in tutorial videos",
                    "View “How to Import Data Mapping” guide",
                    "Watch step-by-step “How to Bulk Import” guide",
                ],
                cta: more("/features/mapping-datahub-accounting-features"),
                media: {
                    label: "Custom Import Mapping",
                    poster: "@assets/product-images/softwares/mini-image-datahub-mapping-books.png",
                },
            },
            {
                id: "migration",
                label: "Migration",
                badge: "Migration",
                title: "Migrate Data from Tally",
                subtitle: "Seamlessly Switch from Tally to WhiteBooks",
                description:
                    "WhiteBooks lets you migrate your existing Tally data step by step using the Tally Connector and JSON file upload process.",
                bullets: [
                    "Download Tally Connector TCP to begin setup",
                    "Follow the Tally Migration Steps guide",
                    "Upload Ledger, Items & Vouchers JSON files",
                    "Migrate data in proper sequence",
                    "Track migration history (date, type & status)",
                ],
                cta: more("/features/migration-datahub-accounting-features"),
                media: {
                    label: "Migrate Data from Tally",
                    poster: "@assets/product-images/softwares/mini-image-datahub-migration-books.png",
                },
            },
            {
                id: "downloads",
                label: "Downloads",
                badge: "Downloads",
                title: "Download Reconciliation Reports",
                subtitle: "Access & Re-download Exported Files Anytime",
                description:
                    "Access past reconciliation and invoice reports in WhiteBooks from one place with user wise download tracking.",
                bullets: [
                    "View all downloaded files with type & name",
                    "Track download activity (user & time)",
                    "Re-download Reconcile2B Excel exports anytime",
                    "Filter & paginate download history",
                    "Access date-wise exports with direct links",
                ],
                cta: more("/features/downloads-datahub-accounting-features"),
                media: {
                    label: "Download Reconciliation Reports",
                    poster: "@assets/product-images/softwares/mini-image-datahub-downloads-books.png",
                },
            },
            {
                id: "templates",
                label: "Templates",
                badge: "Templates",
                title: "Instant Import Templates",
                subtitle: "WhiteBooks, Tally & Sage Templates Available",
                description:
                    "Download ready to use Excel import templates in WhiteBooks for sales, purchase, and e Invoice data compatible with WhiteBooks, Tally, and Sage formats.",
                bullets: [
                    "WhiteBooks Sales & Purchase templates available",
                    "Supports Tally Sales, Purchase & Prime templates",
                    "Includes Sage Sales, Purchase & e-Invoice templates",
                    "Single Sheet, Global & Additional Fields variants",
                    "Entertainment & e-Invoice specific templates supported",
                ],
                cta: more("/features/templates-datahub-accounting-features"),
                media: {
                    label: "Instant Import Templates",
                    poster: "@assets/product-images/softwares/mini-image-datahub-templates-books.png",
                },
            },
        ],
    },
    {
        id: "reports",
        label: "Reports",
        heading: "GST reports & compliance",
        proof: [
            { value: "Multi-month", label: "reports" },
            { value: "ITC", label: "insights" },
            { value: "HSN", label: "analytics" },
        ],
        // metrics: [
        //   { value: "Reconciled", label: "All filings", slot: "top-right" },
        //   { value: "ITC", label: "Optimized", slot: "bottom-left" },
        //   { value: "30+ reports", label: "Ready", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "compliance",
                label: "Compliances",
                badge: "Compliances",
                title: "GST Reconciliation & Compliance",
                subtitle: "Ensure accuracy across all GST filings",
                description:
                    "Compare sales, purchases, GST returns, e Invoices, and e Way Bills in WhiteBooks to detect mismatches and stay GST compliant.",
                bullets: [
                    "Sales vs GSTR-1 vs e-Invoice vs e-Way Bill",
                    "Purchase Register vs GSTR-2B reconciliation",
                    "Yearly reconciliation reports",
                    "Identify mismatches instantly",
                    "Improve filing accuracy",
                ],
                cta: more("/features/compliance-reports-gst-features"),
                media: {
                    label: "GST Reconciliation & Compliance",
                    poster: "@assets/product-images/gst-software/mini-image-compliance-gstrreports.webp",
                },
            },
            {
                id: "multi-month",
                label: "Multi-month",
                badge: "Multi Month",
                title: "Multi-Month GST Reports",
                subtitle: "Analyze GST data across periods",
                description:
                    "View consolidated GST reports in WhiteBooks across multiple months to monitor trends, performance, and compliance status.",
                bullets: [
                    "Multi-month GSTR-1, GSTR-2A & GSTR-2B",
                    "IMS report tracking",
                    "GSTR-3B consolidated view",
                    "Period-wise comparison",
                    "Better financial insights",
                ],
                cta: more("/features/multimonth-reports-gst-features"),
                media: {
                    label: "Multi-Month GST Reports",
                    poster: "@assets/product-images/gst-software/mini-image-multimonth-gstrreports.webp",
                },
            },
            {
                id: "summary",
                label: "Summary",
                badge: "Summary",
                title: "GST Summary & Filing Status",
                subtitle: "Quick overview of GST compliance",
                description:
                    "Get a clear snapshot of GST filing status and party wise compliance summary in WhiteBooks for better tracking and decisions.",
                bullets: [
                    "GST filing status report",
                    "Party-wise filing summary",
                    "Quick compliance overview",
                    "Identify pending filings",
                    "Simplified GST monitoring",
                ],
                cta: more("/features/summary-reports-gst-features"),
                media: {
                    label: "GST Summary & Filing Status",
                    poster: "@assets/product-images/gst-software/mini-image-summary-gstrreports.webp",
                },
            },
            {
                id: "itc",
                label: "ITC Insights",
                badge: "ITC Insights",
                title: "Input Tax Credit (ITC) Management",
                subtitle: "Track, optimize and safeguard ITC",
                description:
                    "WhiteBooks lets you manage Input Tax Credit efficiently with detailed insights on claimed, unclaimed, and reversal risks.",
                bullets: [
                    "ITC claimed & unclaimed reports",
                    "Rule 37 & 37A reversal tracking",
                    "ITC reclaim monitoring",
                    "Monthly ITC summaries",
                    "Reduce ITC loss risks",
                ],
                cta: more("/features/itc-reports-gst-features"),
                media: {
                    label: "Input Tax Credit (ITC) Management",
                    poster: "@assets/product-images/gst-software/mini-image-itc-gstrreports.webp",
                },
            },
            {
                id: "hsn",
                label: "HSN Analytics",
                badge: "HSN Analytics",
                title: "HSN & Tax Slab Analysis",
                subtitle: "Deep insights into tax classification",
                description:
                    "Analyze sales and purchases in WhiteBooks using HSN codes and tax slabs to improve compliance and reporting accuracy.",
                bullets: [
                    "HSN-wise sales & purchase reports",
                    "Tax slab-wise breakdown",
                    "Accurate tax classification",
                    "Compliance-ready data",
                    "Improved reporting clarity",
                ],
                cta: more("/features/hsn-reports-gst-features"),
                media: {
                    label: "HSN & Tax Slab Analysis",
                    poster: "@assets/product-images/gst-software/mini-image-hsnsummary-gstrreport.webp",
                },
            },
            {
                id: "gst-ledger",
                label: "GST Ledger",
                badge: "GST Ledger",
                title: "GST Ledger Management",
                subtitle: "Track balances and liabilities easily",
                description:
                    "WhiteBooks helps you keep track of GST cash, credit, and liability ledgers in one place for accurate balance and payment visibility.",
                bullets: [
                    "Cash ledger tracking",
                    "Credit ledger insights",
                    "Liability ledger overview",
                    "Real-time balance visibility",
                    "Better tax planning",
                ],
                cta: more("/features/ledger-reports-gst-features"),
                media: {
                    label: "GST Ledger Management",
                    poster: "@assets/product-images/gst-software/mini-image-gstlendger-gstrreport.webp",
                },
            },
        ],
    },
];
