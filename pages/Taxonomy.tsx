import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder } from 'lucide-react';
import AdPlaceholder from '../components/AdPlaceholder';
import { Link } from 'react-router-dom';
import { TaxonomyNode } from '../types';

// Simplified static taxonomy for demo purposes
const TAXONOMY_DATA: TaxonomyNode[] = [
    {
        name: 'Passeriformes',
        type: 'Order',
        count: 6456,
        children: [
            { name: 'Corvidae', type: 'Family', count: 133, children: [{ name: 'Corvus corax', type: 'Species' }, { name: 'Cyanocitta cristata', type: 'Species' }] },
            { name: 'Fringillidae', type: 'Family', count: 228, children: [] },
            { name: 'Parulidae', type: 'Family', count: 119, children: [] }
        ]
    },
    {
        name: 'Accipitriformes',
        type: 'Order',
        count: 266,
        children: [
             { name: 'Accipitridae', type: 'Family', count: 256, children: [{ name: 'Harpia harpyja', type: 'Species' }] },
             { name: 'Pandionidae', type: 'Family', count: 1, children: [] }
        ]
    },
    {
        name: 'Strigiformes',
        type: 'Order',
        count: 254,
        children: [
            { name: 'Strigidae', type: 'Family', count: 230, children: [{ name: 'Bubo scandiacus', type: 'Species' }] },
            { name: 'Tytonidae', type: 'Family', count: 20, children: [] }
        ]
    }
];

const TaxonomyNodeItem: React.FC<{ node: TaxonomyNode, depth?: number }> = ({ node, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="border-l border-gray-200 ml-2">
            <div 
                className={`flex items-center py-2 px-2 cursor-pointer hover:bg-gray-50 rounded select-none`}
                style={{ marginLeft: `${depth * 12}px` }}
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
                {hasChildren ? (
                    <span className="text-gray-400 mr-2">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                ) : <span className="w-[14px] mr-2"></span>}
                
                {node.type === 'Species' ? (
                     <Link to="/species/harpy-eagle" className="text-primary italic hover:underline text-sm">
                        {node.name}
                     </Link>
                ) : (
                    <div className="flex items-baseline gap-2">
                        <span className="font-bold text-gray-800 text-sm">{node.name}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">{node.type}</span>
                        {node.count && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{node.count} species</span>}
                    </div>
                )}
            </div>
            {isOpen && hasChildren && (
                <div>
                    {node.children!.map((child: TaxonomyNode, idx: number) => (
                        <TaxonomyNodeItem key={idx} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const Taxonomy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Taxonomy Explorer</h1>
                <p className="text-gray-600 mb-8">Browse the hierarchical classification of birds, from Order to Species.</p>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {TAXONOMY_DATA.map((order, idx) => (
                        <TaxonomyNodeItem key={idx} node={order} />
                    ))}
                </div>
            </div>

            <div className="md:w-1/4 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Statistics</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex justify-between border-b border-gray-100 pb-1">
                            <span>Orders</span> <span>44</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-100 pb-1">
                            <span>Families</span> <span>253</span>
                        </li>
                        <li className="flex justify-between border-b border-gray-100 pb-1">
                            <span>Genera</span> <span>2,320</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Species</span> <span>10,906</span>
                        </li>
                    </ul>
                </div>
                <AdPlaceholder format="sidebar" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Taxonomy;