import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Lock, Save, Eye, EyeOff } from 'lucide-react';
import { Card, Input, Button, Toast } from '@/components/common';
import { authService } from '@/api/services';

const schema = yup.object().shape({
    current_password: yup.string().required('Le mot de passe actuel est requis'),
    new_password: yup.string()
        .required('Le nouveau mot de passe est requis')
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    new_password_confirmation: yup.string()
        .oneOf([yup.ref('new_password'), null], 'Les mots de passe ne correspondent pas')
        .required('La confirmation du mot de passe est requise'),
});

const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await authService.changePassword(
                data.current_password,
                data.new_password,
                data.new_password_confirmation
            );
            Toast.success('Mot de passe modifié avec succès. Veuillez vous reconnecter.');
            reset();
            // Optionnel : déconnecter l'utilisateur
            // await authService.logout();
            // window.location.href = '/login';
        } catch (error) {
            console.error('Erreur changement mot de passe:', error);
            if (error.response?.data?.message) {
                Toast.error(error.response.data.message);
            } else {
                Toast.error('Erreur lors du changement de mot de passe');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card padding="normal">
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Changer le mot de passe</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <Input
                            label="Mot de passe actuel"
                            type={showCurrentPassword ? "text" : "password"}
                            error={errors.current_password?.message}
                            {...register('current_password')}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <Input
                            label="Nouveau mot de passe"
                            type={showNewPassword ? "text" : "password"}
                            error={errors.new_password?.message}
                            {...register('new_password')}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <Input
                            label="Confirmer le nouveau mot de passe"
                            type={showConfirmPassword ? "text" : "password"}
                            error={errors.new_password_confirmation?.message}
                            {...register('new_password_confirmation')}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            icon={Save}
                            loading={loading}
                        >
                            Mettre à jour le mot de passe
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default ChangePasswordForm;
