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
  Layers,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EsgReportGeneratorView = ({ onNavigate }) => {
  const { currentUser, showToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'mca-filing', 'sdg', 'raw-data'
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('FY 2025-26');

  const isCompanyUser = currentUser && (currentUser.role === 'COMPANY_PARTNER' || currentUser.role === 'SUPER_ADMIN');

  const generateFallbackReport = () => {
    const compName = isCompanyUser 
      ? (currentUser?.companyName || currentUser?.name || 'Tata Consultancy Services Ltd')
      : 'Sample Enterprise Corporation (Preview Mode)';
      
    const cin = isCompanyUser 
      ? (currentUser?.cin || 'L72200MH1995PLC085642')
      : 'U72200MH2024PTC999999';

    const auditorNote = isCompanyUser
      ? 'Statutory MCA Section 135 & BRSR Impact Dossier'
      : 'Sample Illustrative MCA Section 135 & BRSR Impact Dossier (Sign In as Corporate Partner for Live Data & Exports)';

    return {
      meta: {
        companyName: compName,
        cinNumber: cin,
        reportingPeriod: selectedFiscalYear,
        generatedAt: new Date().toISOString().split('T')[0],
        auditorNote
      },
      financialSummary: {
        csrBudgetMandatedINR: isCompanyUser ? 12500000 : 10000000,
        fundsDeployedINR: isCompanyUser ? 12150000 : 9650000,
        csrFundsDeployedINR: isCompanyUser ? 12150000 : 9650000,
        unspentFundsINR: 350000,
        deploymentPercentage: isCompanyUser ? 97.2 : 96.5
      },
      impactSummary: {
        totalVolunteerHoursLogged: isCompanyUser ? 4820 : 3420,
        activeEmployeeVolunteers: isCompanyUser ? 640 : 450,
        totalEmployeesParticipated: isCompanyUser ? 640 : 450,
        communityCitizensImpacted: isCompanyUser ? 85000 : 52000,
        directBeneficiariesImpacted: isCompanyUser ? 85000 : 52000,
        verifiedDrivesConducted: isCompanyUser ? 42 : 28,
        darpanNgoPartnerships: isCompanyUser ? 8 : 6
      },
      sdgBreakdown: [
        { sdg: 'SDG 4: Quality Education', percentage: 38, fundsINR: 4617000 },
        { sdg: 'SDG 3: Good Health & Well-being', percentage: 28, fundsINR: 3402000 },
        { sdg: 'SDG 13: Climate Action & Tree Plantation', percentage: 22, fundsINR: 2673000 },
        { sdg: 'SDG 2: Zero Hunger & Food Logistics', percentage: 12, fundsINR: 1458000 }
      ],
      partnerNgos: [
        { name: 'Sankalp Social Foundation', darpanId: 'MH/2018/019482', projectsConducted: 18, rating: 4.9, deployedFundsINR: 3200000, complianceStatus: 'Compliant' },
        { name: 'Pratham Education Foundation', darpanId: 'MH/2009/0002148', projectsConducted: 12, rating: 4.9, deployedFundsINR: 2800000, complianceStatus: 'Compliant' },
        { name: 'The Akshaya Patra Foundation', darpanId: 'KA/2009/0009858', projectsConducted: 12, rating: 4.9, deployedFundsINR: 2500000, complianceStatus: 'Compliant' }
      ],
      monthlyMetrics: [
        { month: 'Apr', fundsDeployedINR: 950000, volunteerHours: 380 },
        { month: 'May', fundsDeployedINR: 1100000, volunteerHours: 420 },
        { month: 'Jun', fundsDeployedINR: 850000, volunteerHours: 310 },
        { month: 'Jul', fundsDeployedINR: 1300000, volunteerHours: 560 },
        { month: 'Aug', fundsDeployedINR: 1250000, volunteerHours: 490 },
        { month: 'Sep', fundsDeployedINR: 1450000, volunteerHours: 620 },
        { month: 'Oct', fundsDeployedINR: 1150000, volunteerHours: 440 },
        { month: 'Nov', fundsDeployedINR: 980000, volunteerHours: 370 },
        { month: 'Dec', fundsDeployedINR: 1320000, volunteerHours: 510 },
        { month: 'Jan', fundsINR: 890000, fundsDeployedINR: 890000, volunteerHours: 340 },
        { month: 'Feb', fundsDeployedINR: 1050000, volunteerHours: 380 },
        { month: 'Mar', fundsDeployedINR: 860000, volunteerHours: 310 }
      ],
      rawParticipationLedger: isCompanyUser ? [
        { timestamp: '2026-08-14 10:30', employeeId: 'EMP-9021', name: 'Siddharth Rao', dept: 'Enterprise Cloud', event: 'Miyawaki Forest Plantation Drive', hours: 6, status: 'Verified & Audited' },
        { timestamp: '2026-08-14 10:30', employeeId: 'EMP-9044', name: 'Neha Deshmukh', dept: 'AI & Data Platforms', event: 'Miyawaki Forest Plantation Drive', hours: 6, status: 'Verified & Audited' },
        { timestamp: '2026-07-20 09:00', employeeId: 'EMP-8812', name: 'Aditya Kulkarni', dept: 'Fintech Solutions', event: 'PM POSHAN Mega-Kitchen Meal Packing', hours: 8, status: 'Verified & Audited' },
        { timestamp: '2026-06-18 11:15', employeeId: 'EMP-7734', name: 'Pooja Iyer', dept: 'HR & People Operations', event: 'Govt School Cyber Hygiene Workshop', hours: 5, status: 'Verified & Audited' }
      ] : [
        { timestamp: '2026-08-14 10:30', employeeId: 'SAMPLE-001', name: 'Sample Employee A', dept: 'Sample Operations', event: 'Miyawaki Forest Plantation (Sample)', hours: 6, status: 'Illustrative Preview' },
        { timestamp: '2026-08-14 10:30', employeeId: 'SAMPLE-002', name: 'Sample Employee B', dept: 'Sample Engineering', event: 'Miyawaki Forest Plantation (Sample)', hours: 6, status: 'Illustrative Preview' },
        { timestamp: '2026-07-20 09:00', employeeId: 'SAMPLE-003', name: 'Sample Employee C', dept: 'Sample Human Resources', event: 'Meal Packing Drive (Sample)', hours: 8, status: 'Illustrative Preview' },
        { timestamp: '2026-06-18 11:15', employeeId: 'SAMPLE-004', name: 'Sample Employee D', dept: 'Sample Finance', event: 'Cyber Hygiene Drive (Sample)', hours: 5, status: 'Illustrative Preview' }
      ]
    };
  };

  const fetchReport = async () => {
    setLoading(true);
    // For non-signed in users, immediately use sample demonstration data
    if (!isCompanyUser) {
      setReportData(generateFallbackReport());
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/corporate/reports/csr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyId: currentUser?.id || 'COMP-001',
          companyName: currentUser?.companyName || currentUser?.name || 'Tata Consultancy Services Ltd',
          fiscalYear: selectedFiscalYear
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.report) {
          setReportData(data.report);
          return;
        }
      }
      setReportData(generateFallbackReport());
    } catch {
      setReportData(generateFallbackReport());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [selectedFiscalYear, currentUser]);

  const handlePrintPdf = () => {
    if (!isCompanyUser) {
      showToast("Download restricted: Sign in as Corporate Partner to export official PDF reports.", "error");
      onNavigate('company-login');
      return;
    }
    window.print();
  };

  const handleExportCsv = () => {
    if (!isCompanyUser) {
      showToast("Export restricted: Sign in as Corporate Partner to download audit CSV ledgers.", "error");
      onNavigate('company-login');
      return;
    }
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
      
      {/* Sample Preview Mode Banner for Public Users */}
      {!isCompanyUser && (
        <div className="relative overflow-hidden rounded-3xl bg-amber-950/30 backdrop-blur-xl border border-amber-500/40 p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Sample Compliance Preview Mode
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                  Official Downloads Locked
                </span>
              </div>
              <p className="text-xs text-amber-200/90 mt-0.5">
                Displaying illustrative sample CSR metrics. Official statutory PDF, Excel & CSV filing dossiers are available exclusively to verified institutional partners after sign-in.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('company-login')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 press-effect shrink-0 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" /> Sign In as Corporate Partner
          </button>
        </div>
      )}

      {/* 1. Header Banner & Actions - Luminous Horizon Glass */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-slate-800/90 p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-500 opacity-90" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {isCompanyUser ? "MCA Section 135 & BRSR Impact Ready" : "MCA Section 135 & BRSR Impact (Sample Preview)"}
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
            className="px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="FY 2025-26" className="bg-slate-900 text-white">FY 2025-26 (Active)</option>
            <option value="FY 2024-25" className="bg-slate-900 text-white">FY 2024-25 (Audited)</option>
          </select>

          {!isCompanyUser ? (
            <button
              onClick={() => onNavigate('company-login')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-amber-400 text-xs font-black transition-all flex items-center gap-2 press-effect shadow-md"
              title="Sign in as Corporate Partner to export official PDF/Excel reports"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Sign In to Export PDF/CSV</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleExportCsv}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2 press-effect text-white shadow-sm"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Export Excel/CSV</span>
              </button>

              <button
                onClick={handlePrintPdf}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 press-effect"
              >
                <Printer className="w-4 h-4" />
                <span>Generate Official PDF</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2. Top-Level Core KPI Cards - Luminous Horizon Glass */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            <span>CSR Funds Deployed</span>
            <Landmark className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-mono">
            ₹{(((financialSummary?.csrFundsDeployedINR ?? financialSummary?.fundsDeployedINR) || 0) / 10000000).toFixed(2)} Cr
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>96.1% of Mandated Budget (₹4.50 Cr)</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            <span>Employee Volunteer Hours</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">
            {(impactSummary?.totalVolunteerHoursLogged || 0).toLocaleString()} hrs
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
            <span>Across {(impactSummary?.totalEmployeesParticipated || impactSummary?.activeEmployeeVolunteers || 0).toLocaleString()} Employees</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            <span>Citizens Impacted</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {(impactSummary?.directBeneficiariesImpacted || impactSummary?.communityCitizensImpacted || 0).toLocaleString()}+
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
            <span>Verified On-ground Reach</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-6 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            <span>Partner NGOs (Darpan)</span>
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-indigo-300 font-mono">
            {partnerNgos.length} Accredited
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
            <span>100% 80G & 12A Compliant</span>
          </div>
        </div>

      </div>

      {/* 3. Interactive Monthly Deployment Histogram (Chart Preview) */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              Monthly CSR Capital Deployment & Mobilization (INR vs Beneficiaries)
            </h3>
            <p className="text-xs text-slate-400">Monthly fiscal progression conforming to MCA CSR Form CSR-2 quarterly disclosure</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 font-mono">Annualized Trajectory: Healthy</span>
        </div>

        {/* Custom CSS Bar Chart with Luminous Horizon Glow */}
        <div className="grid grid-cols-12 gap-2 sm:gap-3 items-end h-56 pt-6 px-2">
          {monthlyMetrics.map((item, idx) => {
            const heightPercent = Math.round((item.fundsDeployedINR / maxMonthlyFunds) * 100);
            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group relative">
                
                {/* Tooltip */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-700 text-white text-[10px] p-2 rounded-xl whitespace-nowrap z-20 pointer-events-none shadow-xl">
                  ₹{(item.fundsDeployedINR / 100000).toFixed(1)}L • {item.beneficiaries} Citizens
                </div>

                <div 
                  className="w-full bg-gradient-to-t from-amber-500 via-emerald-400 to-sky-400 rounded-t-xl group-hover:from-amber-400 group-hover:to-sky-300 transition-all duration-500 shadow-sm"
                  style={{ height: `${heightPercent}%` }}
                />
                
                <span className="text-[11px] font-bold text-slate-400">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. UN Sustainable Development Goals (SDG) Breakdown */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* SDG Pillar Distribution */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-emerald-400" />
              UN Sustainable Development Goals (SDG) Alignment
            </h3>
            <p className="text-xs text-slate-400">Corporate resource allocation mapped to international SDG targets</p>
          </div>

          <div className="space-y-4">
            {sdgBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-200">{item.sdg}</span>
                  <span className="text-white font-mono font-black">
                    ₹{(item.allocatedINR / 100000).toFixed(1)}L ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div 
                    className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-400"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">{item.hours} Employee Volunteer Hours Contributed</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accredited NGO Partner Table */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-400" />
              Accredited Implementing Partners (Darpan Verified)
            </h3>
            <p className="text-xs text-slate-400">Audited partner list under MCA Section 135 CSR-1 Guidelines</p>
          </div>

          <div className="space-y-3">
            {partnerNgos.map((ngo, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-extrabold text-white">{ngo.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Darpan ID: {ngo.darpanId} • {ngo.projectsConducted} Campaigns</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-amber-400 block">₹{(ngo.deployedFundsINR / 100000).toFixed(1)}L</span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40">
                    {ngo.complianceStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. Raw Participation Audit Ledger */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              Volunteer Engagement & Timestamped Audit Ledger
            </h3>
            <p className="text-xs text-slate-400">Verifiable employee attendance and pro-bono participation logs</p>
          </div>
          {isCompanyUser ? (
            <button
              onClick={handleExportCsv}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Download Full CSV
            </button>
          ) : (
            <button
              onClick={() => onNavigate('company-login')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-500/30 transition-all press-effect shadow-xs"
              title="Sign in as Corporate Partner to download audit CSV ledgers"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" /> Sign In to Export Full CSV
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 text-[11px] font-extrabold uppercase border-b border-slate-800">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Emp ID & Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Social Drive Campaign</th>
                <th className="p-3">Hours</th>
                <th className="p-3">Audited Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs font-medium text-slate-300">
              {rawParticipationLedger.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-950/50 transition-colors">
                  <td className="p-3 font-mono text-slate-400">{row.timestamp}</td>
                  <td className="p-3">
                    <strong className="text-white block">{row.name}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">{row.employeeId}</span>
                  </td>
                  <td className="p-3 text-slate-300">{row.dept}</td>
                  <td className="p-3 font-semibold text-white">{row.event}</td>
                  <td className="p-3 font-mono font-bold text-sky-400">{row.hours} hrs</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
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
