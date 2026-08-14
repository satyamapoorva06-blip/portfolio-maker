'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
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

export default function ThemeRenderer({ data }: { data: PortfolioData }) {
  const theme = data.customization?.theme || 'minimal';

  switch (theme) {
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
    case 'obsidian-red':
      return <ObsidianRedTheme data={data} />;
    case 'nordic-editorial':
      return <NordicEditorialTheme data={data} />;
    case 'dev-gallery':
      return <DevGalleryTheme data={data} />;
    case 'cyber-matrix':
      return <CyberMatrixTheme data={data} />;
    case 'bento-grid':
      return <BentoGridTheme data={data} />;
    case 'kinetic-poster':
      return <KineticPosterTheme data={data} />;
    case 'genai-neural':
      return <GenAiNeuralTheme data={data} />;
    case 'cloud-architect':
      return <CloudArchitectTheme data={data} />;
    case 'mern-stack':
      return <MernStackTheme data={data} />;
    case 'iot-hardware':
      return <IotHardwareTheme data={data} />;
    case 'java-enterprise':
      return <JavaEnterpriseTheme data={data} />;
    case 'cs-student':
      return <CsStudentTheme data={data} />;
    case 'spatial-arvr':
      return <SpatialArVrTheme data={data} />;
    case 'cyber-sentinel':
      return <CyberSentinelTheme data={data} />;
    case 'minimal':
    default:
      return <MinimalTheme data={data} />;
  }
}
