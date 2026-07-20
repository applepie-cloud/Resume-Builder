import { Plus, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react'

const SkillsForm = ({data, onChange}) => {

    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        const val = newSkill.trim();
        if (val !== "" && !data.includes(val)) {
            onChange([...data, val]);
            setNewSkill("");
        }
    }

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, i) => i !== indexToRemove));
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    }
  return (
    <div className='space-y-4'>
        <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold"> Skills </h3>
            <p className="text-sm text-gray-500"> Add your technical and soft skills </p>
        </div>

        <div className="flex gap-2">
            <input type="text" placeholder="Enter a skill" className="flex-1 px-3 py-3 text-sm" 
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            />

            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowwed"
            onClick={addSkill}
            disabled={!newSkill.trim()} 
            >
                <Plus className="size-4" /> Add
            </button>
        </div>
        {data.length > 0 ? (
            <div className="flex flex-wrap gap-2"> 
                {data.map((skill,index) => (
                    <span key={index} className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {skill}

                        <button 
                            className="ml-2 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                            onClick={() => removeSkill(index)}
                        >
                            <X className="w-3  h-3"/>
                        </button>
                    </span>
                ))}
            </div>
        ) : (
            <div className="text-center py-6 text-gray-500">
                <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300"/>
                <p>No skill added yet</p>
                <p className="text-sm">Add your technical and soft skills above </p>
            </div>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800"> <strong>Tip:</strong>
                Add 8-12 relevent skills, include both technical and soft skills  
            </p>
        </div>
    </div>
  )
}

export default SkillsForm