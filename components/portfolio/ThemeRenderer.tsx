'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';

// Core Base Templates
import MinimalTheme from '@/templates/minimal/MinimalTheme';
import DeveloperTheme from '@/templates/developer/DeveloperTheme';
import CreativeTheme from '@/templates/creative/CreativeTheme';
import ThreeDTheme from '@/templates/three-d/ThreeDTheme';
import ProfessionalTheme from '@/templates/professional/ProfessionalTheme';
import GlassTheme from '@/templates/glass/GlassTheme';
import CyberMatrixTheme from '@/templates/cyber-matrix/CyberMatrixTheme';
import BentoGridTheme from '@/templates/bento-grid/BentoGridTheme';
import KineticPosterTheme from '@/templates/kinetic-poster/KineticPosterTheme';

// 10 Standalone Animated Theme Components
import KineticTypeTheme from '@/templates/animated/KineticTypeTheme';
import LaserNeonTheme from '@/templates/animated/LaserNeonTheme';
import ThreeDOrbsTheme from '@/templates/animated/ThreeDOrbsTheme';
import GlitchHackerTheme from '@/templates/animated/GlitchHackerTheme';
import AuroraMeshTheme from '@/templates/animated/AuroraMeshTheme';
import ElasticCardsTheme from '@/templates/animated/ElasticCardsTheme';
import ParticleConstellationTheme from '@/templates/animated/ParticleConstellationTheme';
import LiquidGlassTheme from '@/templates/animated/LiquidGlassTheme';
import SynthwaveRetroTheme from '@/templates/animated/SynthwaveRetroTheme';
import PrismRefractionTheme from '@/templates/animated/PrismRefractionTheme';

// Dedicated Standalone Theme Components for Showcase Themes (1 to 50)
import QuantumMatrixTheme from '@/templates/quantum-matrix/QuantumMatrixTheme'; // 2
import GenerativeCanvasTheme from '@/templates/generative-canvas/GenerativeCanvasTheme'; // 3
import GlassmorphicLlmTheme from '@/templates/glassmorphic-llm/GlassmorphicLlmTheme'; // 4
import CyberpunkMernTheme from '@/templates/cyberpunk-mern/CyberpunkMernTheme'; // 5
import DeepLearningTheme from '@/templates/deep-learning/DeepLearningTheme'; // 6
import CloudArchitectTheme from '@/templates/cloud-architect/CloudArchitectTheme'; // 7
import ObsidianRedTheme from '@/templates/obsidian-red/ObsidianRedTheme'; // 8
import AcademicScholarTheme from '@/templates/academic-scholar/AcademicScholarTheme'; // 9
import AgenticAiTheme from '@/templates/agentic-ai/AgenticAiTheme'; // 10
import SpatialArVrTheme from '@/templates/spatial-arvr/SpatialArVrTheme'; // 11 / 1
import ComputerVisionTheme from '@/templates/computer-vision/ComputerVisionTheme'; // 12
import MinimalDarkCsTheme from '@/templates/minimal-dark-cs/MinimalDarkCsTheme'; // 13
import DataScienceTheme from '@/templates/data-science/DataScienceTheme'; // 14
import RagPromptTheme from '@/templates/rag-prompt/RagPromptTheme'; // 15
import ReactiveFullstackTheme from '@/templates/reactive-fullstack/ReactiveFullstackTheme'; // 16
import CsAlgorithmsTheme from '@/templates/cs-algorithms/CsAlgorithmsTheme'; // 17
import VibrantWebTheme from '@/templates/vibrant-web/VibrantWebTheme'; // 18
import CseResearchTheme from '@/templates/cse-research/CseResearchTheme'; // 19
import CreativeDevopsTheme from '@/templates/creative-devops/CreativeDevopsTheme'; // 20
import BeginnerCsTheme from '@/templates/beginner-cs/BeginnerCsTheme'; // 21
import MinimalCsTheme from '@/templates/minimal-cs/MinimalCsTheme'; // 22
import MernNeonTheme from '@/templates/mern-neon/MernNeonTheme'; // 23
import SpringbootEnterpriseTheme from '@/templates/springboot-enterprise/SpringbootEnterpriseTheme'; // 24
import JavaMicroservicesTheme from '@/templates/java-microservices/JavaMicroservicesTheme'; // 25
import CsMernTheme from '@/templates/cs-mern/CsMernTheme'; // 26
import FastapiAiTheme from '@/templates/fastapi-ai/FastapiAiTheme'; // 27
import ResponsiveArchitectTheme from '@/templates/responsive-architect/ResponsiveArchitectTheme'; // 28
import FullstackSdeTheme from '@/templates/fullstack-sde/FullstackSdeTheme'; // 29
import HighimpactMernTheme from '@/templates/highimpact-mern/HighimpactMernTheme'; // 30
import FigmaUiuxTheme from '@/templates/figma-uiux/FigmaUiuxTheme'; // 31
import ModernFullstackTheme from '@/templates/modern-fullstack/ModernFullstackTheme'; // 32
import PersonalShowcaseTheme from '@/templates/personal-showcase/PersonalShowcaseTheme'; // 33
import CyberSecurityTheme from '@/templates/cyber-security/CyberSecurityTheme'; // 34
import ReactTailwindTheme from '@/templates/react-tailwind/ReactTailwindTheme'; // 35
import JavaFullstackTheme from '@/templates/java-fullstack/JavaFullstackTheme'; // 36
import CleanFullstackTheme from '@/templates/clean-fullstack/CleanFullstackTheme'; // 37
import SimpleStudentTheme from '@/templates/simple-student/SimpleStudentTheme'; // 38
import LearnerStudioTheme from '@/templates/learner-studio/LearnerStudioTheme'; // 39
import NextjsAiTheme from '@/templates/nextjs-ai/NextjsAiTheme'; // 40
import IotHardwareTheme from '@/templates/iot-hardware/IotHardwareTheme'; // 41
import FullstackSoftwareTheme from '@/templates/fullstack-software/FullstackSoftwareTheme'; // 42
import SwissBrutalistTheme from '@/templates/swiss-brutalist/SwissBrutalistTheme'; // 43
import AcademicResearchTheme from '@/templates/academic-research/AcademicResearchTheme'; // 44
import StarCollectionTheme from '@/templates/star-collection/StarCollectionTheme'; // 45
import OpenSourceContributorTheme from '@/templates/open-source-contributor/OpenSourceContributorTheme'; // 46
import EngineeringShowcaseTheme from '@/templates/engineering-showcase/EngineeringShowcaseTheme'; // 47
import Futuristic2025Theme from '@/templates/futuristic-2025/Futuristic2025Theme'; // 48
import GistGridTheme from '@/templates/gist-grid/GistGridTheme'; // 49
import OneHourDigitalTheme from '@/templates/onehour-digital/OneHourDigitalTheme'; // 50

