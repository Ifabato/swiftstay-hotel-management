import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const ResponsiveWrapper = ({ 
  children, 
  mobilePadding = 2, 
  tabletPadding = 3, 
  desktopPadding = 4,
  mobileSpacing = 2,
  tabletSpacing = 3,
  desktopSpacing = 4,
  sx = {},
  ...props 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const getPadding = () => {
    if (isMobile) return mobilePadding;
    if (isTablet) return tabletPadding;
    return desktopPadding;
  };

  const getSpacing = () => {
    if (isMobile) return mobileSpacing;
    if (isTablet) return tabletSpacing;
    return desktopSpacing;
  };

  return (
    <Box
      sx={{
        p: getPadding(),
        '& > * + *': {
          mt: getSpacing(),
        },
        '@media (max-width:600px)': {
          px: 2,
          py: 1.5,
        },
        '@media (max-width:400px)': {
          px: 1.5,
          py: 1,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ResponsiveWrapper; 