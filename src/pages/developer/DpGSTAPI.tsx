import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, PlayCircle, Package } from 'lucide-react';
import { ApiSpecKey, openApiSpec } from '../../data/openapi-spec';
import { environments } from '../../data/environments';
import type { Environment } from '../../data/environments';
import { normalizeSpec } from '../../utils/normalizeSpec';
import { groupByTag } from '../../utils/groupOperations';
import { SpecContext, makeSpecContext } from '../../contexts/SpecContext';
import ApiSidebar from '../../components/api/ApiSidebar';
import type { StaticNavGroup } from '../../components/api/ApiSidebar';
import EnvironmentBar from '../../components/api/EnvironmentBar';
import OperationDetail from '../../components/api/OperationDetail';
import GstOverview from './GstOverview';
import InvoiceApiOverview from './EinvoiceApiOverview';
import EWayBillApiOverview from './EWayBillApiOverview';

const STATIC_IDS = {
  OVERVIEW: '__gst:overview',
} as const;

const STATIC_GROUPS: StaticNavGroup[] = [
  {
    heading: 'GST API',
    items: [
      {
        id: STATIC_IDS.OVERVIEW,
        label: 'Overview',
        icon: <LayoutGrid size={11} />,
      }
    ],
  },
];

function isStaticId(id: string): boolean {
  return id.startsWith('__gst:');
}

export default function DpGSTAPI({ apiType }: { apiType: ApiSpecKey }): React.ReactElement {
  const [selectedEnv, setSelectedEnv] = useState<Environment>(environments[0]);
  const [searchQuery] = useState('');

  const apiSpec = openApiSpec(apiType);
  const operations = useMemo(() => normalizeSpec(apiSpec), []);
  const groups = useMemo(() => groupByTag(operations, apiSpec.tags ?? []), [operations]);
  const specCtx = useMemo(() => makeSpecContext(apiSpec, selectedEnv.baseUrl), [selectedEnv.baseUrl]);

  const [selectedOpId, setSelectedOpId] = useState<string>(STATIC_IDS.OVERVIEW);

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groups;
    const q = searchQuery.toLowerCase();
    return groups
      .map(g => ({
        ...g,
        operations: g.operations.filter(op =>
          op.path.toLowerCase().includes(q) ||
          op.summary.toLowerCase().includes(q) ||
          op.tag.toLowerCase().includes(q) ||
          (op.description?.toLowerCase().includes(q) ?? false)
        ),
      }))
      .filter(g => g.operations.length > 0);
  }, [groups, searchQuery]);

  const visibleOps = useMemo(
    () => filteredGroups.flatMap(g => g.operations),
    [filteredGroups]
  );

  const selectedOp = useMemo(
    () => isStaticId(selectedOpId) ? null : (visibleOps.find(op => op.id === selectedOpId) ?? visibleOps[0]),
    [selectedOpId, visibleOps]
  );

  const selectedIdx = selectedOp ? visibleOps.findIndex(op => op.id === selectedOp.id) : -1;

  const handleSelect = (id: string) => setSelectedOpId(id);
  const goPrev = () => { if (selectedIdx > 0) handleSelect(visibleOps[selectedIdx - 1].id); };
  const goNext = () => { if (selectedIdx < visibleOps.length - 1) handleSelect(visibleOps[selectedIdx + 1].id); };

  function renderMain() {
    if (isStaticId(selectedOpId)) {
      if (selectedOpId === STATIC_IDS.OVERVIEW) {
        switch (apiType) {
          case 'gst-api':
            return <GstOverview />;
          case 'e-invoice-api':
            return <InvoiceApiOverview />;
          case 'e-way-bill-api':
            return <EWayBillApiOverview />;
        }
      }
    }
    if (visibleOps.length === 0) {
      return (
        <div className="flex flex-col items-center pt-24 gap-3 text-[var(--dp-fg-muted)]">
          <Search size={32} color="var(--dp-fg-faint)" />
          <div className="text-base font-semibold text-[var(--dp-fg)]">No results</div>
          <div className="text-sm">No endpoints match &ldquo;{searchQuery}&rdquo;</div>
        </div>
      );
    }
    if (selectedOp) {
      return (
        <OperationDetail
          operation={selectedOp}
          apiType="gst-api"
          hasPrev={selectedIdx > 0}
          hasNext={selectedIdx < visibleOps.length - 1}
          onPrev={goPrev}
          onNext={goNext}
          prevLabel={selectedIdx > 0 ? visibleOps[selectedIdx - 1].summary : undefined}
          nextLabel={selectedIdx < visibleOps.length - 1 ? visibleOps[selectedIdx + 1].summary : undefined}
        />
      );
    }
    return null;
  }

  return (
    <SpecContext.Provider value={specCtx}>
      <div className="min-h-screen bg-[var(--dp-bg)]">
        {
          isStaticId(selectedOpId) ?
            <></> :
            <EnvironmentBar environments={environments} selected={selectedEnv} onChange={setSelectedEnv} />
        }

        <div className="flex min-h-[calc(100vh-100px)]">
          <ApiSidebar
            groups={filteredGroups}
            selectedOpId={isStaticId(selectedOpId) ? selectedOpId : (selectedOp?.id ?? '')}
            onSelect={handleSelect}
            staticGroups={STATIC_GROUPS}
          />

          <main className="flex-1 min-w-0 ">
            {renderMain()}
          </main>
        </div>
      </div>
    </SpecContext.Provider>
  );
}
