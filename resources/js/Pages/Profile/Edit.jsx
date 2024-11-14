import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <div className="bg-black h-full">
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-black p-4 shadow sm:rounded-lg sm:p-8 border-white border">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-black p-4 shadow sm:rounded-lg sm:p-8 border-white border">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-black p-4 shadow sm:rounded-lg sm:p-8 border-white border">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
