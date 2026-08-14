'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';

// Core & Base Templates
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
import AcademicResearchTheme from '@/templates/academic-research/AcademicResearchTheme';
import OpenSourceContributorTheme from '@/templates/open-source-contributor/OpenSourceContributorTheme';
import EngineeringShowcaseTheme from '@/templates/engineering-showcase/EngineeringShowcaseTheme';
import Futuristic2025Theme from '@/templates/futuristic-2025/Futuristic2025Theme';

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
