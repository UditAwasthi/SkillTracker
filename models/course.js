import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'code_example', 'note'], required: true },
  value: String,       // Used for text and notes
  heading: String,     // Used for code_example headings
  code: String,        // The actual code snippet
  language: String,    // e.g., 'python', 'javascript'
  tryItUrl: String     // Link to interactive editor
});

const TopicSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: {
    description: String,
    sections: [SectionSchema]
  },
  quizId: String
});

const ChapterSchema = new mongoose.Schema({
  chapterId: { type: Number, required: true },
  chapterTitle: { type: String, required: true },
  topics: [TopicSchema]
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  chapters: [ChapterSchema]
}, { timestamps: true });

const Course = mongoose.model('Course', CourseSchema);

export {Course}