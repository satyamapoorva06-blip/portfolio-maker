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

// Dedicated Custom Theme Components
import DataScienceTheme from '@/templates/data-science/DataScienceTheme';
import RagPromptTheme from '@/templates/rag-prompt/RagPromptTheme';
import ReactiveFullstackTheme from '@/templates/reactive-fullstack/ReactiveFullstackTheme';
import VibrantWebTheme from '@/templates/vibrant-web/VibrantWebTheme';
import BeginnerCsTheme from '@/templates/beginner-cs/BeginnerCsTheme';
import MinimalCsTheme from '@/templates/minimal-cs/MinimalCsTheme';
import SwissBrutalistTheme from '@/templates/swiss-brutalist/SwissBrutalistTheme';
import OneHourDigitalTheme from '@/templates/onehour-digital/OneHourDigitalTheme';

// Newly Added Dedicated Components for 29, 30, 32, 33, 35
import FullstackSdeTheme from '@/templates/fullstack-sde/FullstackSdeTheme';
import HighimpactMernTheme from '@/templates/highimpact-mern/HighimpactMernTheme';
import ModernFullstackTheme from '@/templates/modern-fullstack/ModernFullstackTheme';
import PersonalShowcaseTheme from '@/templates/personal-showcase/PersonalShowcaseTheme';
import ReactTailwindTheme from '@/templates/react-tailwind/ReactTailwindTheme';

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

    // DEDICATED UNIQUE PORTFOLIO THEME ROUTING
    case 'shreya-datascience': // 14
      return <DataScienceTheme data={data} />;
    case 'aman-genai': // 15
      return <RagPromptTheme data={data} />;
    case 'nikhil-fullstack': // 16
      return <ReactiveFullstackTheme data={data} />;
    case 'saad-fullstack': // 18
      return <VibrantWebTheme data={data} />;
    case 'abhishek-beginner': // 21
      return <BeginnerCsTheme data={data} />;
    case 'harsh-cs-student': // 22
      return <MinimalCsTheme data={data} />;
    case 'shashank-fullstack': // 29
      return <FullstackSdeTheme data={data} />;
    case 'suraj-mern': // 30
      return <HighimpactMernTheme data={data} />;
    case 'sakesh-fullstack': // 32
      return <ModernFullstackTheme data={data} />;
    case 'arun-fullstack': // 33
      return <PersonalShowcaseTheme data={data} />;
    case 'shivam-frontend': // 35
      return <ReactTailwindTheme data={data} />;
    case 'aadi-neobrutalist': // 43
      return <SwissBrutalistTheme data={data} />;
    case 'cs-student-collection': // 44
      return <AcademicResearchTheme data={data} />;
    case 'github-topic-student': // 46
      return <OpenSourceContributorTheme data={data} />;
    case 'sitesplaced-examples': // 47
      return <EngineeringShowcaseTheme data={data} />;
    case 'nikola-janjic-2025': // 48
      return <Futuristic2025Theme data={data} />;
    case 'onehour-digital': // 50
      return <OneHourDigitalTheme data={data} />;

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
    case 'dheeraj-mern':
    case 'megha-mern':
    case 'karan-webdev':
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
    case 'abdulhussain-uiux':
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
