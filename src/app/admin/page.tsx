"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  UserCheck, 
  Shield, 
  Plus, 
  LogOut, 
  AlertTriangle, 
  Lock, 
  User, 
  FileText, 
  Image, 
  ClipboardList
} from 'lucide-react';
import UserManagement from '../../components/admin/user-management';
import NewsManagement from '../../components/admin/news-management';
import GalleryManagement from '../../components/admin/gallery-management';
import RegistrationManagement from '../../components/admin/registration-management';

type TabType = 'users' | 'news' | 'gallery' | 'registrations';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />
      case 'news':
        return <NewsManagement />
      case 'gallery':
        return <GalleryManagement />
      case 'registrations':
        return <RegistrationManagement />
      default:
        return <UserManagement />
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Admin Panel
                </CardTitle>
                <CardDescription>
                  Kelola sistem PPTB BAROKATUL QUR'AN
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      activeTab === 'users'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    Users
                  </button>
                  <button
                    onClick={() => setActiveTab('news')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      activeTab === 'news'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    News
                  </button>
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      activeTab === 'gallery'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Image className="h-4 w-4" />
                    Gallery
                  </button>
                  <button
                    onClick={() => setActiveTab('registrations')}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      activeTab === 'registrations'
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <ClipboardList className="h-4 w-4" />
                    Registrations
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
} 