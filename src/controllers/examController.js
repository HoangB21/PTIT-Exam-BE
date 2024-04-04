const examService = require('../services/examServices');

// Controller để tạo một kỳ thi mới
exports.createExam = async (req, res) => {
    try {
        const { name, type, length, start, end } = req.body;
        const exam = await examService.createExam(name, type, length, start, end);
        res.status(201).json(exam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để lấy tất cả các kỳ thi
exports.getAllExams = async (req, res) => {
    try {
        const exams = await examService.getAllExams();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để lấy một kỳ thi theo id
exports.getExamById = async (req, res) => {
    try {
        const { id } = req.params;
        const exam = await examService.getExamById(id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để cập nhật thông tin của một kỳ thi
exports.updateExam = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, length, start, end } = req.body;
        const exam = await examService.updateExam(id, name, type, length, start, end);
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller để xóa một kỳ thi
exports.deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        await examService.deleteExam(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
