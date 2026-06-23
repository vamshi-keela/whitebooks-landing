/**
 * e-Invoicing Software Platform Showcase — typed content for the category-driven
 * capabilities section on the e-invoicing software subpage.
 *
 * Mirrors the structure of ACCOUNTING_SHOWCASE_CATEGORIES: left category rail
 * (scroll-driven) · middle card content · right media placeholder. The
 * sub-feature pills inside a category swap card content + preview.
 *
 * Shared types and the `more()` CTA helper are reused from the accounting data
 * module so the two stay in lockstep. Posters point at
 * `@assets/product-images/e-invoice-software/*` and the shared
 * `@assets/product-images/softwares/*` set — some images may not exist in the
 * repo yet and will resolve once added.
 *
 * NOTE: `proof` and `metrics` are not present in the source markup (the legacy
 * e-invoice page uses a stacked-card layout). They are crafted here to match the
 * accounting showcase shape — tweak the values as needed.
 */

import type { ShowcaseCategory, ShowcaseCta } from "./accouting-platform-showcase.data";

const more = (href: string): ShowcaseCta => ({ label: "More features", href });

export const E_INVOICING_SOFTWARE_SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
    {
        id: "e-invoice",
        label: "e-Invoice",
        heading: "Generate e-Invoice in one click",
        proof: [
            { value: "1-click", label: "IRN" },
            { value: "B2B / Export", label: "& SEZ" },
            { value: "Bulk", label: "generation" },
        ],
        // metrics: [
        //     { value: "IRN", label: "Auto generated", note: "1-click", slot: "top-right" },
        //     { value: "185 IRNs", label: "Today", slot: "bottom-left" },
        //     { value: "100% signed", label: "GST verified", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "irn-generation",
                label: "e-Invoice & IRN",
                badge: "e-invoice",
                title: "e-Invoice & IRN Generation",
                subtitle: "Generate GST e-Invoices in One Click",
                description:
                    "WhiteBooks lets you select any sales invoice and generate a GST compliant e-Invoice instantly with auto generated IRN linked without leaving the screen.",
                bullets: [
                    "One-click IRN generation from sales invoices",
                    "Auto-fetch party GSTIN & invoice details",
                    "Instant acknowledgement number & date",
                    "Supports B2B, Export, SEZ & Deemed Export invoices",
                    "Bulk IRN generation for multiple invoices",
                ],
                cta: more("/features/generate-e-invoice-features"),
                media: {
                    label: "e-Invoice & IRN Generation",
                    poster: "@assets/product-images/e-invoice-software/mini-image-invoice-einvoice.png",
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
        //     { value: "₹18.6L", label: "Receivables", note: "↑ 6%", slot: "top-right" },
        //     { value: "32 parties", label: "Overdue", slot: "bottom-left" },
        //     { value: "Aging", label: "Up to date", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "parties",
                label: "Parties",
                badge: "Parties",
                title: "Manage business parties",
                subtitle: "Centralized contacts with credit & balance tracking",
                description:
                    "Add and manage customers and vendors with categorization, credit period setup and real-time receivables and payables.",
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
            { value: "Dual", label: "pricing" },
        ],
        // metrics: [
        //     { value: "1,840 SKUs", label: "In catalog", slot: "top-right" },
        //     { value: "12 low", label: "Reorder soon", note: "alert", slot: "bottom-left" },
        //     { value: "₹34.2L", label: "Stock value", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "items",
                label: "Items",
                badge: "Items",
                title: "Manage products & services",
                subtitle: "HSN / SAC mapping with live stock & pricing",
                description:
                    "Add and manage products and services with GST-ready HSN/SAC codes, real-time stock tracking, stock value and dual pricing for fast, accurate invoicing.",
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
        heading: "Role-based and real-time data access",
        proof: [
            { value: "Granular", label: "roles" },
            { value: "Controlled", label: "auditor access" },
            { value: "Real-time", label: "sync" },
        ],
        // metrics: [
        //     { value: "14 users", label: "Active", slot: "top-right" },
        //     { value: "6 roles", label: "Configured", slot: "bottom-left" },
        //     { value: "2 auditors", label: "Linked", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "employees",
                label: "Employees",
                badge: "Employees",
                title: "Manage employees",
                subtitle: "Maintain your staff records",
                description:
                    "Manage employees with ID, contact details, joining date and active or inactive status monitoring.",
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
                title: "Manage system users",
                subtitle: "Add users who access this system",
                description:
                    "Control user access through roles and track login activity for all system users.",
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
                title: "Add & manage auditors",
                subtitle: "Give controlled access to your CA / auditor",
                description:
                    "Link your auditor or CA and grant controlled access to review books with role-based permissions and status tracking.",
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
                title: "Create & manage roles",
                subtitle: "Define what each user can access",
                description:
                    "Create custom roles with a name and description to control and restrict user, employee or auditor access.",
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
        id: "datahub",
        label: "DataHub",
        heading: "Bulk data import, migration tools & template management",
        proof: [
            { value: "1000+", label: "per import" },
            { value: "Tally", label: "migration" },
            { value: "Excel", label: "templates" },
        ],
        // metrics: [
        //       { value: "1000+", label: "Per import", slot: "top-right" },
        //       { value: "0 errors", label: "On validation", slot: "bottom-left" },
        //       { value: "Tally", label: "Migrated", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "import",
                label: "Bulk import",
                badge: "Bulk import",
                title: "Bulk import invoices",
                subtitle: "Import 1000+ invoices at once",
                description:
                    "Upload bulk invoices and get notified on completion, with error files available for 24 hours.",
                bullets: [
                    "Import more than 1000 invoices at a time",
                    "Supports Browser & Standard import methods",
                    "Track bulk import history (file name, size, date)",
                    "View total, successful & failed invoice counts",
                    "Monitor import time & completion status",
                ],
                cta: more("/features/imports-datahub-accounting-features"),
                media: {
                    label: "Bulk import",
                    poster: "@assets/product-images/softwares/mini-image-datahub-import-books.png",
                },
            },
            {
                id: "mapping",
                label: "Import mapping",
                badge: "Import mapping",
                title: "Custom import mapping",
                subtitle: "Build your own import templates",
                description:
                    "Create custom import templates for sales and purchase invoices using the mapping tool to match your data format.",
                bullets: [
                    "Create custom import mapping templates",
                    "Map sales & purchase invoice fields as needed",
                    "Access built-in tutorial videos",
                    'View "How to Import Data Mapping" guide',
                    'Watch step-by-step "How to Bulk Import" guide',
                ],
                cta: more("/features/mapping-datahub-accounting-features"),
                media: {
                    label: "Import mapping",
                    poster: "@assets/product-images/softwares/mini-image-datahub-mapping-books.png",
                },
            },
            {
                id: "migration",
                label: "Migration",
                badge: "Migration",
                title: "Migrate data from Tally",
                subtitle: "Seamlessly switch from Tally to WhiteBooks",
                description:
                    "Migrate your existing Tally data step by step using the Tally Connector and JSON file upload process.",
                bullets: [
                    "Download Tally Connector TCP to begin setup",
                    "Follow the Tally migration steps guide",
                    "Upload Ledger, Items & Vouchers JSON files",
                    "Migrate data in proper sequence",
                    "Track migration history (date, type & status)",
                ],
                cta: more("/features/migration-datahub-accounting-features"),
                media: {
                    label: "Migration",
                    poster: "@assets/product-images/softwares/mini-image-datahub-migration-books.png",
                },
            },
            {
                id: "downloads",
                label: "Downloads",
                badge: "Downloads",
                title: "Download reconciliation reports",
                subtitle: "Access & re-download exported files anytime",
                description:
                    "Access past reconciliation and invoice reports from one place with user-wise download tracking.",
                bullets: [
                    "View all downloaded files with type & name",
                    "Track download activity (user & time)",
                    "Re-download Reconcile2B Excel exports anytime",
                    "Filter & paginate download history",
                    "Access date-wise exports with direct links",
                ],
                cta: more("/features/downloads-datahub-accounting-features"),
                media: {
                    label: "Downloads",
                    poster: "@assets/product-images/softwares/mini-image-datahub-downloads-books.png",
                },
            },
            {
                id: "templates",
                label: "Templates",
                badge: "Templates",
                title: "Instant import templates",
                subtitle: "WhiteBooks, Tally & Sage templates available",
                description:
                    "Download ready-to-use Excel import templates for sales, purchase and e-invoice data compatible with WhiteBooks, Tally and Sage formats.",
                bullets: [
                    "WhiteBooks Sales & Purchase templates available",
                    "Supports Tally Sales, Purchase & Prime templates",
                    "Includes Sage Sales, Purchase & e-Invoice templates",
                    "Single Sheet, Global & Additional Fields variants",
                    "Entertainment & e-Invoice specific templates supported",
                ],
                cta: more("/features/templates-datahub-accounting-features"),
                media: {
                    label: "Templates",
                    poster: "@assets/product-images/softwares/mini-image-datahub-templates-books.png",
                },
            },
        ],
    },
    {
        id: "reports",
        label: "e-Invoice Report",
        heading: "e-Invoice reporting & IRN status",
        proof: [
            { value: "IRN", label: "status" },
            { value: "Period-wise", label: "summary" },
            { value: "PDF / Excel", label: "export" },
        ],
        // metrics: [
        //     { value: "IRN status", label: "Up to date", slot: "top-right" },
        //     { value: "Period-wise", label: "Monthly view", slot: "bottom-left" },
        //     { value: "0 gaps", label: "Before filing", slot: "bottom-right" },
        // ],
        tabs: [
            {
                id: "irn-status",
                label: "IRN status",
                badge: "IRN Status",
                title: "IRN Status Overview",
                subtitle: "View generated, pending & cancelled IRNs by period",
                description:
                    "Get a full view of e-Invoice compliance in WhiteBooks by tracking generated, pending, and cancelled IRNs with amount wise details for GST filing.",
                bullets: [
                    "View total Generated, Pending & Cancelled IRNs",
                    "Period-wise IRN status summary per month",
                    "Amount-wise breakdown for each status",
                    "Identify compliance gaps before GST filing",
                    "Export IRN status report to Excel or PDF instantly",
                ],
                cta: more("/features/reports-e-invoice-features"),
                media: {
                    label: "IRN Status Overview",
                    poster: "@assets/product-images/e-invoice-software/mini-image-reports-einvoice.png",
                },
            },
        ],
    },
];
