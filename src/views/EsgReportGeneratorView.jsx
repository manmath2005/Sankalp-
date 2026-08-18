import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Printer, 
  TrendingUp, 
  Award, 
  Building2, 
  Users, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  PieChart, 
  Globe2, 
  Sparkles, 
  Calendar,
  CheckCircle2,
  RefreshCw,
  Landmark,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EsgReportGeneratorView = ({ onNavigate }) => {
  const { currentUser, showToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'mca-filing', 'sdg', 'raw-data'
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('FY 2025-26');

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/corporate/reports/csr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: currentUser?.id || 'COMP-001',
          companyName: currentUser?.companyName || 'Tata Consultancy Services Ltd',
          fiscalYear: selectedFiscalYear
        })
      });
      const data = await res.json();
      if (data.success) {
        setReportData(data.report);
      }
    } catch (err) {
      console.error('Failed to fetch CSR report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [selectedFiscalYear]);

  const handlePrintPdf = () => {
    window.print();
  };

  const handleExportCsv = () => {
    if (!reportData?.rawParticipationLedger) return;
    const headers = ["Timestamp", "Employee ID", "Employee Name", "Department", "Event Name", "Volunteer Hours", "Verification Status"];
    const rows = reportData.rawParticipationLedger.map(item => [
      `"${item.timestamp}"`,
      `"${item.employeeId}"`,
      `"${item.name}"`,
      `"${item.dept}"`,
      `"${item.event}"`,
      item.hours,
      `"${item.status}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MCA_CSR_Participation_Audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit CSV exported successfully!", "success");
  };

  if (loading || !reportData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-600">Aggregating Section 135 MCA Compliance & ESG Metrics...</p>
      </div>
    );
  }

  const { meta, financialSummary, impactSummary, sdgBreakdown, partnerNgos, monthlyMetrics, rawParticipationLedger } = reportData;

  // Max metric value for bar heights
  const maxMonthlyFunds = Math.max(...monthlyMetrics.map(m => m.fundsDeployedINR));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left page-enter print:p-0 print:m-0">
      
      {/* 1. Header Banner & Actions */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200/90 shadow-sm bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            MCA Section 135 & BRSR Impact Ready
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            One-Click Corporate CSR & ESG Annual Report Generator
          </h1>
          <p className="text-xs text-slate-300">
            {meta.companyName} • CIN: {meta.cinNumber} • Period: {meta.reportingPeriod}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={selectedFiscalYear}
            onChange={(e) => setSelectedFiscalYear(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="FY 2025-26" className="text-slate-900">FY 2025-26 (Active)</option>
            <option value="FY 2024-25" className="text-slate-900">FY 2024-25 (Audited)</option>
          </select>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all flex items-center gap-2 press-effect text-white"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Excel/CSV</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all flex items-center gap-2 press-effect"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Official PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Top-Level Core KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase">
            <span>CSR Funds Deployed</span>
            <Landmark className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            ₹{(financialSummary.csrFundsDeployedINR / 10000000).toFixed(2)} Cr
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>96.1% of Mandated Budget (₹4.50 Cr)</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase">
            <span>Employee Volunteer Hours</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {impactSummary.totalVolunteerHoursLogged.toLocaleString()} hrs
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
            <span>Across {impactSummary.totalEmployeesParticipated.toLocaleString()} Employees</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase">
            <span>Citizens Impacted</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {impactSummary.directBeneficiariesImpacted.toLocaleString()}+
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
            <span>Verified On-ground Reach</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 uppercase">
            <span>Partner NGOs (Darpan)</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 font-mono">
            {partnerNgos.length} Accredited
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
            <span>100% 80G & 12A Compliant</span>
          </div>
        </div>

      </div>

      {/* 3. Interactive Monthly Deployment Histogram (Chart Preview) */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Monthly CSR Capital Deployment & Mobilization (INR vs Beneficiaries)
            </h3>
            <p className="text-xs text-slate-500">Monthly fiscal progression conforming to MCA CSR Form CSR-2 quarterly disclosure</p>
          </div>
          <span className="text-xs font-bold text-slate-400 font-mono">Annualized Trajectory: Healthy</span>
        </div>

        {/* Custom CSS Bar Chart */}
        <div className="grid grid-cols-12 gap-2 sm:gap-3 items-end h-56 pt-6 px-2">
          {monthlyMetrics.map((item, idx) => {
            const heightPercent = Math.round((item.fundsDeployedINR / maxMonthlyFunds) * 100);
            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group relative">
                
                {/* Tooltip */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] p-1.5 rounded-lg whitespace-nowrap z-20 pointer-events-none shadow-lg">
                  ₹{(item.fundsDeployedINR / 100000).toFixed(1)}L • {item.beneficiaries} Citizens
                </div>

                <div 
                  className="w-full bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-xl group-hover:from-indigo-700 group-hover:to-sky-500 transition-all duration-500"
                  style={{ height: `${heightPercent}%` }}
                />
                
                <span className="text-[11px] font-bold text-slate-600">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. UN Sustainable Development Goals (SDG) Breakdown */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* SDG Pillar Distribution */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-600" />
              UN Sustainable Development Goals (SDG) Alignment
            </h3>
            <p className="text-xs text-slate-500">Corporate resource allocation mapped to international SDG targets</p>
          </div>

          <div className="space-y-4">
            {sdgBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{item.sdg}</span>
                  <span className="text-slate-900 font-mono font-black">
                    ₹{(item.allocatedINR / 100000).toFixed(1)}L ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-medium">{item.hours} Employee Volunteer Hours Contributed</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accredited NGO Partner Table */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-600" />
              Accredited Implementing Partners (Darpan Verified)
            </h3>
            <p className="text-xs text-slate-500">Audited partner list under MCA Section 135 CSR-1 Guidelines</p>
          </div>

          <div className="space-y-3">
            {partnerNgos.map((ngo, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900">{ngo.name}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">Darpan ID: {ngo.darpanId} • {ngo.projectsConducted} Campaigns</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-extrabold text-indigo-700 block">₹{(ngo.deployedFundsINR / 100000).toFixed(1)}L</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {ngo.complianceStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Raw Participation Audit Ledger */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              Volunteer Engagement & Timestamped Audit Ledger
            </h3>
            <p className="text-xs text-slate-500">Verifiable employee attendance and pro-bono participation logs</p>
          </div>
          <button
            onClick={handleExportCsv}
            className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Download Full CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-[11px] font-extrabold uppercase border-b border-slate-200">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Emp ID & Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Social Drive Campaign</th>
                <th className="p-3">Hours</th>
                <th className="p-3">Audited Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-800">
              {rawParticipationLedger.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{row.timestamp}</td>
                  <td className="p-3">
                    <strong className="text-slate-900 block">{row.name}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">{row.employeeId}</span>
                  </td>
                  <td className="p-3 text-slate-600">{row.dept}</td>
                  <td className="p-3 font-semibold text-slate-900">{row.event}</td>
                  <td className="p-3 font-mono font-bold text-sky-700">{row.hours} hrs</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
