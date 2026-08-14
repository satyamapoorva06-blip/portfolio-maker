'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { isUserAdmin } from '@/lib/auth/admin-guard';
import { AdminUserListItem } from '@/types/admin';
import { Search, Filter, Ban, Trash2, Eye, ShieldAlert, CheckCircle2, UserX, AlertTriangle } from 'lucide-react';

const SAMPLE_USERS: AdminUserListItem[] = [
  {
    id: 'usr_satyam_demo_01',
    name: 'Satyam Sharma',
    email: 'satyam@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'admin',
    status: 'active',
    created_at: '2024-01-15',
    last_login: '2026-08-14',
    portfolioCount: 3,
    publishedCount: 2,
  },
  {
    id: 'usr_alex_02',
    name: 'Alex Mercer',
    email: 'alex.mercer@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'user',
    status: 'active',
    created_at: '2024-03-22',
    last_login: '2026-08-10',
    portfolioCount: 1,
    publishedCount: 1,
  },
  {
    id: 'usr_priya_03',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'user',
    status: 'active',
    created_at: '2024-05-10',
    last_login: '2026-08-12',
    portfolioCount: 2,
    publishedCount: 2,
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserListItem[]>(SAMPLE_USERS);
  const [search, setSearch] = useState('');
  const [deleteModalUser, setDeleteModalUser] = useState<AdminUserListItem | null>(null);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u))
    );
  };

  const confirmDeleteUser = () => {
    if (deleteModalUser) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteModalUser.id));
      setDeleteModalUser(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">User Management</h1>
            <p className="text-sm text-slate-400">Search, inspect, disable, or delete platform user accounts.</p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Portfolios</th>
                  <th className="px-6 py-4">Registration</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={u.avatar_url} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                      <div>
                        <p className="font-bold text-white text-sm">{u.name}</p>
                        <p className="text-slate-400 text-[11px]">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${u.role === 'admin' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-300'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono">{u.portfolioCount} ({u.publishedCount} pub)</td>
                    <td className="px-6 py-4 font-mono text-slate-400">{u.created_at}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${u.status === 'active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] border border-slate-700 transition"
                      >
                        {u.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => setDeleteModalUser(u)}
                        className="px-2.5 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg text-[11px] border border-rose-800 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModalUser && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-6 text-center text-slate-100 shadow-2xl">
              <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Delete User Account?</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-white">{deleteModalUser.name}</strong> ({deleteModalUser.email})? This will permanently remove all associated portfolios and deployments.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteModalUser(null)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteUser}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
