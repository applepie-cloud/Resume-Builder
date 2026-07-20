import React from 'react';
import { 
    User, Mail, Phone, MapPin, 
    BriefcaseBusiness, Globe 
} from 'lucide-react';

// FIX 1: Added a fallback empty object (data = {}) so it never crashes if data is undefined
const PersonalInfoForm = ({ data = {}, onChange, removeBackground, setRemoveBackground }) => {

    const handleInputChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    const fields = [
        { key: "full_name", label: 'Full Name', icon: User, type: 'text', required: true },
        { key: "email", label: 'Email Address', icon: Mail, type: 'email', required: true },
        { key: "phone", label: 'Phone Number', icon: Phone, type: 'tel', required: false },
        { key: "location", label: 'Location', icon: MapPin, type: 'text', required: false },
        { key: "profession", label: 'Profession', icon: BriefcaseBusiness, type: 'text', required: false },
        { key: "linkedin", label: 'LinkedIn Profile', icon: Globe, type: 'url', required: false },
        { key: "website", label: 'Personal Website', icon: Globe, type: 'url', required: false }
    ];

    // FIX 2: Safe function to generate image preview without crashing
    const getImagePreview = (imgData) => {
        if (!imgData) return null;
        if (typeof imgData === 'string') return imgData;
        
        // Ensure it's a valid File or Blob before trying to create a URL
        if (imgData instanceof File || imgData instanceof Blob) {
            try {
                return URL.createObjectURL(imgData);
            } catch (error) {
                console.error("Failed to create object URL for image:", error);
                return null;
            }
        }
        return null;
    };

    return (
        <div>
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get started by filling out your personal details</p>

            <div className='flex items-center gap-2'>
                <label>
                    {data?.image ? (
                        <img 
                            src={getImagePreview(data.image)} 
                            alt="user-image" 
                            className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80 cursor-pointer" 
                        />
                    ) : (
                        <div className='inline-flex items-center gap-2 text-gray-500 mt-5 cursor-pointer hover:text-gray-700'>
                            <User className='size-10 p-2.5 border rounded-full' />
                            <span className='text-sm'>Upload user image</span>
                        </div>
                    )}

                    <input 
                        type='file' 
                        accept='image/jpeg,image/png' 
                        className='hidden' 
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                handleInputChange('image', e.target.files[0]);
                            }
                        }} 
                    />
                </label>
                {data?.image && typeof data.image === 'object' && (
                    <div className='flex flex-col gap-1 pl-4 text-sm'>
                        <p>Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                            <input 
                                type='checkbox' 
                                className='sr-only peer' 
                                onChange={(e) => setRemoveBackground(e.target.checked)} 
                                checked={removeBackground} 
                            />
                            <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200'></div>
                            <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
                        </label>
                    </div>
                )}
            </div>

            {/* Form Fields mapped below */}
            <div className="mt-5 space-y-4">
                {fields.map((field) => {
                    const Icon = field.icon;
                    return (
                        <div key={field.key} className='space-y-1'>
                            <label className='flex items-center gap-2 font-medium text-gray-600'>
                                <Icon className='size-5' />
                                {field.label}
                                {field.required && <span className='text-red-500'>*</span>}
                            </label>

                            <input 
                                type={field.type} 
                                value={data?.[field.key] || ""} 
                                onChange={(e) => handleInputChange(field.key, e.target.value)} 
                                placeholder={field.label.toLowerCase()} 
                                className='mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                required={field.required} 
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PersonalInfoForm;