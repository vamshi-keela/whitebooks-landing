import React from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowUpRight,
  Copy,
  Check,
  Menu,
  X,
  GitFork,
  Zap,
  Shield,
  Key,
  Globe,
  BookOpen,
  Code2,
  Terminal,
  Network,
  Package,
  Activity,
  Compass,
  Lock,
  Play,
  Sparkles,
  Star,
  MessageCircle,
  CircleDot,
  Diamond,
  Layers,
  Wallet,
  Filter,
  ExternalLink,
  Plus,
  Minus,
  Command,
  AlertTriangle,
  Info,
  Receipt,
  Truck,
  ScrollText,
  Flag,
  Users,
  LifeBuoy,
  PlayCircle,
  Astroid,
  type LucideProps,
} from 'lucide-react';

export type IconName =
  | 'search'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'copy'
  | 'check'
  | 'menu'
  | 'close'
  | 'github'
  | 'bolt'
  | 'shield'
  | 'key'
  | 'globe'
  | 'book'
  | 'code'
  | 'terminal'
  | 'webhook'
  | 'package'
  | 'activity'
  | 'compass'
  | 'lock'
  | 'play'
  | 'spark'
  | 'star'
  | 'discord'
  | 'circle-dot'
  | 'diamond'
  | 'layers'
  | 'wallet'
  | 'filter'
  | 'external'
  | 'plus'
  | 'minus'
  | 'command'
  | 'warning'
  | 'info'
  | 'receipt'
  | 'truck'
  | 'scroll'
  | 'flag'
  | 'users'
  | 'life-buoy'
  | 'play-circle'
  | 'astroid'

type IconComponent = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;

const iconMap: Record<IconName, IconComponent> = {
  'search': Search,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'copy': Copy,
  'check': Check,
  'menu': Menu,
  'close': X,
  'github': GitFork,
  'bolt': Zap,
  'shield': Shield,
  'key': Key,
  'globe': Globe,
  'book': BookOpen,
  'users': Users,
  'life-buoy': LifeBuoy,
  'play-circle': PlayCircle,
  'code': Code2,
  'terminal': Terminal,
  'webhook': Network,
  'package': Package,
  'astroid': Astroid,
  'activity': Activity,
  'compass': Compass,
  'lock': Lock,
  'play': Play,
  'spark': Sparkles,
  'star': Star,
  'discord': MessageCircle,
  'circle-dot': CircleDot,
  'diamond': Diamond,
  'layers': Layers,
  'wallet': Wallet,
  'filter': Filter,
  'external': ExternalLink,
  'plus': Plus,
  'minus': Minus,
  'command': Command,
  'warning': AlertTriangle,
  'info': Info,
  'receipt': Receipt,
  'truck': Truck,
  'scroll': ScrollText,
  'flag': Flag,
};

interface DpIconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function DpIcon({ name, size = 16, className, style }: DpIconProps): React.ReactElement {
  const IconComponent = iconMap[name];
  return <IconComponent size={size} className={className} style={style} />;
}
