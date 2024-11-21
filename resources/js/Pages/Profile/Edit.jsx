import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <div className="bg-black h-full">
            <Head title="Profile" />
            <a
                href="/"
                className="absolute top-4 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
                Back
            </a>
            <h1 className="text-white font-extrabold text-4xl w-full flex items-center justify-center h-16">
                Edit Profile
            </h1>
            <div className="pb-12">
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
