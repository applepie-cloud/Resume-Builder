import imageKit from "../config/imageKit.js";
import Resume from "../Models/ResumeModel.js";
import fs from "fs";

// controller for creating new resume
// POST : /api/resumes/create

export const createResume = async (req,res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        // create new resume
        const newResume = await Resume.create({
            userId ,
            title,
        })

        return res.status(201).json({ 
            message : "Resume created successfully", 
            resume : newResume 
        });
    } catch (error) {
        return res.status(500).json({message : "Server error in creating resume"});
    }
}

// controller for deleting resume 
// DELETE : /api/resumes/delete

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({
            userId,
            _id : resumeId,
        })

        return res.status(200).json({
            message : 'resume deleted successfully',
        })
    } catch (error) {
        return res.status(500).json({message : "Server error in deleting resume"});
    }
}

// get user resume by Id
// GET : /api/resumes/get

export const getResumeById = async (req,res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume  = await Resume.findOne({
            userId,
            _id : resumeId,
        })

        if(!resume)
            return res.status(404).json({ message : "Resume not found "})

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(500).json({ message :  error.message || "Server error in getting resume by id"});
    }
}

// get resume by Id public
// GET : /api/jresumes/public

export const getPublicResumeById = async (req,res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ _id: resumeId,
            public : true,
        })

        if(!resume) {
            return res.status(404).json({ message : "Resume not found"});
        }

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(500).json({ message :  error.message || "Server error in getting public resume by id"});
    }
}

// update resume by id
// PUT : /api/resumes/update

export const updateResume = async (req,res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;

            const imagePath = req.file ? req.file.path : undefined;

            // resumeData may arrive as a JSON string when sent via FormData
            let resumeDataCopy;
            if (typeof resumeData === 'string') {
                try {
                    resumeDataCopy = JSON.parse(resumeData);
                } catch (err) {
                    return res.status(400).json({ message: 'Invalid resumeData JSON' });
                }
            } else {
                resumeDataCopy = resumeData || {};
            }

            const removeBg = removeBackground === 'true' || removeBackground === true;

            if (imagePath) {
                const imageBufferData = fs.createReadStream(imagePath);

                const response = await imageKit.files.upload({
                    file: imageBufferData,
                    fileName: 'resume.png',
                    folder: 'user-resumes',
                    transformation: {
                        pre: 'w - 300,h-300,fo-face,z-0.75' + (removeBg ? ',e-bgremove' : ''),
                    }
                });

                // ensure personal_info object exists
                resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
                resumeDataCopy.personal_info.image = response.url;
            }

        const resume = await Resume.findOneAndUpdate({
            userId,
            _id : resumeId,
        }, resumeDataCopy, {new : true });

        return res.status(200).json({
            message : "Resume updated successfully",
            resume,
        })
    } catch (error) {
        return res.status(500).json({message : "Server error in updating resume"});
    }
}