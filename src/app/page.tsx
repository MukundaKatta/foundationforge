"use client";

import { useState } from "react";
import { Database, BarChart3, TrendingUp, Save, Cpu, Clock, Layers, Plus, Play, Settings, HardDrive } from "lucide-react";

type Tab = "pipeline" | "training" | "scaling" | "checkpoints";

const mockTrainingMetrics = Array.from({ length: 60 }, (_, i) => ({
  step: (i + 1) * 1000,
  loss: 4.0 * Math.exp(-i * 0.04) + 1.8 + Math.random() * 0.1,
  perplexity: Math.exp(4.0 * Math.exp(-i * 0.04) + 1.8),
  lr: 3e-4 * Math.min(1, (i + 1) / 10) * Math.max(0, 1 - i / 60),
  throughput: 450000 + Math.random() * 50000,
}));

const scalingData = [
  { params: "125M", compute: 2.1e18, loss: 3.45, tokens: "5B" },
  { params: "350M", compute: 6.3e18, loss: 3.12, tokens: "7B" },
  { params: "1.3B", compute: 2.4e19, loss: 2.78, tokens: "26B" },
  { params: "6.7B", compute: 1.2e20, loss: 2.45, tokens: "140B" },
  { params: "13B", compute: 2.5e20, loss: 2.28, tokens: "260B" },
  { params: "30B", compute: 5.8e20, loss: 2.12, tokens: "600B" },
  { params: "70B", compute: 1.4e21, loss: 1.95, tokens: "1.4T" },
  { params: "175B", compute: 3.5e21, loss: 1.82, tokens: "3.5T" },
];

const checkpoints = [
  { id: "1", name: "foundation-7b-step60k", params: "7B", step: 60000, loss: 2.18, size: "14.2 GB", date: "2024-03-15", status: "best" },
  { id: "2", name: "foundation-7b-step50k", params: "7B", step: 50000, loss: 2.25, size: "14.2 GB", date: "2024-03-14", status: "saved" },
  { id: "3", name: "foundation-7b-step40k", params: "7B", step: 40000, loss: 2.38, size: "14.2 GB", date: "2024-03-13", status: "saved" },
  { id: "4", name: "foundation-7b-step30k", params: "7B", step: 30000, loss: 2.55, size: "14.2 GB", date: "2024-03-12", status: "saved" },
  { id: "5", name: "foundation-1b-final", params: "1.3B", step: 120000, loss: 2.78, size: "2.6 GB", date: "2024-03-01", status: "final" },
];

