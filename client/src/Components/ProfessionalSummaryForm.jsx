import { Loader2, Sparkles } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../config/api'

const ProfessionalSummaryForm = ({data,onChange,setResumeData}) => {
    const { token } = useSelector((state) => state.auth);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateSummary = async () => {
        try {
            setIsGenerating(true);
            const prompt = `enhance my professional summary ${data}`;

            const response = await api.post('/api/ai/enhance-pro-sum',{userContent : prompt},{
                headers : {
                    Authorization : token,
                }
            })
            setResumeData(prev => ({...prev, professional_summary : response.data.enhancedContent}))
        } catch(error) {
            toast.error(error?.response?.data?.message || error.message || 'Error generating summary');
        } finally {
            setIsGenerating(false);
        }
    }
  return (
    <div className='space-y-4'> 
        <div className="flex items-center justify-between">
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold"> professional summary</h3>
                <p className="text-sm text-gray-500">
                    Add summary for your resume here
                </p>
            </div>
            <button onClick={generateSummary} disabled={isGenerating} className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100
            text-green-700 rounded hover:bg-green-200 transition-colors disabled:opacity-50">
                {isGenerating ? (<Loader2 className="animate-spin size-4" />) : (<Sparkles className="size-4"/>)}
                {isGenerating ? 'Enhancing...' : 'AI Enhance'}
            </button>
        </div>

        <div className="mt-6">
            <textarea  name="" id="" className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none" 
            placeholder="Write your professional summary here..."
            rows={7}
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
            />

            <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
               Tip: A strong professional summary should be concise and highlight your key skills, experience, and career goals. Focus on what makes you unique and how you can add value to potential employers. 
            </p>
        </div>
    </div>
  )
}

export default ProfessionalSummaryForm