import { cssObj } from '@fuel-ui/css';

export const styles = {
  gridContainer: cssObj({
    display: 'grid',
    position: 'relative',
    width: '100%',
    height: '100%',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    alignItems: 'center',
    '@media (max-width: 740px)': {
      gridTemplateColumns: '1fr',
    },
  }),
  gridContainerSingle: cssObj({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    '@media (max-width: 740px)': {
      flexDirection: 'column',
    },
    '& > *': {
      // Target direct child (CardComponent)
      width: '550px', // Set fixed width
      maxWidth: '100%', // Ensure it doesn't exceed the container width
      maxHeight: '100%', // Ensure it doesn't exceed the container height
    },
  }),

  card: cssObj({
    flex: '1 0 50%',
    flexDirection: 'column',
    margin: '0 auto',
    position: 'relative',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$md',
    overflow: 'hidden',
    width: '1fr%',
    cursor: 'pointer',
    //height: '331px',
    zIndex: '0',
    transition: 'transform 0.3s ease', // Smooth transition for hover
    ':hover': {
      zIndex: 1, // Ensure hovered card is above others
    },
    // Define a custom property for the animation state
    '--animation-state': 'running',
    animationPlayState: 'var(--animation-state)',
    '&:hover': {
      textDecoration: 'none !important',
      border: '1px solid $intentsBase8',
      backgroundImage:
        'linear-gradient($transparent, rgb(15, 15, 15)) !important',
      'html[class="fuel_light-theme"] &': {
        backgroundImage:
          'linear-gradient($transparent, rgb(245, 245, 245)) !important',
      },
    },
  }),
  button: cssObj({
    '@media (max-width: 740px)': {
      fontSize: '0.8rem', // Smaller button and font size on small screens
      padding: '5px 10px',
    },
    '@media (min-width: 741px) and (max-width: 830px)': {
      fontSize: '0.74rem', // Smaller font size on small screens
    },
    '@media (min-width: 830px) and (max-width: 1024px)': {
      fontSize: '0.9rem', // Medium button and font size on medium screens
      padding: '8px 15px',
    },
    '@media (min-width: 1025px)': {
      fontSize: '1rem', // Larger button and font size on large screens
      padding: '10px 20px',
    },
  }),
  cardHeader: cssObj({
    backgroundImage:
      'url(https://mirror.xyz/_next/image?url=https%3A%2F%2Fimages.mirror-media.xyz%2Fpublication-images%2FHtk-GEPMhnsK-tQyjsrDc.png%3Fheight%3D500%26width%3D1500&w=3840&q=100)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  }),
  cardFooter: cssObj({
    height: '60px', // Set a fixed height for the footer
    display: 'flex',
    alignItems: 'center', // Center the content vertically
    justifyContent: 'space-between', // Distribute space between items
    padding: '0 15px', // Add some padding for aesthetics
  }),
  cardBody: cssObj({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '$6',
    flex: '1 1 auto',
    minHeight: '95px',
    '@media (max-width: 350px)': {
      paddingTop: '8px',
      paddingLeft: '15px',
      paddingRight: '15px',
      minHeight: '136px',
      fontSize: '0.75rem', // Smaller font size on small screens
    },
    '@media (min-width: 351px) and (max-width: 740px)': {
      paddingTop: '8px',
      paddingLeft: '15px',
      paddingRight: '15px',
      minHeight: '130px',
      fontSize: '0.8rem', // Smaller font size on small screens
    },
    '@media (min-width: 741px) and (max-width: 1024px)': {
      paddingTop: '8px',
      paddingLeft: '15px',
      paddingRight: '15px',
      minHeight: '135px',
      fontSize: '1rem', // Smaller font size on small screens
    },
    '@media (min-width: 1025px)': {
      paddingTop: '8px',
      paddingLeft: '15px',
      paddingRight: '15px',
      minHeight: '140px',
      fontSize: '1rem', // Smaller font size on small screens
    },
  }),
  projectImageWrapper: cssObj({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65px',
    height: '65px',
    borderRadius: '$md',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid $intentsBase8',
    marginRight: '1rem',
    backgroundColor: '$intentsBase1',
    '@media (max-width: 320px)': {
      width: '40px',
      height: '40px',
    },
  }),
  image: cssObj({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '6.45px',
    transform: 'scale(170%)',
  }),
  header: cssObj({
    fontWeight: 'bold',
    paddingBottom: '8px',
    paddingTop: '8px',
    '@media (max-width: 768px)': {
      fontSize: '1rem', // Smaller font size on small screens
    },
    '@media (min-width: 601px) and (max-width: 1024px)': {
      fontSize: '1.2rem', // Medium font size on medium screens
    },
    '@media (min-width: 1025px)': {
      fontSize: '1.3rem', // Larger font size on large screens
    },
  }),
  cardContent: cssObj({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  navigation: cssObj({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  }),
  arrowContainer: cssObj({
    padding: '0 10px',
  }),
  arrowButton: cssObj({}),
  dotsContainer: cssObj({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  }),
  dotLive: cssObj({
    width: '$1',
    height: '$1',
    borderRadius: '50%',
    border: '1px solid #A9F6D5',
    background: '#00F58C',
    boxShadow: '0px 0px 4px 0px #00F58C',
  }),
  dotBuilding: cssObj({
    width: '$1',
    height: '$1',
    borderRadius: '50%',
    border: '1px solid #E5C06F',
    background: '#F3B42C',
    boxShadow: '0px 0px 4px 0px #F3B42C',
  }),
  dot: cssObj({
    height: '10px',
    width: '10px',
    backgroundColor: '#BBB',
    borderRadius: '50%',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  }),
  activeDot: cssObj({
    height: '10px',
    width: '10px',
    backgroundColor: '#00F58C',
    borderRadius: '50%',
    margin: '0 5px',
    cursor: 'pointer',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  }),
  tag: cssObj({
    borderRadius: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
    border: '1px solid $intentsBase8',
    '@media (max-width: 768px)': {
      fontSize: '0.65rem', // Smaller font size on small screens
    },
    '@media (min-width: 601px) and (max-width: 1024px)': {
      fontSize: '0.65rem', // Medium font size on medium screens
    },
    '@media (min-width: 1025px)': {
      fontSize: '0.9rem', // Larger font size on large screens
    },
  }),
  statusContainer: cssObj({
    position: 'absolute',
    //bottom: '16px',
    marginTop: '5px',
    right: '15px',
    display: 'flex',
    flexDirection: 'row',
    flexwrap: 'wrap',
    gap: '10px',
    marginLeft: '90px',
    '@media (max-width: 320px)': {
      alignItems: 'end', // Align items to the start of the container
      marginLeft: '60px',
      gap: '1px',
    },
    '@media (max-width: 768px)': {
      alignItems: 'end', // Align items to the start of the container
      gap: '3px',
    },
    '@media (max-width: 1000px)': {
      alignItems: 'end', // Align items to the start of the container
      gap: '3px',
    },
  }),
  fadeIn: cssObj({
    animation: 'fadeInEffect 1s ease-in-out forwards',
    '&:hover': {
      opacity: 1, // Ensure the card is fully visible on hover
    },
  }),
  fadeOut: cssObj({
    animation: 'fadeOutEffect 1s ease-in-out forwards',
    '&:hover': {
      opacity: 1, // Ensure the card is fully visible on hover
    },
  }),

  panelVisible: cssObj({
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
    animation: 'slideIn 0.5s forwards',
  }),

  panelHidden: cssObj({
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
    animation: 'slideOut 0.5s forwards',
  }),
};