export default function ThemeRenderer({ data }: { data: PortfolioData }) {
  const theme = data.customization?.theme || 'minimal';

  switch (theme) {
    // 10 DISTINCT ANIMATED PORTFOLIO THEMES
    case 'animated-kinetic-type':
      return <KineticTypeTheme data={data} />;
    case 'animated-laser-neon':
      return <LaserNeonTheme data={data} />;
    case 'animated-3d-orbs':
      return <ThreeDOrbsTheme data={data} />;
    case 'animated-[#1]':
    case 'animated-glitch-hacker':
      return <GlitchHackerTheme data={data} />;
    case 'animated-aurora-mesh':
      return <AuroraMeshTheme data={data} />;
    case 'animated-[#2]':
    case 'animated-elastic-cards':
      return <ElasticCardsTheme data={data} />;
    case 'animated-particle-constellation':
      return <ParticleConstellationTheme data={data} />;
    case 'animated-[#3]':
    case 'animated-liquid-glass':
      return <LiquidGlassTheme data={data} />;
    case 'animated-[#4]':
    case 'animated-synthwave-retro':
      return <SynthwaveRetroTheme data={data} />;
    case 'animated-[#5]':
    case 'animated-prism-refraction':
      return <PrismRefractionTheme data={data} />;

    // 50 UNIQUE SHOWCASE PORTFOLIO THEMES (1 TO 50)
    case 'kuber-ai-creative': // 1
    case 'srikhanth-arvr': // 11
      return <SpatialArVrTheme data={data} />;
    case 'tvnskm-aiml-fullstack': // 2
      return <QuantumMatrixTheme data={data} />;
    case 'priyanshu-creative': // 3
      return <GenerativeCanvasTheme data={data} />;
    case 'kirti-aiml': // 4
      return <GlassmorphicLlmTheme data={data} />;
    case 'harsh-aiml-mern': // 5
      return <CyberpunkMernTheme data={data} />;
    case 'hari-aiml': // 6
      return <DeepLearningTheme data={data} />;
    case 'nishil-cloud': // 7
    case 'anmol-creative-sys':
      return <CloudArchitectTheme data={data} />;
    case 'prince-ai': // 8
      return <ObsidianRedTheme data={data} />;
    case 'sahil-aiml-student': // 9
      return <AcademicScholarTheme data={data} />;
    case 'suraj-agentic-ai': // 10
      return <AgenticAiTheme data={data} />;
    case 'abhinav-cv-ml': // 12
      return <ComputerVisionTheme data={data} />;
    case 'sahil-sahu-ai': // 13
      return <MinimalDarkCsTheme data={data} />;
    case 'shreya-datascience': // 14
      return <DataScienceTheme data={data} />;
    case 'aman-genai': // 15
      return <RagPromptTheme data={data} />;
    case 'nikhil-fullstack': // 16
      return <ReactiveFullstackTheme data={data} />;
    case 'abhay-cs-ai': // 17
      return <CsAlgorithmsTheme data={data} />;
    case 'saad-fullstack': // 18
      return <VibrantWebTheme data={data} />;
    case 'prashant-cse-aiml': // 19
      return <CseResearchTheme data={data} />;
    case 'anmol-creative-sys-devops': // 20
      return <CreativeDevopsTheme data={data} />;
    case 'abhishek-beginner': // 21
      return <BeginnerCsTheme data={data} />;
    case 'harsh-cs-student': // 22
      return <MinimalCsTheme data={data} />;
    case 'dheeraj-mern': // 23
      return <MernNeonTheme data={data} />;
    case 'rishav-java-backend': // 24
      return <SpringbootEnterpriseTheme data={data} />;
    case 'adil-java-microservices': // 25
      return <JavaMicroservicesTheme data={data} />;
    case 'megha-mern': // 26
      return <CsMernTheme data={data} />;
    case 'harsh-backend-ai': // 27
      return <FastapiAiTheme data={data} />;
    case 'karan-webdev': // 28
      return <ResponsiveArchitectTheme data={data} />;
    case 'shashank-fullstack': // 29
      return <FullstackSdeTheme data={data} />;
    case 'suraj-mern': // 30
      return <HighimpactMernTheme data={data} />;
    case 'abdulhussain-uiux': // 31
      return <FigmaUiuxTheme data={data} />;
    case 'sakesh-fullstack': // 32
      return <ModernFullstackTheme data={data} />;
    case 'arun-fullstack': // 33
      return <PersonalShowcaseTheme data={data} />;
    case 'ritik-cybersec': // 34
      return <CyberSecurityTheme data={data} />;
    case 'shivam-frontend': // 35
      return <ReactTailwindTheme data={data} />;
    case 'vinay-java-fullstack': // 36
      return <JavaFullstackTheme data={data} />;
    case 'subhadeep-fullstack': // 37
      return <CleanFullstackTheme data={data} />;
    case 'wasif-cs-student': // 38
      return <SimpleStudentTheme data={data} />;
    case 'prince-shah-learning': // 39
      return <LearnerStudioTheme data={data} />;
    case 'dhanaraj-frontend-ai': // 40
      return <NextjsAiTheme data={data} />;
    case 'ayush-iot-creative': // 41
      return <IotHardwareTheme data={data} />;
    case 'priyank-fullstack': // 42
      return <FullstackSoftwareTheme data={data} />;
    case 'aadi-neobrutalist': // 43
      return <SwissBrutalistTheme data={data} />;
    case 'cs-student-collection': // 44
      return <AcademicResearchTheme data={data} />;
    case 'emma-bostian-curated': // 45
      return <StarCollectionTheme data={data} />;
    case 'github-topic-student': // 46
      return <OpenSourceContributorTheme data={data} />;
    case 'sitesplaced-examples': // 47
      return <EngineeringShowcaseTheme data={data} />;
    case 'nikola-janjic-2025': // 48
      return <Futuristic2025Theme data={data} />;
    case 'gist-inspiration': // 49
      return <GistGridTheme data={data} />;
    case 'onehour-digital': // 50
      return <OneHourDigitalTheme data={data} />;

    case 'cyber-matrix':
      return <CyberMatrixTheme data={data} />;
    case 'bento-grid':
      return <BentoGridTheme data={data} />;
    case 'kinetic-poster':
      return <KineticPosterTheme data={data} />;
    case 'developer':
      return <DeveloperTheme data={data} />;
    case 'creative':
      return <CreativeTheme data={data} />;
    case 'three-d':
      return <ThreeDTheme data={data} />;
    case 'professional':
      return <ProfessionalTheme data={data} />;
    case 'glass':
      return <GlassTheme data={data} />;
    case 'minimal':
    default:
      return <MinimalTheme data={data} />;
  }
}
