import { Course } from '../models/course.js';
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAndSaveCourse = async (req, res) => {
  const { topicName } = req.body;

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" } // Force JSON output
  });

  const prompt = `
    Create a detailed course structure for "${topicName}" in the following JSON format:
    {
      "title": "Course Title",
      "slug": "course-slug",
      "description": "Short description",
      "chapters": [
        {
          "chapterId": 1,
          "chapterTitle": "Chapter Name",
          "topics": [
            {
              "topicId": "unique-id",
              "title": "Topic Name",
              "slug": "topic-slug",
              "content": {
                "description": "topic description",
                "sections": [
                  { "type": "text", "value": "content here" },
                  { "type": "code_example", "heading": "example", "code": "print()", "language": "python", "tryItUrl": "url" }
                ]
              },
              "quizId": "quiz-id"
            }
          ]
        }
      ]
    }
    Ensure the response is valid JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const rawJson = result.response.text();
    const courseData = JSON.parse(rawJson);

    // Save to MongoDB
    const newCourse = await Course.create(courseData);

    res.status(201).json({
      message: "Course generated and saved successfully!",
      course: newCourse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate course content." });
  }
};

export { generateAndSaveCourse };