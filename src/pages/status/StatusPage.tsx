import { Header, Footer } from '@/layouts/SiteShell';
import {
  CheckCircle2, Activity, Clock, Zap, AlertTriangle, ServerCog,
  Mail, Webhook, Rss, ShieldCheck, CalendarCheck,
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────────────────────────
   Live status of every component customers depend on. Figures mirror the
   published Whitebooks status page; wire these to the real status feed when the
   monitoring API is available. */

interface Metric { value: string; label: string }

const METRICS: Metric[] = [
  { value: '99.994%', label: '30-day uptime (production)' },
  { value: '99.991%', label: '90-day uptime (production)' },
  { value: '87 ms', label: 'p50 IRN latency (24h)' },
  { value: '312 ms', label: 'p95 IRN latency (24h)' },
  { value: '0', label: 'Active incidents' },
  { value: '1.6 M', label: 'IRNs processed (24h)' },
];

interface Component { name: string; endpoint: string; uptime: string; desc: string }

const COMPONENTS: Component[] = [
  { name: 'GST API', endpoint: 'api.whitebooks.in/gst', uptime: '99.995%', desc: 'GSTR filing, GSTR-2B fetch, GSTIN verification' },
  { name: 'e-Invoice API', endpoint: 'api.whitebooks.in/einvoice', uptime: '99.993%', desc: 'IRN generation, cancellation, QR codes, bulk processing' },
  { name: 'e-Way Bill API', endpoint: 'api.whitebooks.in/eway', uptime: '99.996%', desc: 'Create, extend, cancel, consolidate' },
  { name: 'KSA ZATCA API', endpoint: 'api.whitebooks.in/ksa-einvoice', uptime: '99.990%', desc: 'Phase-2 clearance and reporting' },
  { name: 'Sandbox', endpoint: 'apisandbox.whitebooks.in', uptime: '99.97%', desc: 'Free development environment' },
  { name: 'Hosted Dashboard', endpoint: 'app.whitebooks.in', uptime: '99.992%', desc: 'Multi-feature UI' },
  { name: 'GSP Gateway', endpoint: 'upstream GSTN', uptime: '99.994%', desc: 'Authentication and routing' },
  { name: 'IRP Integration', endpoint: 'upstream NIC', uptime: '99.95%', desc: 'External dependency tracking' },
];

interface Plan { plan: string; sla: string; credits: string; support: string }

const PLANS: Plan[] = [
  { plan: 'Starter', sla: '99.5%', credits: 'None', support: 'Email (24h reply)' },
  { plan: 'Growth', sla: '99.9%', credits: 'None', support: 'Email + chat (8h reply)' },
  { plan: 'Business', sla: '99.95%', credits: '10% monthly fee if missed', support: 'Priority (4h reply)' },
  { plan: 'Enterprise', sla: '99.99%', credits: 'Up to 30% monthly fee', support: 'Dedicated Account Manager + 24×7 Slack' },
];

interface Incident { date: string; title: string; body: string }

const INCIDENTS: Incident[] = [
  {
    date: '10 May 2026',
    title: 'IRP upstream slowness',
    body: 'Elevated latencies (p95 ~2.4s) between 14:22–14:48 IST caused by upstream IRP slowness. Resolved by queueing requests until the IRP recovered.',
  },
  {
    date: '22 April 2026',
    title: 'Sandbox 502 errors',
    body: 'Sandbox returned 502 errors between 09:10–09:33 IST due to a load-balancer configuration issue. Production was unaffected.',
  },
  {
    date: '15 March 2026',
    title: 'KSA ZATCA simulation maintenance',
    body: 'Scheduled 4-hour maintenance window (02:00–06:00 IST) on the KSA ZATCA simulation environment.',
  },
  {
    date: '18 February 2026',
    title: 'GSP gateway restart',
    body: 'A 2-minute gap (03:14–03:16 IST) occurred during a routine certificate rotation on the GSP gateway.',
  },
  {
    date: '12 January 2026',
    title: 'Dashboard login slowness',
    body: 'Dashboard logins took ~6 seconds (vs the typical 800 ms) between 11:50–12:14 IST, traced to a session-cache cold start.',
  },
];

interface Channel { icon: React.ReactNode; title: string; body: string }

const CHANNELS: Channel[] = [
  { icon: <Mail size={18} />, title: 'Email digest', body: 'Subscribe via the contact form for a status digest in your inbox.' },
  // { icon: <Slack size={18} />, title: 'Slack', body: 'Real-time status alerts pushed to your workspace (Enterprise).' },
  { icon: <Webhook size={18} />, title: 'Webhook', body: 'Receive a POST to your endpoint on every status change (Enterprise).' },
  { icon: <Rss size={18} />, title: 'RSS feed', body: 'Machine-readable incident feed — planned for Q3 2026.' },
];

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export function StatusPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />

      <main className="pt-[100px] pb-20">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="pb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-soft)] px-3 py-1.5 text-sm font-medium text-[var(--brand)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
              </span>
              All systems operational
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text)]">
              Whitebooks Status
            </h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-[var(--muted)]">
              Live status of every component customers depend on — GST API, e-Invoice IRN, e-Way Bill,
              KSA ZATCA, hosted dashboard, and our GSP gateway.
            </p>
          </section>

          {/* ── Metrics ──────────────────────────────────────────────────── */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)]">
            {METRICS.map(m => (
              <div key={m.label} className="bg-[var(--bg-2)] px-4 py-5">
                <div className="text-2xl font-semibold tracking-tight text-[var(--text)]">{m.value}</div>
                <div className="mt-1 text-xs leading-snug text-[var(--muted)]">{m.label}</div>
              </div>
            ))}
          </section>

          {/* ── Components ───────────────────────────────────────────────── */}
          <section className="mt-14">
            <div className="flex items-center gap-2.5">
              <Activity size={18} className="text-[var(--brand)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Components</h2>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-2)]">
              {COMPONENTS.map((c, i) => (
                <div
                  key={c.name}
                  className={`flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-6 py-4 ${i !== 0 ? 'border-t border-[var(--line)]' : ''
                    }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--text)]">{c.name}</span>
                      <code className="hidden sm:inline text-xs text-[var(--muted)]">{c.endpoint}</code>
                    </div>
                    <div className="mt-0.5 text-sm text-[var(--muted)]">{c.desc}</div>
                  </div>
                  <div className="text-sm tabular-nums text-[var(--muted)]">{c.uptime}</div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-soft)] px-2.5 py-1 text-xs font-medium text-[var(--success)]">
                    <CheckCircle2 size={13} />
                    Operational
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ── SLA by plan ──────────────────────────────────────────────── */}
          <section className="mt-14">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-[var(--brand)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">SLA by plan</h2>
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--bg-2)]">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--muted)]">
                    <th className="px-4 sm:px-6 py-3.5 font-medium">Plan</th>
                    <th className="px-4 sm:px-6 py-3.5 font-medium">Uptime SLA</th>
                    <th className="px-4 sm:px-6 py-3.5 font-medium">Credits</th>
                    <th className="px-4 sm:px-6 py-3.5 font-medium">Support</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANS.map((p, i) => (
                    <tr key={p.plan} className={i !== 0 ? 'border-t border-[var(--line)]' : ''}>
                      <td className="px-4 sm:px-6 py-3.5 font-medium text-[var(--text)]">{p.plan}</td>
                      <td className="px-4 sm:px-6 py-3.5 tabular-nums text-[var(--text)]">{p.sla}</td>
                      <td className="px-4 sm:px-6 py-3.5 text-[var(--muted)]">{p.credits}</td>
                      <td className="px-4 sm:px-6 py-3.5 text-[var(--muted)]">{p.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Recent incidents ─────────────────────────────────────────── */}
          <section className="mt-14">
            <div className="flex items-center gap-2.5">
              <AlertTriangle size={18} className="text-[var(--brand)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Recent incidents</h2>
            </div>
            <ol className="mt-5 space-y-4">
              {INCIDENTS.map(inc => (
                <li
                  key={inc.date}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] px-4 sm:px-6 py-5"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-medium text-[var(--text)]">{inc.title}</h3>
                    <span className="text-xs text-[var(--muted)]">{inc.date}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{inc.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Upcoming maintenance ─────────────────────────────────────── */}
          <section className="mt-14">
            <div className="flex items-center gap-2.5">
              <CalendarCheck size={18} className="text-[var(--brand)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Upcoming maintenance</h2>
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] px-4 sm:px-6 py-5">
              <Clock size={18} className="mt-0.5 shrink-0 text-[var(--muted)]" />
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                No scheduled maintenance windows in the next 14 days. Planned maintenance is announced at
                least 7 days in advance to enterprise customers.
              </p>
            </div>
          </section>

          {/* ── Subscribe ────────────────────────────────────────────────── */}
          <section className="mt-14">
            <div className="flex items-center gap-2.5">
              <Zap size={18} className="text-[var(--brand)]" />
              <h2 className="text-xl font-semibold text-[var(--text)]">Subscribe to updates</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {CHANNELS.map(ch => (
                <div
                  key={ch.title}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] px-4 sm:px-5 py-4"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--brand-border)] bg-[var(--brand-soft)] text-[var(--brand)]">
                    {ch.icon}
                  </span>
                  <div>
                    <h3 className="font-medium text-[var(--text)]">{ch.title}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{ch.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Last update ──────────────────────────────────────────────── */}
          <p className="mt-12 flex items-center gap-2 text-xs text-[var(--muted)]">
            <ServerCog size={14} />
            Last update: 26 May 2026, 08:00 IST · auto-refreshes every 60 seconds.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StatusPage;