const dataSources = [
  { name: "CommonCrawl", tokens: "4.5T", quality: 85, status: "processed" },
  { name: "Wikipedia", tokens: "6.7B", quality: 98, status: "processed" },
  { name: "GitHub Code", tokens: "850B", quality: 90, status: "processing" },
  { name: "Books3", tokens: "100B", quality: 95, status: "processed" },
  { name: "ArXiv Papers", tokens: "45B", quality: 97, status: "queued" },
  { name: "StackOverflow", tokens: "25B", quality: 88, status: "processed" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("pipeline");
  const tabs: { key: Tab; icon: React.ComponentType<{ size?: number }>; label: string }[] = [
    { key: "pipeline", icon: Database, label: "Data Pipeline" },
    { key: "training", icon: BarChart3, label: "Training" },
    { key: "scaling", icon: TrendingUp, label: "Scaling Laws" },
    { key: "checkpoints", icon: Save, label: "Checkpoints" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2"><Layers size={20} className="text-brand-400" /><h1 className="text-lg font-bold">FoundationForge</h1></div>
          <p className="text-xs text-gray-500 mt-1">Foundation Model Training</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === tab.key ? "bg-brand-600/20 text-brand-400" : "text-gray-400 hover:bg-gray-800"}`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === "pipeline" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Data Pipeline</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5"><p className="text-xs text-gray-500">Total Tokens</p><p className="text-2xl font-bold text-brand-400">5.6T</p></div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5"><p className="text-xs text-gray-500">Sources</p><p className="text-2xl font-bold text-blue-400">{dataSources.length}</p></div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5"><p className="text-xs text-gray-500">Avg Quality</p><p className="text-2xl font-bold text-green-400">{Math.round(dataSources.reduce((s, d) => s + d.quality, 0) / dataSources.length)}%</p></div>
            </div>
            <div className="space-y-3">
              {dataSources.map((ds) => (
                <div key={ds.name} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Database size={18} className="text-brand-400" />
                    <div><h3 className="font-medium">{ds.name}</h3><p className="text-sm text-gray-500">{ds.tokens} tokens</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right"><p className="text-xs text-gray-500">Quality</p><div className="w-20 bg-gray-800 rounded-full h-2 mt-1"><div className="bg-green-500 rounded-full h-2" style={{ width: `${ds.quality}%` }} /></div></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${ds.status === "processed" ? "bg-green-900/30 text-green-400" : ds.status === "processing" ? "bg-yellow-900/30 text-yellow-400" : "bg-gray-800 text-gray-400"}`}>{ds.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "training" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Training Dashboard</h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5"><p className="text-xs text-gray-500">Current Step</p><p className="text-2xl font-bold">{mockTrainingMetrics[mockTrainingMetrics.length - 1].step.toLocaleString()}</p></div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5"><p className="text-xs text-gray-500">Loss</p><p className="text-2xl font-bold text-brand-400">{mockTrainingMetrics[mockTrainingMetrics.length - 1].loss.toFixed(3)}</p></div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5"><p className="text-xs text-gray-500">Throughput</p><p className="text-2xl font-bold text-green-400">{(mockTrainingMetrics[mockTrainingMetrics.length - 1].throughput / 1000).toFixed(0)}K tok/s</p></div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5"><p className="text-xs text-gray-500">ETA</p><p className="text-2xl font-bold text-blue-400">~14 days</p></div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-medium mb-4">Training Loss Curve</h3>
              <div className="h-48 flex items-end gap-0.5">
                {mockTrainingMetrics.map((m, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div className="bg-brand-500 rounded-t hover:bg-brand-400" style={{ height: `${((m.loss - 1.5) / 3) * 100}%` }} />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                      Step {m.step}: {m.loss.toFixed(3)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "scaling" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Scaling Laws</h2>
            <p className="text-gray-500 mb-6">Loss = a * C^(-b), where C is compute (FLOPs). Based on Chinchilla optimal scaling.</p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-800"><th className="text-left px-4 py-3">Parameters</th><th className="text-right px-4 py-3">Compute (FLOPs)</th><th className="text-right px-4 py-3">Optimal Tokens</th><th className="text-right px-4 py-3">Expected Loss</th><th className="px-4 py-3">Loss Curve</th></tr>
                </thead>
                <tbody>
                  {scalingData.map((row) => (
                    <tr key={row.params} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <td className="px-4 py-3 font-medium">{row.params}</td>
                      <td className="px-4 py-3 text-right text-gray-400">{row.compute.toExponential(1)}</td>
                      <td className="px-4 py-3 text-right">{row.tokens}</td>
                      <td className="px-4 py-3 text-right text-brand-400 font-medium">{row.loss.toFixed(2)}</td>
                      <td className="px-4 py-3"><div className="w-24 bg-gray-800 rounded-full h-2"><div className="bg-brand-500 rounded-full h-2" style={{ width: `${((4 - row.loss) / 2.5) * 100}%` }} /></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "checkpoints" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Checkpoint Management</h2>
            <div className="space-y-3">
              {checkpoints.map((cp) => (
                <div key={cp.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Save size={18} className={cp.status === "best" ? "text-brand-400" : "text-gray-500"} />
                    <div><h3 className="font-medium">{cp.name}</h3><p className="text-sm text-gray-500">{cp.params} | Step {cp.step.toLocaleString()} | {cp.date}</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right"><p className="text-xs text-gray-500">Loss</p><p className="text-sm font-medium text-brand-400">{cp.loss}</p></div>
                    <div className="text-right"><p className="text-xs text-gray-500">Size</p><p className="text-sm">{cp.size}</p></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${cp.status === "best" ? "bg-brand-900/30 text-brand-400" : cp.status === "final" ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"}`}>{cp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
