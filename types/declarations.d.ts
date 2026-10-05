import 'react';
import 'react-native';
import 'lucide-react-native';

declare module 'lucide-react-native' {
  import { ComponentType } from 'react';
  import { SvgProps } from 'react-native-svg';

  export interface LucideProps extends SvgProps {
    size?: string | number;
    color?: any;
    stroke?: any;
    fill?: any;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    style?: any;
  }

  export type LucideIcon = ComponentType<LucideProps>;
}
