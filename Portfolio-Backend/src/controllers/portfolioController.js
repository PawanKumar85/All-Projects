import Home from '../models/subModel/home.js';
import About from '../models/subModel/about.js';
import Education from '../models/subModel/education.js';
import Skill from '../models/subModel/skills.js';
import Project from '../models/subModel/project.js';
import SocialMediaLink from '../models/subModel/socialMediaLink.js';
import Platform from '../models/subModel/codingPlatform.js';

export const get_all_portfolio_data = async (req, res) => {
  try {
    // Fetch data in parallel
    const [
      home,
      about,
      education,
      skills,
      platforms,
      projects,
      socialMediaLinks
    ] = await Promise.all([
      Home.findOne().select("-createdAt -updatedAt -__v").exec(),
      About.findOne().select("-createdAt -updatedAt -__v").exec(),
      Education.find().select("-createdAt -updatedAt -__v").exec(),
      Skill.find().select("-createdAt -updatedAt -__v").exec(),
      Platform.find().select("-createdAt -updatedAt -__v").exec(),
      Project.find().select("-createdAt -updatedAt -__v").exec(),
      SocialMediaLink.find().select("-createdAt -updatedAt -__v").exec(),
    ]);

    return res.status(200).json({
      home: home || {},
      about: about || {},
      education: education || [],
      skills: skills || [],
      platforms: platforms || [],
      projects: projects || [],
      socialMediaLinks: socialMediaLinks || [],
    });
  } catch (error) {
    return res.status(500).json({ message: `Error fetching portfolio data: ${error.message}` });
  }
};
