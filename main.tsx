import { createRoot } from 'react-dom/client';
import { Root } from './Root.tsx';
import './index.scss';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Root />
);
