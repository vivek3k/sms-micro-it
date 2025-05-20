
import { MessageType } from "./ChatMessage";

// Predefined questions and answers
const predefinedResponses: Record<string, string> = {
  // General questions
  "hello": "Hello! How can I help you today?",
  "hi": "Hi there! How can I assist you with the student portal?",
  "help": "I can help with questions about courses, assignments, attendance, fee payments, and general portal navigation. What would you like to know about?",
  
  // Student-specific questions
  "courses": "You can view all your enrolled courses in the Courses section. Each course shows the instructor, schedule, and current progress.",
  "assignments": "Check the Assignments section to view all your pending and completed assignments. You can upload submissions directly through the portal.",
  "attendance": "Your attendance records are available in the Attendance section. You can view subject-wise attendance and see your overall attendance percentage.",
  "fees": "Visit the Fee Payment section to view pending fees, payment history, and make new payments using various payment methods.",
  "schedule": "Your class schedule is available in the Schedule section. It shows all your classes organized by weekday and time.",
  "exams": "Exam schedules will be posted in the Announcements section. You can also check individual course pages for specific exam details.",
  "contact faculty": "You can message faculty members directly through the portal by visiting their profile page from your course listings.",
  "reset password": "To reset your password, log out and use the 'Forgot Password' option on the login page.",
  "logout": "You can logout by clicking on your profile icon in the top-right corner and selecting Logout.",
  
  // Faculty-specific questions
  "grade assignments": "As a faculty member, you can grade student assignments by navigating to the Assignments section and selecting the assignment you want to grade. You can provide feedback and assign scores directly.",
  "student performance": "The Student Performance section provides analytics on student progress, attendance, and assignment completion rates. You can view individual student reports or class-wide statistics.",
  "create assignment": "To create a new assignment, go to the Assignments section and click on the 'Create Assignment' button. You can set due dates, attach files, and specify submission requirements.",
  "attendance management": "The Attendance Management section allows you to mark attendance for your classes, view attendance reports, and identify students with low attendance percentages.",
  "class management": "Faculty can manage their classes through the Courses section. You can add course materials, send announcements, and organize course content.",
  "report issue": "If you encounter any technical issues, please click on the 'Report Issue' option in your profile menu. Describe the problem in detail, and our IT team will assist you.",
  "teaching schedule": "Your teaching schedule is available in the Schedule section. It displays all your classes organized by weekday and time slot.",
  "contact admin": "To contact the administration, use the 'Contact Admin' option in your profile menu or send a message through the portal's messaging system.",
};

// Role-based responses
const isStudentQuestion = (message: string): boolean => {
  const studentKeywords = ["my courses", "my assignments", "my attendance", "my fees", "my schedule", "student portal"];
  return studentKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

const isFacultyQuestion = (message: string): boolean => {
  const facultyKeywords = ["grade", "create assignment", "student performance", "manage attendance", "class management", "teaching"];
  return facultyKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

// AI-like response generator
export const generateResponse = (message: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert to lowercase for matching
      const lowercaseMessage = message.toLowerCase();
      
      // Check for predefined responses
      for (const [key, response] of Object.entries(predefinedResponses)) {
        if (lowercaseMessage.includes(key)) {
          resolve(response);
          return;
        }
      }
      
      // Context-aware responses
      if (isStudentQuestion(message)) {
        resolve("I notice you're asking about student-related features. As a student, you can access your courses, assignments, attendance records, and fee information through the respective sections in the portal.");
        return;
      }
      
      if (isFacultyQuestion(message)) {
        resolve("I see you're asking about faculty-related features. As a faculty member, you have access to grade assignments, manage attendance, view student performance analytics, and create new course materials through the faculty dashboard.");
        return;
      }
      
      // Generate a fallback response if no match is found
      const fallbackResponses = [
        "I'm not sure I understand. Could you rephrase your question?",
        "I don't have information about that yet. Is there something else I can help with?",
        "That's beyond my current knowledge. For technical support, please contact the IT department.",
        "I'm still learning about that. Can I help you with courses, assignments, attendance, or fee payments instead?",
        "I don't have that information in my database. Would you like to know about a different topic?"
      ];
      
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      resolve(fallbackResponses[randomIndex]);
    }, 500 + Math.random() * 1000); // Simulate processing time for more natural feel
  });
};
