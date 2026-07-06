import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    targetRole: {
      type: String,
      required: true,
      trim: true,
    },
    isQualified: {
      type: Boolean,
      default: true,
    },
    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    strengths: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    interviewQuestions: {
      type: [String],
      default: [],
    },
    roadmap: [
      {
        phase: String,
        duration: String,
        topics: [String],
        project: {
          title: String,
          description: String
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);

export default Report;
