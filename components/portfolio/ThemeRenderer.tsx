'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';

// Core Templates
import MinimalTheme from '@/templates/minimal/MinimalTheme';
import DeveloperTheme from '@/templates/developer/DeveloperTheme';
import CreativeTheme from '@/templates/creative/CreativeTheme';
import ThreeDTheme from '@/templates/three-d/ThreeDTheme';
import ProfessionalTheme from '@/templates/professional/ProfessionalTheme';
import GlassTheme from '@/templates/glass/GlassTheme';
import ObsidianRedTheme from '@/templates/obsidian-red/ObsidianRedTheme';
import NordicEditorialTheme from '@/templates/nordic-editorial/NordicEditorialTheme';
import DevGalleryTheme from '@/templates/dev-gallery/DevGalleryTheme';
import CyberMatrixTheme from '@/templates/cyber-matrix/CyberMatrixTheme';
import BentoGridTheme from '@/templates/bento-grid/BentoGridTheme';
import KineticPosterTheme from '@/templates/kinetic-poster/KineticPosterTheme';
import GenAiNeuralTheme from '@/templates/genai-neural/GenAiNeuralTheme';
import CloudArchitectTheme from '@/templates/cloud-architect/CloudArchitectTheme';
import MernStackTheme from '@/templates/mern-stack/MernStackTheme';
import IotHardwareTheme from '@/templates/iot-hardware/IotHardwareTheme';
import JavaEnterpriseTheme from '@/templates/java-enterprise/JavaEnterpriseTheme';
import CsStudentTheme from '@/templates/cs-student/CsStudentTheme';
import SpatialArVrTheme from '@/templates/spatial-arvr/SpatialArVrTheme';
import CyberSentinelTheme from '@/templates/cyber-sentinel/CyberSentinelTheme';
import AnimatedTheme from '@/templates/animated/AnimatedTheme';
import AcademicResearchTheme from '@/templates/academic-research/AcademicResearchTheme';
import OpenSourceContributorTheme from '@/templates/open-source-contributor/OpenSourceContributorTheme';
import EngineeringShowcaseTheme from '@/templates/engineering-showcase/EngineeringShowcaseTheme';
import Futuristic2025Theme from '@/templates/futuristic-2025/Futuristic2025Theme';

export default function ThemeRenderer({ data }: { data: PortfolioData }) {
  const theme = data.customization?.theme || 'minimal';

  switch (theme) {
    // 10 ANIMATED PORTFOLIO THEMES
    case 'animated-kinetic-type':
      return <AnimatedTheme data={data} variant="marquee" />;
    case 'animated-laser-neon':
      return <AnimatedTheme data={data} variant="laser" />;
    case 'animated-3d-orbs':
      return <AnimatedTheme data={data} variant="tilt" />;
    case 'animated-glitch-hacker':
      return <AnimatedTheme data={data} variant="glitch" />;
    case 'animated-aurora-mesh':
      return <AnimatedTheme data={data} variant="aurora" />;
    case 'animated-elastic-cards':
      return <AnimatedTheme data={data} variant="elastic" />;
    case 'animated-particle-constellation':
      return <AnimatedTheme data={data} variant="constellation" />;
    case 'animated-liquid-glass':
      return <AnimatedTheme data={data} variant="liquid" />;
    case 'animated-synthwave-retro':
      return <AnimatedTheme data={data} variant="synthwave" />;
    case 'animated-prism-refraction':
      return <AnimatedTheme data={data} variant="prism" />;

    // DEDICATED INDIVIDUAL PORTFOLIO THEMES (44, 46, 47, 48)
    case 'cs-student-collection': // 44
      return <AcademicResearchTheme data={data} />;
    case 'github-topic-student': // 46
      return <OpenSourceContributorTheme data={data} />;
    case 'sitesplaced-examples': // 47
      return <EngineeringShowcaseTheme data={data} />;
    case 'nikola-janjic-2025': // 48
      return <Futuristic2025Theme data={data} />;

    // 50 SHOWCASE PORTFOLIO MAPPINGS
    case 'kuber-ai-creative':
    case 'spatial-arvr':
    case 'srikhanth-arvr':
      return <SpatialArVrTheme data={data} />;

    case 'genai-neural':
    case 'tvnskm-aiml-fullstack':
    case 'priyanshu-creative':
    case 'kirti-aiml':
    case 'hari-aiml':
    case 'suraj-agentic-ai':
    case 'abhinav-cv-ml':
    case 'sahil-sahu-ai':
    case 'shreya-datascience':
    case 'aman-genai':
    case 'abhay-cs-ai':
    case 'prashant-cse-aiml':
    case 'harsh-backend-ai':
    case 'dhanaraj-frontend-ai':
      return <GenAiNeuralTheme data={data} />;

    case 'cloud-architect':
    case 'nishil-cloud':
    case 'anmol-creative-sys':
      return <CloudArchitectTheme data={data} />;

    case 'mern-stack':
    case 'harsh-aiml-mern':
    case 'nikhil-fullstack':
    case 'saad-fullstack':
    case 'dheeraj-mern':
    case 'megha-mern':
    case 'karan-webdev':
    case 'shashank-fullstack':
    case 'suraj-mern':
    case 'sakesh-fullstack':
    case 'arun-fullstack':
    case 'shivam-frontend':
    case 'subhadeep-fullstack':
    case 'priyank-fullstack':
      return <MernStackTheme data={data} />;

    case 'iot-hardware':
    case 'ayush-iot-creative':
      return <IotHardwareTheme data={data} />;

    case 'java-enterprise':
    case 'rishav-java-backend':
    case 'adil-java-microservices':
    case 'vinay-java-fullstack':
      return <JavaEnterpriseTheme data={data} />;

    case 'cs-student':
    case 'sahil-aiml-student':
    case 'abhishek-beginner':
    case 'harsh-cs-student':
    case 'wasif-cs-student':
    case 'prince-shah-learning':
      return <CsStudentTheme data={data} />;

    case 'cyber-sentinel':
    case 'ritik-cybersec':
      return <CyberSentinelTheme data={data} />;

    case 'obsidian-red':
    case 'prince-ai':
      return <ObsidianRedTheme data={data} />;

    case 'nordic-editorial':
    case 'aadi-neobrutalist':
    case 'abdulhussain-uiux':
    case 'onehour-digital':
      return <NordicEditorialTheme data={data} />;

    case 'dev-gallery':
    case 'emma-bostian-curated':
    case 'gist-inspiration':
      return <DevGalleryTheme data={data} />;

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
