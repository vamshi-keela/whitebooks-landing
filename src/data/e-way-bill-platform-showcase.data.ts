/**
 * e-Way Bill Software Platform Showcase — typed content for the category-driven
 * capabilities section on the e-Way Bill software subpage.
 *
 * Mirrors the structure of ACCOUNTING_SHOWCASE_CATEGORIES: left category rail
 * (scroll-driven) · middle card content · right media placeholder. The
 * sub-feature pills inside a category swap card content + preview.
 *
 * Shared types and the `more()` CTA helper are reused from the accounting data
 * module so the two stay in lockstep. Posters point at
 * `@assets/product-images/e-way-bill-software/*` and the shared
 * `@assets/product-images/softwares/*` — some images may not exist in the
 * repo yet and will resolve once added.
 *
 * NOTE: `proof` and `metrics` are not present in the source markup (the legacy
 * e-Way Bill page uses a stacked-card layout). They are crafted here to match
 * the accounting showcase shape — tweak the values as needed.
 */

import type { ShowcaseCategory, ShowcaseCta } from "./accouting-platform-showcase.data";

const more = (href: string): ShowcaseCta => ({ label: "More features", href });

export const E_WAY_BILL_SOFTWARE_SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
    {
        id: "ewaybill-management",
        label: "e-Way Bill",
        heading: "Generate, track & reconcile e-Way Bills",
        proof: [
            { value: "Outward", label: "& inward" },
            { value: "Validity", label: "alerts" },
            { value: "1-click", label: "register sync" },
        ],
        // metrics: [
        //   { value: "1,240 bills", label: "This month", note: "↑ 14%", slot: "top-right" },
        //   { value: "Validity", label: "Tracked", slot: "bottom-left" },
        //   { value: "100% linked", label: "To registers", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "generate-manage",
                label: "Generate & manage",
                badge: "e-Way Bill",
                title: "Generate and Manage",
                subtitle: "Status & validity tracking for all outward and inward shipments",
                description:
                    "WhiteBooks lets you create and manage all your e-Way Bills in one place with bill numbers, validity dates, party details, and transaction type for full compliance.",
                bullets: [
                    "Create or import e-Way Bills",
                    "Track e-Way Bill No., date & validity",
                    "View status, type & party details",
                    "Add directly to sales or purchase register",
                    "Filter month-wise & download in bulk",
                ],
                cta: more("/features/generate-manage-ewaybill-features"),
                media: {
                    label: "Generate and Manage",
                    poster: "@assets/product-images/e-way-bill-software/mini-image-manage-allinvoice-ewaybill.png",
                },
            },
            {
                id: "sales-register",
                label: "Sales register",
                badge: "Sales",
                title: "Sales Register",
                subtitle: "Sales-linked e-Way Bill register with validity alerts",
                description:
                    "Monitor outward e-Way Bills in WhiteBooks linked to sales and view party details, validity status, and Sales Register reconciliation in real time.",
                bullets: [
                    "View outward e-Way Bills with party & type",
                    "Track bill no., date & validity per shipment",
                    "Monitor transaction amount per entry",
                    "Add outward bills to Sales Register",
                    "Filter month-wise & export instantly",
                ],
                cta: more("/features/sales-ewaybill-features"),
                media: {
                    label: "Sales Register",
                    poster: "@assets/product-images/e-way-bill-software/mini-image-sale-outwared-einvoice.png",
                },
            },
            {
                id: "purchase-register",
                label: "Purchase register",
                badge: "Purchases",
                title: "Purchase Register",
                subtitle: "Purchase-linked e-Way Bill register with validity tracking",
                description:
                    "WhiteBooks lets you track all inward e-Way Bills linked to purchases with validity monitoring, party details, and compliant goods receipt every time.",
                bullets: [
                    "View inward e-Way Bills with party & type",
                    "Track bill no., date & validity per entry",
                    "Monitor transaction amount per shipment",
                    "Add inward bills to Purchase Register",
                    "Filter month-wise & export instantly",
                ],
                cta: more("/features/purchases-ewaybill-features"),
                media: {
                    label: "Purchase Register",
                    poster: "@assets/product-images/e-way-bill-software/mini-image-purchase-inward-e-invoice.png",
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
        //   { value: "₹18.6L", label: "Receivables", note: "↑ 6%", slot: "top-right" },
        //   { value: "32 parties", label: "Overdue", slot: "bottom-left" },
        //   { value: "Aging", label: "Up to date", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "parties",
                label: "Parties",
                badge: "Parties",
                title: "Manage Business Parties",
                subtitle: "Centralized contacts with credit & balance tracking",
                description:
                    "Add and manage customers and vendors in WhiteBooks with categorization, credit period setup, and real-time receivables and payables tracking.",
                bullets: [
                    "Add parties with name, state & category",
                    "Track credit period & amount per party",
                    "Monitor receivables, payables & balance",
                    "Import parties in bulk via template",
                    "Edit details or view ledger instantly",
                ],
                cta: more("/features/track-parties-accounting-features"),
                media: {
                    label: "Parties",
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
            { value: "Batch", label: "tracking" },
        ],
        // metrics: [
        //   { value: "1,840 SKUs", label: "In catalog", slot: "top-right" },
        //   { value: "12 low", label: "Reorder soon", note: "alert", slot: "bottom-left" },
        //   { value: "₹34.2L", label: "Stock value", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "items",
                label: "Items",
                badge: "Items",
                title: "Manage Products & Services",
                subtitle: "HSN / SAC mapping with live stock & pricing",
                description:
                    "WhiteBooks lets you add and manage products and services with GST-ready HSN and SAC codes, real-time stock tracking, stock value, and dual pricing for fast and accurate invoicing.",
                bullets: [
                    "Add items with code, name & HSN / SAC",
                    "Track stock quantity & total value",
                    "Manage selling & purchase price per item",
                    "Adjust stock using Stock Adjust option",
                    "Import items in bulk via template",
                ],
                cta: more("/features/inventory-management-accounting-features"),
                media: {
                    label: "Items",
                    poster: "@assets/product-images/softwares/mini-image-items-books.png",
                },
            },
        ],
    },
    {
        id: "access",
        label: "Access",
        heading: "Role-based & real-time data access",
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
                subtitle: "Maintain your staff records",
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
                    label: "Employees",
                    poster: "@assets/product-images/softwares/mini-image-pepole-emplyee-books.png",
                },
            },
            {
                id: "users",
                label: "Users",
                badge: "Users",
                title: "Manage System Users",
                subtitle: "Add users who access this system",
                description:
                    "With WhiteBooks, control user access through roles and track login activity for all system users.",
                bullets: [
                    "Add users with username, email & mobile",
                    "Assign roles to each user",
                    "Manage user status (active / inactive)",
                    "Track last login time",
                    "Delink users & export list via template",
                ],
                cta: more("/features/users-people-accounting-features"),
                media: {
                    label: "Users",
                    poster: "@assets/product-images/softwares/mini-image-pepole-users-books.png",
                },
            },
            {
                id: "auditors",
                label: "Auditors",
                badge: "Auditors",
                title: "Add & Manage Auditors",
                subtitle: "Give controlled access to your CA / auditor",
                description:
                    "Link your auditor or CA in WhiteBooks and grant controlled access to review books with role-based permissions and status tracking.",
                bullets: [
                    "Add auditor with username, email & mobile",
                    "Assign role & manage status",
                    "Track last login activity",
                    "Delink auditor in one click",
                    "Export auditor records in Excel",
                ],
                cta: more("/features/auditors-people-accounting-features"),
                media: {
                    label: "Auditors",
                    poster: "@assets/product-images/softwares/mini-image-pepole-auditors-books.png",
                },
            },
            {
                id: "roles",
                label: "Roles",
                badge: "Roles",
                title: "Create & Manage Roles",
                subtitle: "Define what each user can access",
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
                    label: "Roles",
                    poster: "@assets/product-images/softwares/mini-image-pepole-roles-books.png",
                },
            },
        ],
    },
    {
        id: "reports",
        label: "Reports",
        heading: "e-Way Bill reporting & reconciliation",
        proof: [
            { value: "Outward", label: "vs sales" },
            { value: "Inward", label: "vs purchases" },
            { value: "PDF / Excel", label: "export" },
        ],
        // metrics: [
        //   { value: "Consolidated", label: "e-Way Bill view", slot: "top-right" },
        //   { value: "Matched", label: "Sales & purchases", slot: "bottom-left" },
        //   { value: "0 missing", label: "Entries flagged", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "ewaybill-reports",
                label: "Reports",
                badge: "Reports",
                title: "e-Way Bill Reports",
                subtitle: "Outward, inward & comparative reports vs. sales & purchases",
                description:
                    "View e-Way Bill summaries in WhiteBooks and compare sales and purchases side by side for complete and accurate movement tracking.",
                bullets: [
                    "View consolidated e-Way Bill report",
                    "Compare outward bills with sales invoices",
                    "Compare inward bills with purchase invoices",
                    "Analyse sales, purchases & e-Way Bills together",
                    "Identify unmatched or missing entries instantly",
                ],
                cta: more("/features/reports-ewaybill-features"),
                media: {
                    label: "e-Way Bill Reports",
                    poster: "@assets/product-images/e-way-bill-software/mini-image-reports-ewaybill.png",
                },
            },
        ],
    },
];
