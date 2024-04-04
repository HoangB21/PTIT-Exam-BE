const { getAllSubmissionsService, getSubmissionOfUserService, getSubmissionOfExamService, createSubmissionService, deleteSubmissionService } = require('../services/submissionServices');

exports.getAllSubmissionsController = async (req, res) => {
    try {
        const submissions = await getAllSubmissionsService();
        return res.status(200).json(submissions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getSubmissionOfUserController = async (req, res) => {
    const { userid } = req.params;
    try {
        const submissions = await getSubmissionOfUserService(userid);
        return res.status(200).json(submissions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getSubmissionOfExamController = async (req, res) => {
    const { examid } = req.params;
    try {
        const submissions = await getSubmissionOfExamService(examid);
        return res.status(200).json(submissions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.createSubmissionController = async (req, res) => {
    const { userid, examid, correctAnswers } = req.body;
    try {
        const submission = await createSubmissionService(userid, examid, correctAnswers);
        return res.status(201).json(submission);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteSubmissionController = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteSubmissionService(id);
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
