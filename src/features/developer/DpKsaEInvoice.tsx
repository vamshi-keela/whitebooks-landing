import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { environments } from '../../data/environments';
import type { Environment } from '../../data/environments';
import { normalizeSpec } from '../../utils/normalizeSpec';
import { groupByTag } from '../../utils/groupOperations';
import { SpecContext, makeSpecContext } from '../../contexts/SpecContext';
import ApiSidebar from '../../components/api/ApiSidebar';
import EnvironmentBar from '../../components/api/EnvironmentBar';
import OperationDetail from '../../components/api/OperationDetail';
import { useKsaEInvoiceSpec } from './hooks/useKsaEInvoiceSpec';

export default function DpKsaEInvoiceAPI(): React.ReactElement {
    const { data: apiSpec, isLoading, isError } = useKsaEInvoiceSpec();
    const [selectedEnv, setSelectedEnv] = useState<Environment>(environments[0]);
    const [searchQuery] = useState('');
    const [selectedOpId, setSelectedOpId] = useState<string>('');

    const operations = useMemo(() => (apiSpec ? normalizeSpec(apiSpec) : []), [apiSpec]);
    const groups     = useMemo(() => (apiSpec ? groupByTag(operations, apiSpec.tags ?? []) : []), [operations, apiSpec]);
    const specCtx    = useMemo(() => (apiSpec ? makeSpecContext(apiSpec, selectedEnv.baseUrl) : null), [apiSpec, selectedEnv.baseUrl]);

    // Set default selection once spec loads
    useEffect(() => {
        if (operations.length > 0 && !selectedOpId) {
            setSelectedOpId(operations[0].id);
        }
    }, [operations]);

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

    const visibleOps = useMemo(() => filteredGroups.flatMap(g => g.operations), [filteredGroups]);
    const selectedOp = useMemo(
        () => visibleOps.find(op => op.id === selectedOpId) ?? visibleOps[0],
        [selectedOpId, visibleOps]
    );
    const selectedIdx = visibleOps.findIndex(op => op.id === selectedOp?.id);

    const handleSelect = (id: string) => setSelectedOpId(id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--dp-bg)] text-[14px] text-[var(--dp-fg-muted)]">
                Loading spec…
            </div>
        );
    }

    if (isError || !apiSpec || !specCtx) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--dp-bg)] text-[14px] text-[var(--dp-fg-muted)]">
                Failed to load KSA e-Invoice spec. Please try again.
            </div>
        );
    }

    return (
        <SpecContext.Provider value={specCtx}>
            <div className="min-h-screen bg-[var(--dp-bg)]">
                <EnvironmentBar environments={environments} selected={selectedEnv} onChange={setSelectedEnv} apiType="ksa-e-invoice-api" />
                <div className="flex min-h-[calc(100vh-100px)]">
                    <ApiSidebar
                        groups={filteredGroups}
                        selectedOpId={selectedOp?.id ?? ''}
                        onSelect={handleSelect}
                    />
                    <main className="flex-1 min-w-0">
                        {visibleOps.length === 0 ? (
                            <div className="flex flex-col items-center pt-20 gap-3 text-[var(--dp-fg-muted)]">
                                <Search size={32} color="var(--dp-fg-faint)" />
                                <div className="text-base font-semibold text-[var(--dp-fg)]">No results</div>
                                <div className="text-sm">No endpoints match &ldquo;{searchQuery}&rdquo;</div>
                            </div>
                        ) : selectedOp ? (
                            <OperationDetail
                                operation={selectedOp}
                                apiType="ksa-e-invoice-api"
                                hasPrev={selectedIdx > 0}
                                hasNext={selectedIdx < visibleOps.length - 1}
                                onPrev={() => selectedIdx > 0 && handleSelect(visibleOps[selectedIdx - 1].id)}
                                onNext={() => selectedIdx < visibleOps.length - 1 && handleSelect(visibleOps[selectedIdx + 1].id)}
                                prevLabel={selectedIdx > 0 ? visibleOps[selectedIdx - 1].summary : undefined}
                                nextLabel={selectedIdx < visibleOps.length - 1 ? visibleOps[selectedIdx + 1].summary : undefined}
                            />
                        ) : null}
                    </main>
                </div>
            </div>
        </SpecContext.Provider>
    );
}
