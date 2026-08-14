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
    case 'minimal':
    default:
      return <MinimalTheme data={data} />;
  }
}
