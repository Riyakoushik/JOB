import * as React from 'react';
import {
  Briefcase, Linkedin, Users, FileText, ClipboardList, User, Bell, Settings, Search, Rocket, Database
} from 'lucide-react';
import { Toast } from '@/components/ui/custom';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useLocalStorage } from './hooks/useHooks';
import { USER_PROFILE } from './data/constants';
import JobSearchTab from './components/tabs/JobSearchTab';
import LinkedInFinderTab from './components/tabs/LinkedInFinderTab';
import HRContactsTab from './components/tabs/HRContactsTab';
import ResumeTab from './components/tabs/ResumeTab';
import ApplicationsTab from './components/tabs/ApplicationsTab';
import MyProfileTab from './components/tabs/MyProfileTab';
import AdminPanelTab from './components/tabs/AdminPanelTab';

export default function JobHunterPro() {
  const [activeTab, setActiveTab] = React.useState('jobs');
  const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' });
  const showToast = React.useCallback((message, type = 'success') => setToast({ show: true, message, type }), []);

  const [savedJobs, setSavedJobs] = useLocalStorage('jh_saved_jobs', []);
  const [savedNotes, setSavedNotes] = useLocalStorage('jh_resume_notes', []);
  const [apps, setApps] = useLocalStorage('jh_applications', [
    { id: 'app1', title: 'APM Intern', company: 'Razorpay', date: '2026-02-28', status: 'Applied', match: 92 },
    { id: 'app2', title: 'Product Analyst', company: 'Freshworks', date: '2026-02-25', status: 'Interview Scheduled', match: 88 },
  ]);

  const tabs = [
    { id: 'jobs', label: 'Discover', icon: Briefcase },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { id: 'hr', label: 'HR Finder', icon: Users },
    { id: 'admin', label: 'Admin', icon: Database },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'applications', label: 'Tracker', icon: ClipboardList },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Force dark mode
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-black selection:bg-blue-500/30">
      {/* Animated Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        {/* SHADCN STYLE HEADER */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('jobs')}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Rocket size={20} className="text-white fill-white/10" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm font-bold text-white tracking-wider leading-none">JOBHUNTER</h1>
                  <span className="text-[10px] font-black text-zinc-500 tracking-[0.2em] mt-1">PRO EDITION</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full">
                {tabs.map(t => {
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 relative
                        ${isActive
                          ? 'text-white bg-white/10 shadow-inner'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}
                    >
                      <t.icon size={14} className={isActive ? "text-blue-400" : ""} />
                      {t.label}
                      {isActive && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-blue-500/80 blur-lg rounded-full" />}
                    </button>
                  );
                })}
              </nav>

              {/* User Actions */}
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white sm:flex hidden">
                  <Search size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white relative">
                  <Bell size={18} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
                </Button>
                <div className="h-8 w-px bg-white/10 mx-1 sm:block hidden" />
                <Avatar className="cursor-pointer hover:border-blue-500/50 transition-colors">
                  {USER_PROFILE.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* MOBILE NAVIGATION BAR (Sticky Bottom) */}
        <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl flex items-center gap-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`p-3 rounded-full transition-all duration-300
                ${activeTab === t.id ? 'bg-blue-600 text-white' : 'text-zinc-500'}`}
            >
              <t.icon size={20} />
            </button>
          ))}
        </nav>

        {/* MAIN LAYOUT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-12">
          {activeTab === 'jobs' && <JobSearchTab savedJobs={savedJobs} setSavedJobs={setSavedJobs} showToast={showToast} />}
          {activeTab === 'linkedin' && <LinkedInFinderTab showToast={showToast} />}
          {activeTab === 'hr' && <HRContactsTab showToast={showToast} />}
          {activeTab === 'admin' && <AdminPanelTab showToast={showToast} />}
          {activeTab === 'resume' && <ResumeTab savedNotes={savedNotes} setSavedNotes={setSavedNotes} showToast={showToast} />}
          {activeTab === 'applications' && <ApplicationsTab apps={apps} setApps={setApps} showToast={showToast} />}
          {activeTab === 'profile' && <MyProfileTab />}
        </main>
      </div>

      <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
}
