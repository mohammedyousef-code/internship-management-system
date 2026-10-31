import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ChangePasswordForm } from '@/components/common';
import { User, Mail, Shield } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations Personnelles</h2>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">Nom complet</p>
                            <p className="text-base font-medium text-gray-900">{user?.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-base font-medium text-gray-900">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">Rôle</p>
                            <p className="text-base font-medium text-gray-900 capitalize">{user?.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <ChangePasswordForm />
            </div>
        </div>
    );
};

export default ProfilePage;
