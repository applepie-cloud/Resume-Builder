import openai from "../config/openai.js";
import Resume from "../Models/ResumeModel.js";

// controller for enhancing resume's profressional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req,res) => {
    try {
        const { userContent } = req.body;
        if(!userContent) {
            return res.status(400).json({
                message : 'missing required fields'
            })
        }

        const response = await openai.chat.completions.create({
            model : process.env.MODEL,
            messages : [
                { role : 'system', 
                    content : 'you are an expert in writing resumes.your task is to enhance the professional summary of a resume. the summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. make it compelling and ATS-friendly. only return the enhanced summary text.' 
                },
                {
                    role : "user",
                    content : userContent,
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content;

        return res.status(200).json({
            message : 'professional summary enhanced successfully',
            enhancedContent,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message,
        })
    }
}

// controller for enhancing resume's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req,res) => {
     try {
        const { userContent } = req.body;
        if(!userContent) {
            return res.status(400).json({
                message : 'missing required fields'
            })
        }

        const response = await openai.chat.completions.create({
            model : process.env.MODEL,
            messages : [
                { role : 'system', 
                    content : 'you are an expert in writing resumes.your task is to enhance the job description of a resume. the description should be 1-2 sentences also highlighting key responsibilities and achievements. make it compelling and ATS-friendly. only return the enhanced description text.' 
                },
                {
                    role : "user",
                    content : userContent,
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content;

        return res.status(200).json({
            message : 'job description enhanced successfully',
            enhancedContent,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message,
        })
    }
}

// controller for uploading a resume to the database 
// POST : /api/ai/upload-resume

export const uploadResume = async (req,res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if(!resumeText) {
            return res.status(400).json({
                message : 'missing required fields'
            })
        }

        const systemPrompt = "you are an exper AI agent to extract data from resume"
        const userPrompt = `extract data from this resume : ${resumeText} 
            provide data int the following JSON format with no additional text before or after:
            {
                    professional_summary : {
                        type : String,
                        default : ''
                    },
                    skills : [
                        { type : String }
                    ],
                    personal_info : {
                        image : { 
                            type : String,
                            default : ''
                        },
                        full_name : {
                            type : String,
                            default : ''
                        },
                        email : {
                            type : String,
                            default : ''
                        },
                        phone : {
                            type : String,
                            default : ''
                        },
                        location : {
                            type : String,
                            default : ''
                        },
                        linkedin : {
                            type : String,
                            default : ''
                        },
                        website : {
                            type : String,
                            default : ''
                        },
                        experience : [
                            { 
                                company : { type : String },
                                position : { type : String },
                                start_date : { type : String },
                                end_date : { type : String },
                                description : { type : String },
                                is_current : { type : Boolean, default : false }
                            }
                        ],
                        project : [
                            {
                                name : { type : String },
                                type : { type : String },
                                description : { type : String },
                            }
                        ],
                        education : [
                            {
                                institution : { type : String },
                                degree : { type : String },
                                field : { type : String },
                                graduation_date : { type : String },
                                gpa : { type : String },
                            }
                        ]
                    }
            }
            `

        const response = await openai.chat.completions.create({
            model : process.env.MODEL,
            messages : [
                {
                    role : 'system',
                    content: systemPrompt,
                },
                {
                    role: 'user',
                    content: userPrompt,
                }
            ]
        }, response_format = {
            type : 'json-object'
        })

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData,
        })

        return res.status(201).json({
            resumeId : newResume._id,
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message,
        })
    }
}