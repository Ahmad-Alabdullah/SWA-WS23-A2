import { CSSObject, Theme, styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 240;

const transition = (theme: Theme, transitionType: string): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration:
      theme.transitions.duration[
        transitionType as keyof Theme['transitions']['duration']
      ],
  }),
});

const opened = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  ...transition(theme, 'enteringScreen'),
  overflowX: 'hidden',
  backgroundColor: '#047857',
});

const closed = (theme: Theme): CSSObject => ({
  ...transition(theme, 'leavingScreen'),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#047857',
});

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...transition(theme, 'leavingScreen'),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    ...transition(theme, 'enteringScreen'),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...opened(theme),
    '& .MuiDrawer-paper': opened(theme),
    backgroundColor: '#047857',
  }),
  ...(!open && {
    ...closed(theme),
    '& .MuiDrawer-paper': closed(theme),
    backgroundColor: '#047857',
  }),
}));

export { Header, AppBar, Drawer };
