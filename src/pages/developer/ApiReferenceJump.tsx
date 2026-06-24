import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ArrowUpRight, ChevronDown, Layers } from 'lucide-react';
import { type ApiSpecKey, openApiSpec } from '../../data/openapi-spec';
import { normalizeSpec } from '../../utils/normalizeSpec';
import { groupByTag } from '../../utils/groupOperations';
import { operationToSlug } from './utils/operationSlug';
import { fadeUp, stagger, scaleIn, SectionLabel, SectionHeading } from './GstShared';

// ─── Types ────────────────────────────────────────────────────────────────────

/** A curated, high-traffic tag promoted to a full "Get started" card. */
export interface FeaturedApiTag {
  /** Must match a `tag.name` in the OpenAPI spec. */
  tag: string;
  /** Human-friendly card title. */
  label: string;
  /** One-line description of what the category does. */
  blurb: string;
  icon: LucideIcon;
}

interface Props {
  apiType: ApiSpecKey;
  /** URL segment under /developer (e.g. "gst-api"). */
  apiSlug: string;
  /** Curated cards shown up top — typically 4–6. */
  featured: FeaturedApiTag[];
  /** Optional pretty labels for the remaining (chip) tags, keyed by tag name. */
  labelMap?: (tag: string) => string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Default prettifier: "GSTR1A" → "GSTR-1A", leaves other tags untouched. */
function defaultLabel(tag: string): string {
  return tag.replace(/^GSTR(\d.*)$/i, 'GSTR-$1');
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * "Jump into the API" launcher. Renders a curated grid of category cards plus a
 * collapsible overflow of the remaining tags as chips — so a long spec (the GST
 * API has 28 tags) stays scannable instead of dumping every group on the page.
 * Each card / chip deep-links straight to the first endpoint of that tag group.
 */
export function ApiReferenceJump({ apiType, apiSlug, featured, labelMap }: Props): React.ReactElement {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const { groupMap, totalEndpoints, totalGroups, restTags } = useMemo(() => {
    const spec = openApiSpec(apiType);
    const ops = normalizeSpec(spec);
    const groups = groupByTag(ops, spec.tags ?? []);
    const map = new Map(groups.map(g => [g.tag.name, g]));
    const featuredSet = new Set(featured.map(f => f.tag));
    const rest = groups
      .filter(g => !featuredSet.has(g.tag.name))
      .sort((a, b) => b.operations.length - a.operations.length);
    return {
      groupMap: map,
      totalEndpoints: ops.length,
      totalGroups: groups.length,
      restTags: rest,
    };
  }, [apiType, featured]);

  const prettify = labelMap ?? defaultLabel;

  const go = (tag: string) => {
    const group = groupMap.get(tag);
    const first = group?.operations[0];
    navigate(first ? `/developer/${apiSlug}/${operationToSlug(first.method, first.path)}` : `/developer/${apiSlug}`);
  };

  const opCount = (tag: string) => groupMap.get(tag)?.operations.length ?? 0;

  // Only render featured cards whose tag actually exists in the spec.
  const cards = featured.filter(f => groupMap.has(f.tag));

  return (
    <section id="api-reference" className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]">
      <div className="max-w-[980px] mx-auto">
        {/* ── Heading ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-9 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            {/* <SectionLabel>Get Started</SectionLabel> */}
            <SectionHeading>Jump Into the API</SectionHeading>
            <p className="mt-3.5 text-[14px] max-w-[520px] leading-[1.7]" style={{ color: 'var(--dp-fg-muted)' }}>
              Pick a category to land straight on the endpoint reference — request schemas, parameters,
              and live code examples included.
            </p>
          </div>
          {/* Coverage chip */}
          <div
            className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] self-start sm:self-auto whitespace-nowrap"
            style={{ background: 'var(--dp-surface-2)', border: '1px solid var(--dp-border)' }}
          >
            <Layers size={13} color="var(--dp-accent-2)" />
            <span className="text-[11.5px] font-medium" style={{ color: 'var(--dp-fg-muted)', fontFamily: 'var(--dp-font-mono)' }}>
              {totalGroups} groups · {totalEndpoints} endpoints
            </span>
          </div>
        </motion.div>

        {/* ── Featured cards ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {cards.map(({ tag, label, blurb, icon: Icon }) => (
            <motion.button
              key={tag}
              type="button"
              variants={scaleIn}
              onClick={() => go(tag)}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="group relative text-left rounded-[14px] p-5 cursor-pointer overflow-hidden transition-shadow duration-200"
              style={{ background: 'var(--dp-surface-2)', border: '1px solid var(--dp-border)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--dp-accent-line)';
                e.currentTarget.style.boxShadow = '0 0 28px rgba(220,47,101,0.09)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--dp-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between mb-3.5">
                <div
                  className="w-9 h-9 rounded-[9px] flex items-center justify-center"
                  style={{ background: 'rgba(220,47,101,0.08)', border: '1px solid rgba(220,47,101,0.15)' }}
                >
                  <Icon size={16} color="var(--dp-accent-2)" />
                </div>
                <ArrowUpRight
                  size={16}
                  color="var(--dp-fg-faint)"
                  className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[14px] font-semibold" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}>
                  {label}
                </span>
                <span
                  className="text-[9px] px-1.5 py-[2px] rounded-full font-semibold"
                  style={{ background: 'var(--dp-surface-3)', color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)' }}
                >
                  {opCount(tag)} endpoints
                </span>
              </div>
              <p className="m-0 text-[12px] leading-[1.6]" style={{ color: 'var(--dp-fg-muted)' }}>{blurb}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* ── Overflow: remaining tags as chips ── */}
        {restTags.length > 0 && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-[12px] font-medium cursor-pointer transition-colors duration-150"
              style={{ background: 'var(--dp-surface-2)', border: '1px solid var(--dp-border)', color: 'var(--dp-fg-muted)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--dp-fg)'; e.currentTarget.style.borderColor = 'var(--dp-border-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--dp-fg-muted)'; e.currentTarget.style.borderColor = 'var(--dp-border)'; }}
            >
              {expanded ? 'Hide' : 'Browse all'} {restTags.length} more API groups
              <ChevronDown
                size={14}
                className="transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
              />
            </button>

            <motion.div
              initial={false}
              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-4">
                {restTags.map(g => (
                  <button
                    key={g.tag.name}
                    type="button"
                    onClick={() => go(g.tag.name)}
                    className="group inline-flex items-center gap-2 pl-3 pr-2.5 py-[7px] rounded-full text-[12px] cursor-pointer transition-colors duration-150"
                    style={{ background: 'var(--dp-surface-2)', border: '1px solid var(--dp-border)', color: 'var(--dp-fg-muted)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--dp-accent-2)'; e.currentTarget.style.borderColor = 'var(--dp-accent-line)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--dp-fg-muted)'; e.currentTarget.style.borderColor = 'var(--dp-border)'; }}
                  >
                    <span className="font-medium" style={{ fontFamily: 'var(--dp-font-mono)' }}>{prettify(g.tag.name)}</span>
                    <span
                      className="text-[10px] px-1.5 py-[1px] rounded-full"
                      style={{ background: 'var(--dp-surface-3)', color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)' }}
                    >
                      {g.operations.length}
                    </span>
                  </button>
                ))}
                {/* Browse the full reference */}
                {/* <button
                  type="button"
                  onClick={() => navigate(`/developer/${apiSlug}`)}
                  className="inline-flex items-center gap-1.5 pl-3.5 pr-3 py-[7px] rounded-full text-[12px] font-medium cursor-pointer transition-opacity hover:opacity-85"
                  style={{ background: 'var(--dp-accent-soft)', border: '1px solid var(--dp-accent-line)', color: 'var(--dp-accent-2)' }}
                >
                  View full reference <ArrowRight size={13} />
                </button> */}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ApiReferenceJump;
